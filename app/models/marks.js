var User = require('./user');
var Test = require('./testpaper');
var teststats=require('./teststats');

var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var TestMarks=mongoose.Schema({
	answersgiven:Array,
	totalmarks:Number,
	username:String,
	Testid:Number,
	Answers:Array,
},{collection:'TestMarks'});
TestMarks.plugin(autoIncrement.plugin,'TestMarks');

var addTestMarks=mongoose.model('addTestMarks',TestMarks);
exports.saveNewTestMarks=function(testdata,cb){
	console.log(testdata);
	console.log(Schema.ObjectId(testdata.Testid));
	var TestMarks=new addTestMarks({
		answersgiven:testdata.answersgiven,
		totalmarks:testdata.totalmarks,
		Testid:testdata.Testid,
		username:testdata.username,
		Answers:testdata.Answers,
		
	});

	TestMarks.save({},function(err,data){
		if(!err){
			console.log(data._id+"yes");
			cb(data._id);
			teststats.saveontestattempt(data)

		}else{
			console.log(err)
			return false;
		}

	});
}
exports.yourtestmarks=function(req,res){
	addTestMarks.find({username:req.body.username},function(err,data){
		if(!err){
			res.send(data);
		}else{
			res.send(err);
		}
	});
};
exports.finduserstats=function(req,res){
	addTestMarks.find({username:req.params.userid},function(err,data){
		var combineddata=[];
		if(err){
			res.send(err);
		}else{
			var k=0;
			for(i=0;i<data.length;i++){
				
			combineddatafinder=function(){
				var x=i;

				teststats.addTestStats.findOne({Testid:data[x].Testid},function(err,testdata){
					var testdata1=testdata;
					if(err){
						res.send(err);
					}else{
							k++;
							console.log(x);
					combineddata.push([testdata,data[x]]);
					if(k==data.length){
						res.send(combineddata);}
					return [testdata,data[x].testid];
					}
				});
			};
			combineddatafinder();
		}
		}

	});
}

exports.testpaperstats=function(req,res){
	addTestMarks.find({Testid:req.params.testid}).sort([['totalmarks','descending']]).exec(function(err,data){
		if(!err){
			res.send(data);

		}else{
			res.send(err);
		};
	});
};
exports.yourtestrank=function(req,res){
	information=[]
	addTestMarks.count({Testid:req.params.testid,totalmarks:{$gt:req.params.marks}},function(err,data){
		if(!err){
			console.log(data+1);
			information.push(data+1);

	addTestMarks.count({Testid:req.params.testid},function(err,data){
		if(!err){
			information.push(data);
			res.send(information);
		}else{
			res.send(err);
		}
	});
		}else{
			res.send(err);
		};
	});

};
exports.thistestmarks=function(req,res){
	addTestMarks.findOne({_id:req.params.marksid},function(err,data){
		if(!err){
			res.send(data);
		}else{
			res.send(err);
		}
	});
}
exports.toptenpeople=function(req,res){
	console.log(req.params.testid);
	addTestMarks.find({Testid:req.params.testid}).sort({totalmarks:-1}).limit(10).exec(function(err,data){
		if(!err){
			res.send(data);
		}else{
			console.log(err);
			res.send(err);
		}
	})
}









