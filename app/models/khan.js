var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var Khanid=mongoose.Schema({
	username:String,
	useremail:String,
	userid:String,


},{collection:'Khanid'});
Khanid.plugin(autoIncrement.plugin,'Khanid');
var addKhanid=mongoose.model('addKhanid',Khanid)
exports.saveNewUser=function(data,cb){
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
