var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');
var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var ForumComments=mongoose.Schema({
	Postid:Number,
	CommentBody:String,
	submitted:Date,
	user:String,
	courseno:Number,
},{collection:'ForumComments'});
ForumComments.plugin(autoIncrement.plugin,'ForumComments');
var addForumComments=mongoose.model('addForumComments',ForumComments);
exports.saveNewForumComments=function(req,res){
	var ForumComments=new addForumComments({
	Postid:req.body.Postid,
	CommentBody:req.body.CommentBody,
	submitted:new Date(),
	user:req.body.user,
	courseno:req.body.courseno,
	});
	ForumComments.save({},function(err,data){
		if(!err){	
			res.sendStatus(200);
		}else{
			res.send(err);
		}
	});
}
exports.findPostComments=function(req,res){
	addForumComments.find({Postid:req.params.postid},function(err,data){
		if(!err){
			res.send(data);
		}else{
			res.send(err);
		}
	});
}