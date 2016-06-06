var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: './uploads' });
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var User = require('./app/models/user');
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');
var addCourse=require("./app/models/course");
var addTopic=require("./app/models/topic")
var addTestPaper=require("./app/models/testpaper")
//var facultyPage=require("./app/models/facultyPage")
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static('public'));

app.get('/',function(req,res){
	res.send('Hello! the api is at http://localhost:'+port+'/api');

});
mongoose.connect(config.database);
require('./config/passport')(passport);
var apiRoutes =express.Router();
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
	group:req.body.group,
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
					res.json({success:true,token:'JWT '+ token});
				}else{
					res.send({success:false,msg:'Authentication failed.wrong Password.'});
				}
			});
		}
	});
});
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
app.post('/findCourse',addCourse.findCourseDetails);
app.post('/addTopic',addTopic.saveNewTopic);
app.post('/findTopic',addTopic.findTopicDetails);
app.post('/testcreate',addTestPaper.saveNewTestPaper);
app.post('/testpaper',addTestPaper.findTestDetails);
app.post('/answercheck',addTestPaper.findingmarks);
app.get('/faculty/:facultyid',addCourse.findCoursesoffaculty);
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
