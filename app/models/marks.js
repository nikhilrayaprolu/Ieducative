var User = require('./user');
var Test = require('./testpaper');
var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var TestMarks=mongoose.Schema({
	answersgiven:Array,
	totalmarks:Number,
	Userid:Number,
	Testid:Number,
},{collection:'TestMarks'});
TestMarks.plugin(autoIncrement.plugin,'TestMarks');

var addTestMarks=mongoose.model('addTestMarks',TestMarks);
exports.saveNewTestMarks=function(testdata){
	console.log(testdata);
	console.log(Schema.ObjectId(testdata.Testid));
	var TestMarks=new addTestMarks({
		answersgiven:testdata.answersgiven,
		totalmarks:testdata.totalmarks,
		Testid:testdata.Testid,
	});

	TestMarks.save({},function(err,data){
		if(!err){
			return true;

		}else{
			console.log(err)
			return false;
		}

	});
}












