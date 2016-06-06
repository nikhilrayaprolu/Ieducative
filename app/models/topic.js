var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);

var Topic=mongoose.Schema({
	topictitle:String,
	topictext:String,
	Course:Number,

},{collection:'topic'});
Topic.plugin(autoIncrement.plugin,'Topic');

var addTopic=mongoose.model('addTopic',Topic);
exports.saveNewTopic=function(req,res){
	
	var TopicData=new addTopic(req.body);
	TopicData.save({},function(err,data){
		if(!err){	
			res.sendStatus(200);
		}else{
			res.send(err);
		}
	});
}
exports.findTopicDetails=function(req,res){
	if(req.body.course!=null){
		addTopic.find({name:req.body.course_id},function(err,data){
			if(!err){
				if(data==''){
					res.sendStatus(400);

				}
				else{
					res.send(data);
				}
			}else{
				res.send(err);
			}
		});
	};
};