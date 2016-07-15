var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: './public/images' });
var uploaddocument=multer({dest:'./public/documents'})
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var User = require('./app/models/user');
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');
var mailer=require('./app/models/mailer');

var addCourse=require("./app/models/course");
var addTopic=require("./app/models/topic");
var addTestPaper=require("./app/models/testpaper");
var addTestMarks=require("./app/models/marks");
var addTestRating=require("./app/models/testrating");
var addTestStats=require("./app/models/teststats");
var addForumPosts=require("./app/models/forumposts");
var addForumComments=require("./app/models/forumcomments");
var addUserChannels=require("./app/models/userchannels");
var addnotifications=require("./app/models/notifications");
var addlogout=require("./app/models/logoutdetails");
var addUser=require("./app/models/userchanges");
var addCourseVideo=require("./app/models/coursevideo")
var addCourseDocument=require("./app/models/coursedocument")
var addKhan=require("./app/models/khan");
//var facultyPage=require("./app/models/facultyPage")
var server = require('http').Server(app).listen(port);
var io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
    	socket.join(room);
    	if(room=='0'){
        //console.log(socket.join(room));
        console.log("yes",io.sockets.clients(0)) ;

    };
        //console.log(room);
    });
    socket.on('username',function(username){
    	socket['username']=username;
    });
    socket.on('disconnect',function(){
    	/*addlogout.saveNewLogoutDetails(socket['username'],function(data){
    		console.log(data);
    	});*/
    })

     socket.on('newnotification', function (data) {
    	console.log(data);
    	addnotifications.saveNewNotification(data,function(datadb){
    		console.log(datadb);
    	});

    	console.log(data.room,data);
    	io.sockets.in(data.room).emit('message',data);
  });
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static('public'));
mongoose.connect(config.database);
require('./config/passport')(passport);
var apiRoutes =express.Router();

app.post('/sendmail',function(req,res){
  data={
     // sender address 
    to: req.body.sendto, // list of receivers 
    subject: req.body.subject, // Subject line 
    text: req.body.text, // plaintext body 
    htmlbody: req.body.htmlbody // html body 
  }

  mailer.mailer(data,function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      res.send(data);
    }
  })
  

});

apiRoutes.post('/signup',function(req,res){
	console.log(req)
	if(!req.body.name || !req.body.password){
		res.json({success:false,msg:'Please pass name and password.'});
		console.log(failed);
	}else{
		var newUser = new User({
			name:req.body.name,
			password:req.body.password,
			FirstName:req.body.FirstName,
			LastName:req.body.LastName,
	email:req.body.email,
	phone:req.body.phone,
	dob:req.body.dob,
	group:'Student',
	studentclass:req.body.studentclass,
		schoolname:req.body.schoolname,
		state:req.body.state,
		address:req.body.address,
		

		});
		newUser.save(function(err){
			if(err){
				return res.json({success:false,msg:'Username already exists.'});

			}
			res.json({success:true,msg:'successful created new user.'});
		});
	}
});
apiRoutes.post('/authenticate',function(req,res){
	console.log(req);
	User.findOne({
		name:req.body.name
	},function(err,user){
		if(err) throw err;
		if(!user){
			res.send({success:false,msg:'Authentication failed.User not found.'});
		}
		else{
			user.comparePassword(req.body.password,function(err,isMatch){
				if(isMatch && !err){
					var token = jwt.encode(user,config.secret);
					res.json({success:true,token:'JWT '+ token,group:user.group,username:user.name,profilepic:user.profilephoto,user:user});
				}else{
					res.send({success:false,msg:'Authentication failed.wrong Password.'});
				}
			});
		}
	});
});
apiRoutes.post('/forgotpassword',function(req,res){
  User.findOne({
    name:req.body.name
  },function(err,user){
    if(err) throw err;
    if(!user){
      res.send({success:false,msg:'You are not a registered user'});
    }else{
      user.password=req.body.newpassword;
      user.save({},function(err,data){
        res.send("success");
      })
    }
  })
})
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
	console.log("success")
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    } ,function(err, user) {
        if (err) throw err;
 		if(user.group=="Faculty"){
 			return res.json({msg:'welcome admin'});
 		}	
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'+user.group});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
getAuthorisedFaculty=function(req,res,next){
var token=getToken(req.headers);
if(token){
  var decoded=jwt.decode(token,config.secret);
  User.findOne({
    name:decoded.name
  },function(err,user){
    if(err) throw err;
    if(user.group=="Faculty"){
      next();
    }else{
      res.status(403).send({success:false,msg:'Incorrect Token'})
    }
  })
}else{
  return res.status(403).send({success:false,msg:'No token provided'});
}
} 
function HasRole(role) {
  return function(req, res, next) {
    if (role !== req.user.role) res.redirect("yes");
    else next();
  }
}
getAuthorisedAdmin=function(req,res,next){
  var token=getToken(req.headers);
if(token){
  var decoded=jwt.decode(token,config.secret);
  User.findOne({
    name:decoded.name
  },function(err,user){
    if(err) throw err;
    if(user.group==""){
      next();
    }else{
      res.status(403).send({success:false,msg:'Incorrect Token'})
    }
  })
}else{
  return res.status(403).send({success:false,msg:'No token provided'});
}


}
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
app.use('/api',apiRoutes);
app.post('/addCourse',upload.single('photo'),addCourse.saveNewCourse);
app.post('/removeCourse',addCourse.deleteCourse);
app.post('/findCourse',addCourse.findCourseDetails);
app.post('/addTopic',addTopic.saveNewTopic);
app.post('/findTopic',addTopic.findTopicDetails);
app.post('/testcreate',addTestPaper.saveNewTestPaper);
app.post('/testpaper',addTestPaper.findTestDetails);
app.post('/answercheck',addTestPaper.findingmarks);
app.get('/faculty/:facultyid',passport.authenticate('jwt', { session: false}),addCourse.findCoursesoffaculty);
app.get('/findTopic/:id',addTopic.findTopicbyid);
app.post('/removeTopic',addTopic.deleteTopic);
app.put('/addTopic',addTopic.updateNewTopic);
app.post('/subscribe',addCourse.Subscribe);
app.get('/student/:studentid',passport.authenticate('jwt', { session: false}),addCourse.findCoursesofstudent);
app.get('/courses',addCourse.findallcourses);
app.get('/testpapers',addTestPaper.findalltestpapers);
app.get('/userrank/:testid/:marks',addTestMarks.yourtestrank);
app.get('/testpaperstats/:testid',addTestMarks.testpaperstats);
app.get('/testresults/:marksid',addTestMarks.thistestmarks);
app.get('/topten/:testid',addTestMarks.toptenpeople);
app.post('/testrating/',addTestRating.saveNewTestRating);
app.get('/userstats/:userid',addTestMarks.finduserstats);
app.get('/facultyteststats/:facultyname',addTestStats.returnfacultypapers);
app.get('/testwisemarks/:testid',addTestMarks.testpaperstats);
app.get('/forumpost/:courseid',addForumPosts.getForumPosts);
app.post('/forumpost',addForumPosts.saveNewForumPosts);
app.get('/postbody/:postid',addForumPosts.getPostBody);
app.get('/forumcomment/:postid',addForumComments.findPostComments);
app.post('/forumcomment/',addForumComments.saveNewForumComments);
app.get('/userchannels/:username',addUserChannels.getUserChannels);
app.post('/notificationsindb',addnotifications.getnotifications);
app.post('/notificationsindbafterlogout',addnotifications.getnotificationsafterlogout);
app.get('/updateprofile/:username',addUser.updateuser);
app.post('/updatedprofile/:username',addUser.updateduser);
app.post('/updateprofilphoto/:username',upload.single('photo'),addUser.updateprofilephoto);
app.post('/testpaperfilter',addTestStats.findallteststats);
app.post('/updatevideo/:courseid',upload.single('photo'),addCourseVideo.saveNewVideo);
app.post('/loadvideos/:courseid',addCourseVideo.getCourseVideos)
app.post('/updatedocument/:courseid',uploaddocument.single('photo'),addCourseDocument.saveNewDocument);
app.post('/loaddocuments/:courseid',addCourseDocument.getCourseDocument);
app.post('/facultyrequestconfirm',addUser.changeroletofaculty);
app.post('/forgotpasswordmailsend',addUser.forgotpasswordmailsend);
app.post('/checkhashcorrect',addUser.userfindbytoken);
app.get('/getrecentfivedoubts',addForumPosts.getrecentdoubts);

//app.post('/updatekhanid',addKhan.addnewuser);
app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/index1.html');
});

console.log('There will be dragons: http://localhost:' + port);


