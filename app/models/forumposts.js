
var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var ForumPosts=mongoose.Schema({
	Title:String,
	PostBody:String,
	noofcomment:Number,
	Topic:String,
	submitted:Date,
	user:String,
	course:Number,
},{collection:'ForumPosts'});
ForumPosts.plugin(autoIncrement.plugin,'ForumPosts');
var addForumPosts=mongoose.model('addForumPosts',ForumPosts);
exports.saveNewForumPosts=function(req,res){
	var ForumPosts=new addForumPosts({
		Title:req.body.Title,
	PostBody:req.body.PostBody,
	noofcomment:0,
	Topic:req.body.Topic,
	submitted:new Date(),
	user:req.body.user,
	course:req.body.course,
	});
	ForumPosts.save({},function(err,data){
		if(!err){	
			res.sendStatus(200);
		}else{
			res.send(err);
		}
	});
}
exports.getForumPosts=function(req,res){
	addForumPosts.find({course:req.params.courseid},function(err,data){
		if(!err){
			res.send(data);
		}else{
			res.send(err);
		}
	});
}
