var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var UserChannels=mongoose.Schema({
	username:String,
	channels:Array,
},{collection:'UserChannels'});
UserChannels.plugin(autoIncrement.plugin,'UserChannels');
var addUserChannels=mongoose.model('addUserChannels',UserChannels);
exports.getUserChannels=function(req,res){
	addUserChannels.findOne({username:req.params.username},function(err,data){
		if(!err){
			res.send(data);
		}else{
			res.send(err);
		}
	})
}
exports.saveNewUserChannel=function(data,cb){
	console.log("camehere");
	addUserChannels.findOne({username:data.username},function(err,userdata){
		if(!err){
			if(!userdata){
				console.log(data);
				UserChannels=new addUserChannels({
					username:data.username,
					channels:data.channels,
				});
				UserChannels.save({},function(error,data){
					if(!error){
						console.log("successfully added to channels");
					}else{
						console.log(error);
					}
				})
			}
		else{

			console.log(data);
			userdata.channels.push(data.channels);
			console.log(userdata);
			userdata.save({},function(error,data){
				if(!error){
					console.log("successfully added to channels")
				}else{
					console.log(error);
				}
			})
		}
	}
	})
}