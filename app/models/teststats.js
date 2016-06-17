var User = require('./user');
var Test = require('./testpaper');
var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var TestStats=mongoose.Schema({
	Testid:Number,
	completemarks:Number,
	avgmarks:Number,
	totalNoOfStudentsAttempted:Number,
	RatingAvg:Number,
	RatingCount:Number,
	TestPaperTitle:String,
	TestPaperTitle:String,
	facultyname:String,
},{collection:'TestStats'});
TestStats.plugin(autoIncrement.plugin,'TestStats');
exports.addTestStats=mongoose.model('addTestStats',TestStats);
addTestStats=mongoose.model('addTestStats',TestStats);
exports.saveontestregister=function(data,initialrating){
	var TestStat=new addTestStats({
		Testid:data._id,
		completemarks:data.QuestionNumber,
		avgmarks:0,
		totalNoOfStudentsAttempted:0,
		RatingAvg:10*initialrating,
		RatingCount:10,
		TestPaperTitle:data.TestPaperTitle,
		facultyname:data.facultyname,
		});

	TestStat.save({},function(err,data){
		if(!err){
			
			console.log("successfully added TestStats")

		}else{
			console.log(err);
			}

	});
}

exports.returnfacultypapers=function(req,res){
	addTestStats.find({facultyname:req.params.facultyname},function(err,data){
		if(!err){
			if(data==''){
				res.sendStatus(400);
			}else{

				console.log(data);
				res.send(data);
			}
		}else{
			res.send(err);
		}
	});
}

exports.saveontestattempt=function(data){
		addTestStats.findOne({Testid:data.Testid},function(err,teststats){
			teststats.avgmarks=(teststats.avgmarks*teststats.totalNoOfStudentsAttempted+data.totalmarks)/(teststats.totalNoOfStudentsAttempted+1);
			teststats.totalNoOfStudentsAttempted=teststats.totalNoOfStudentsAttempted+1;
			teststats.save(function(err){
				if(err){
					console.log(err);
				}else{
					console.log("success");
				}
			});
		
	})
}
exports.ratingthetestpaper=function(Testid,userrating){
	console.log("I am here");
	addTestStats.findOne({Testid:Testid},function(err,teststats){
		console.log(teststats);
		teststats.RatingAvg=(teststats.RatingAvg*teststats.RatingCount+userrating)/(teststats.RatingCount+1);
		teststats.RatingCount=teststats.RatingCount+1;
		teststats.save(function(err){
			if(err){
				console.log(err);
			}else{
				console.log("success");
			}
		});
	});
}
