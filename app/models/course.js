var path=require('path');


var mongoose=require('mongoose'),
Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');
var mongoose = require('mongoose');
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;
var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");
var Courses=mongoose.Schema({
	name:String,
	syllabus:String,
	fees:Number,
	durationWeeks:Number,
	faculty:Array,
	student:Array,
	pre_requisites:Array,
	profilephoto:String,
	courseclass:Number,
},{collection:'courses'});
/*Courses.plugin(filePlugin, {
	name: "photo",
	upload_to: make_upload_to_model(uploads, 'photos'),
	relative_to: uploads_base
});*/
Courses.plugin(autoIncrement.plugin,'Courses');

var addCourse=mongoose.model('addCourse',Courses);
/*exports.saveNewCourse=function(req,res){
	 console.log(req.body);
	var courseData=new addCourse(req.body);
	if(req.file){
	courseData.set('profilephoto',req.file.filename);}

	courseData.save({},function(err,data){
		if(!err){	
			res.sendStatus(200);
		}else{
			res.send(err);
		}
	});
}*/
exports.deleteCourse=function(req,res){
	if(req.body.id){
		addCourse.remove({_id:req.body.id},function(err){
			if(!err){
				res.sendStatus(200);
			}else{
				console.log(err);
			}
		});
	};
};
exports.saveNewCourse=function(req,res){
if(req.body.id){
	addCourse.findOne({_id:req.body.id},function(err,course){
		
		
		course.name=req.body.name;
		course.syllabus=req.body.syllabus;
		course.fees=req.body.fees;
		course.durationWeeks=req.body.durationWeeks;
		course.faculty=req.body.faculty;
		course.student=req.body.student;
		course.pre_requisites=req.body.pre_requisites;
		course.courseclass=req.body.courseclass;
		course.save(function(err){
			if(err){
				console.log(err);

			}else{
				console.log('success');
				res.sendStatus(200);
			}
		});
	});
}
else{
	console.log(req.body);
	var courseData=new addCourse(req.body);
	if(req.file){
	courseData.set('profilephoto',req.file.filename);}

	courseData.save({},function(err,data){
		if(!err){	
			res.sendStatus(200);
		}else{
			res.send(err);
		}
	});
}
};
exports.findCourseDetails=function(req,res){
	if(req.body.id!=null){
		addCourse.find({_id:req.body.id},function(err,data){
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
exports.findCoursesoffaculty=function(req,res){
	if(req.params.facultyid!=null){
		addCourse.find({faculty:req.params.facultyid},function(err,data){
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


	}
}



























