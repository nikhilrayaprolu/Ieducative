var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var Notifications=mongoose.Schema({
	room:String,
	NotificationText:String,
	date:Date,

},{collection:'Notifications'});
Notifications.plugin(autoIncrement.plugin,'Notifications');
var addNotifications=mongoose.model('addNotifications',Notifications)
exports.saveNewNotification=function(data,cb){
	var Notifications=new addNotifications({
		room:data.room,
		NotificationText:data.NotificationText,
		date:new Date(),
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
