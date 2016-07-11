
var addLogout=require('./logoutdetails');
var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var Notifications=mongoose.Schema({
	room:String,
	NotificationText:String,
	datesubmitted:Date,

},{collection:'Notifications'});
Notifications.plugin(autoIncrement.plugin,'Notifications');
var addNotifications=mongoose.model('addNotifications',Notifications)
exports.saveNewNotification=function(data,cb){
	var Notifications=new addNotifications({
		room:data.room,
		NotificationText:data.body,
		datesubmitted:new Date(),
	});
	Notifications.save({},function(err,data){
		if(!err){
			console.log(data);
			cb(data);
		}else{
			console.log(err);
			cb(err);
		}
	})
}
exports.getnotificationsafterlogout=function(req,res){
	if(req.body.username){
		addLogout.lastlogout(req.body.username,function(err,data){
			if(err){
				console.log(err+"no");
				res.send(err);

			}else{
				console.log(data+"yes");
				addNotifications.count({room:{$in:req.body.channels},datesubmitted:{$gt:data.Logout}},function(error,data){
					if(error){
						console.log(error);
						res.send(error);
					}else{
						console.log(data);
						res.json(data);
					}	
				})
			}
		})
	}
}
exports.getnotifications=function(req,res){
	if(req.body.channels){
		addLogout.saveNewLogoutDetails(req.body.username,function(data){
			console.log(data);
		});
		addNotifications.find().sort({datesubmitted:-1}).where('room').in(req.body.channels).exec(function(err,data){
			if(err){
				res.send(err);

			}
			else{
				res.send(data);
			}
		})
	}else{
		res.sendStatus(401);
	}
	
}