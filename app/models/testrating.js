var User = require('./user');
var Test = require('./testpaper');
var TestStats=require('./teststats');
var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var TestRating=mongoose.Schema({
	Rating:Number,
	username:String,
	Testid:Number,
},{collection:'TestRating'});
TestRating.plugin(autoIncrement.plugin,'TestRating');
var addTestRating=mongoose.model('addTestRating',TestRating);
exports.saveNewTestRating=function(req,res){
	var TestRating=new addTestRating({
		Rating:req.body.Rating,
		Testid:req.body.Testid,
		username:req.body.username,
		});

	TestRating.save({},function(err,data){
		if(!err){
			TestStats.ratingthetestpaper(data.Testid,data.Rating);
			console.log(data._id+"yes");
			res.send(data);

		}else{
			console.log(err);
			res.send(err);
		}

	});
}
exports.finduserrating=function(username,cb){

	addTestRating.find({username:username},function(err,data){
		if(err){
			cb(err,null);
		}else if(data=''){
			cb(null,false)
		}else{
			cb(null,true);
		}
	})
}
