var User = require('./user');
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
exports.updateduser=function(req,res){
	if(req.params.username){
		console.log(req.file.filename);
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