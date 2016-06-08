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
exports.findTopicbyid=function(req,res){
	if(req.params.id!=null){
		addTopic.find({_id:req.params.id},function(err,data){
			if(!err){
				if(data=='')res.sendStatus(400);
			else{
				res.send(data);
			}
			}else{res.send(err);
			}
		});
	};
};
exports.updateNewTopic=function(req,res){
	if(req.body.id!=null){
		addTopic.findOne({_id:req.body.id},function(err,topic){
		topic.topictitle=req.body.topictitle;
		topic.topictext=req.body.topictext;
		topic.Course=req.body.Course;	
		topic.save(function(err){
			if(err){
				console.log(err);

			}else{
				console.log('success');
				res.sendStatus(200);
			}
		});
	});
}
	}
exports.deleteTopic=function(req,res){
	if(req.body.id){
		addTopic.remove({_id:req.body.id},function(err){
			if(!err){
				res.sendStatus(200);
			}else{
				console.log(err);
			}
		});
	};
};
exports.findTopicDetails=function(req,res){
	if(req.body.Course!=null){
		addTopic.find({Course:req.body.Course},function(err,data){
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