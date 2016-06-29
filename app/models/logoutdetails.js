var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var LogoutDetails=mongoose.Schema({
	username:String,
	Logout:Date,
	
	

},{collection:'LogoutDetails'});
LogoutDetails.plugin(autoIncrement.plugin,'LogoutDetails');
var addLogoutDetails=mongoose.model('addLogoutDetails',LogoutDetails);
exports.saveNewLogoutDetails=function(data,cb){
	addLogoutDetails.update({username:data},{username:data,Logout:new Date()},{upsert:true},function(err,data){
		if(err){
			console.log(err);
			cb(err);
		}else{
			console.log(data)
			cb(data);
		}
	})
}
exports.lastlogout=function(username,cb){
	addLogoutDetails.findOne({username:username},function(err,data){
		if(err){
		console.log(err,null);
		cb(err,null);
	
	}else{
		console.log(null,data);
		cb(null,data);
	}	
	})
	
}	
