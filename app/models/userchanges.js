var nodemailer = require('nodemailer');
var jwt = require('jwt-simple');
var User = require('./user');
var mailer=require('./mailer');
exports.updateuser=function (req,res) {
	if(req.params.username){
		User.findOne({name:req.params.username},function(err,data){
			if(err){
				res.send(err);
			}else{
				res.send(data);
			}
		})	
	}
}
exports.updateprofilephoto=function(req,res){
	if(req.params.username){
		console.log(req.file);
		User.findOneAndUpdate({name:req.params.username},{
			profilephoto:req.file.filename
		},{new:true},function(err,data){
			if(err){
				res.send(err);
			}else{
				res.send(data);
			}
		})
	}

}
exports.gettoptenstudents=function(req,res){
	User.find({}).sort({'studentrating':-1}).limit(10).exec(function(err,data){
		res.send(data);
	})
}
exports.newfaculty=function(req,res){
	User.update({name:req.body.username},{
			
			
			group:"Faculty",
				
		},function(err,data){
			if(err){
				res.send(err);
				console.log(err);
			}else{
				res.send(data);
				console.log(data);
			}
		})
}
exports.savenewrating=function(username,totalmarks,completemarks,RatingAvg){
	User.findOne({name:username},function(err,data){
		data.studentrating=data.rating*totalmarks/completemarks;
		data.completedtests=data.completedtests+1;
		data.save({},function(err,data){
			if(err){
				console.log(err);
			}else{
				console.log(data);
			}
		})
	})
}
var secret="india";
exports.forgotpasswordmailsend=function(req,res){
	if(req.body.username){

		User.findOne({name:req.body.username},function(err,data){
			var token = jwt.encode(data,secret);
			emaildata={
				to:data.to,
				text:"<p>Access below link for changing your password</p><p> http://localhost:8080/forgotpassword/"+token
			}
			console.log(data);
			mailer.mailer(emaildata,function(err,data){
				if(err){
					res.send(err);
				}else{
					res.send(data);
				}
			})

		})
	}else{
		res.send("username please");
	}
}
exports.userfindbytoken=function(req,res){
	if(req.body.hashvalue){
		    var decoded = jwt.decode(req.body.hashvalue,secret);
		    res.send({username:decoded.name});
	}
}
exports.changeroletofaculty=function(req,res){
	if(req.body.username){
		console.log("camehere");
		User.findOneAndUpdate({name:req.body.username},{group:"Faculty"},{new:true},function(err,data){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				console.log(data);
				res.send(data);
			}
		})
	}
}
exports.updateduser=function(req,res){
	if(req.params.username){
		console.log(req.body);
		User.update({name:req.params.username},{
			
			
			FirstName:req.body.profile.FirstName,
			LastName:req.body.profile.LastName,
			email:req.body.profile.email,
			phone:req.body.profile.phone,
			dob:req.body.profile.dob,
			group:req.body.profile.group,
			studentclass:req.body.profile.studentclass,
			schoolname:req.body.profile.schoolname,
			state:req.body.profile.state,
			address:req.body.profile.address,
			
				
		},function(err,data){
			if(err){
				res.send(err);
				console.log(err);
			}else{
				res.send(data);
				console.log(data);
			}
		})
	}
}