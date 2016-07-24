var mongoose=require('mongoose');
var marks=require('./marks');
var teststats=require('./teststats');
var timestamps = require('mongoose-timestamp');
async = require("async");

Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var TestPaper=mongoose.Schema({
	TestPaperTitle:String,
	TestPaperNumber:Number,
	QuestionNumber:Number,
	Questions:Object,
	Correct:Array,
	TestPapermatter:Object,
	class:Number,
	subject:String,
	facultyname:String,
	State:String,


},{collection:'TestPaper'});
TestPaper.plugin(autoIncrement.plugin,'TestPaper');
TestPaper.plugin(timestamps);
var addTestPaper=mongoose.model('addTestPaper',TestPaper);
exports.saveNewTestPaper=function(req,res){
	console.log(req.body);
	if(req.body.testid){
	addTestPaper.findOneAndUpdate({_id:req.body.testid},req.body,{new:true,upsert:true},function(err,doc){
		if(err){
			res.send(err);
		}else{
			console.log("yes"+doc);
			teststats.saveontestregister(doc,req.body.testrating)
			res.send(doc);
		}
	});	
}else{
	var TestPaperData=new addTestPaper(req.body);
	
	TestPaperData.save({},function(err,data){
		if(!err){
			teststats.saveontestregister(data,req.body.testrating);
			res.sendStatus(200);

		}else{
			res.send(err);
		}

	});
}
	
	
}
exports.findalltestpapers=function(req,res){

	addTestPaper.find({},function(err,data){
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
};
exports.findalltestpapersadvanced=function(req,res){
	if(1){
		finaldata=[];
		addTestPaper.find(req.body.filters,function(err,data){
			console.log(data);

			async.forEachOfSeries(data,function(dataitem,index,callback){
				console.log('yes'+dataitem)
				addTestStats.findOne({Testid:dataitem._id},function(err,teststats){
				if(err){
					callback(err);
				}	else{
	console.log('no'+teststats);
	data[index]["completemarks"]=teststats.completemarks;
	
	data[index].avgmarks=teststats.avgmarks;
	data[index].totalNoOfStudentsAttempted=teststats.totalNoOfStudentsAttempted;
	data[index].RatingAvg=teststats.RatingAvg;
	//finaldata.push({"data":data[index],"teststats":teststats});
	finaldata[index]={"data":data[index],"teststats":teststats};
	console.log(index);
	//console.log("check"+data[index]);
	callback();}
				})
				
			},function(err){
				if(err){
					res.send(err);
				}else{
					console.log('fun'+finaldata);
					res.send(finaldata);
				}
			})
		});
	}
	
}
exports.findTestDetails=function(req,res){
	if(req.body.testid!=null){
		console.log(typeof req.body.testid);
		addTestPaper.find({_id:req.body.testid},function(err,data){
			if(!err){
				if(data==''){
					res.sendStatus(400);
				}
				else{
					console.log(data);
					res.send(data);

				}}
				else{
					res.send(err);
				}
			
		});
	};
};
exports.findingmarks=function(req,res){
	if(req.body.testid!=null){
		console.log(req.body);
	addTestPaper.find({_id:req.body.testid},function(err,data){
				if(!err){
					if(data==''){
						res.sendStatus(400);
					}
					else{
						result=[];
						completeresult=0;
						Answers=req.body.Answers;
						console.log("YES");
						correct=data[0].Correct;
						testid=req.body.testid;
						for(i=0;i< correct.length;i++){
							console.log(typeof Answers[i],typeof correct[i]);
							if(Answers[i]==parseInt(correct[i])){
								result[i]=1;
								completeresult++;

							}
							else{
								result[i]=0;
							}
						};
						console.log(result,completeresult);
					data={	answersgiven:result,
						totalmarks:completeresult,
						Testid:testid,
						username:req.body.username,
						Answers:Answers,
					};
						marks.saveNewTestMarks(data,function(marksid){
						console.log(marksid+"no");	
						res.send({result:result , completeresult:completeresult,marksid:marksid});
						});
						
						


					}}
					else{
						res.send(err);
					}
				
			});
		};
	};