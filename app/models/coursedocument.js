var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');
var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var CourseDocument=mongoose.Schema({
		Courseid:Number,
		Document:String,
		DocumentTitle:String,
		DocumentDescription:String,
		createdAt:Date,
},{collection:'CourseDocument'});
CourseDocument.plugin(autoIncrement.plugin,'CourseDocument');
var addCourseDocument=mongoose.model('addCourseDocument',CourseDocument);
exports.saveNewDocument=function(req,res){
	console.log(req.body);
	console.log(JSON.stringify(req.body, null, 3));
	var CourseDocument=new addCourseDocument({
		Courseid:req.params.courseid,
		Document:req.file.filename,
		DocumentTitle:req.body.Title,
		DocumentDescription:req.body.Description,
		createdAt:new Date()
	})
	CourseDocument.save({},function(err,data){
		if(!err){
			res.send(data);
		}else{
			res.send(err);
		}
	})

}
exports.getCourseDocument=function(req,res){
	addCourseDocument.find({Courseid:req.params.courseid},null,{sort:{_id:-1}},function(err,data){
		if(err){
			res.send(err);
		}else{
			res.send(data);
		}
	})
}

