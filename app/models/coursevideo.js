'use strict'
var path=require('path');
var parseIsoDuration = require('parse-iso-duration');

var uploads_base = path.join(__dirname, "/../../public/images/");
const Youtube = require("youtube-api")
, fs = require("fs")
, readJson = require("r-json")
, Lien = require("lien")    

, opn = require("opn")

;
// I downloaded the file from OAuth2 -> Download JSON 
const CREDENTIALS = readJson(`${__dirname}/../../credentials.json`);
console.log('1');
let server = new Lien({
	host: "localhost"
	, port: 5000
});

let oauth = Youtube.authenticate({
	type: "oauth"
	, client_id: CREDENTIALS.web.client_id
	, client_secret: CREDENTIALS.web.client_secret
	, redirect_url: CREDENTIALS.web.redirect_uris[0]
});
console.log('2');
opn(oauth.generateAuthUrl({
	access_type: "offline"
	, scope: ["https://www.googleapis.com/auth/youtube.upload"]
}));
console.log('3');

var mongoose=require('mongoose'),

Schema=mongoose.Schema,
autoIncrement=require('mongoose-auto-increment');

var db=require("./../../config/database")
var connection=mongoose.createConnection("mongodb://localhost/node-rest-auth")
autoIncrement.initialize(connection);
var CourseVideo=mongoose.Schema({
	Courseid:Number,
	Video:String,
	VideoTitle:String,
  VideoLenghth:Date,
  VideoChannel:String,
  VideoDescription:String,
  VideoThumbnail:Object,
  VideoPublished:Date,
},{collection:'CourseVideo'});
CourseVideo.plugin(autoIncrement.plugin,'CourseVideo');

var addCourseVideo=mongoose.model('addCourseVideo',CourseVideo);
server.addPage("/oauth2callback", lien => {
	console.log("Trying to get the token using the following code: " + lien.query.code);
	oauth.getToken(lien.query.code, (err, tokens) => {

		if (err) {
			lien.lien(err, 400);
			return Logger.log(err);
		}



		oauth.setCredentials(tokens);

		lien.end("The video is being uploaded. Check out the logs in the terminal.");



	});
});
exports.getCourseVideos=function(req,res){
	addCourseVideo.find({Courseid:req.params.courseid},null,{sort:{VideoPublished:-1}},function(err,data){
		if(err){
			res.send(err);
		}else{
			res.send(data);
		}
	})
}
exports.saveNewVideo=function(req,res){
	
	console.log(req.body,req.file);
	console.log(req.file.filename);
	var req1 = Youtube.videos.insert({
		resource: {
                // Video title and description 
                snippet: {
                	title: req.body.Title
                	, description: req.body.Description
                }
                // I don't want to spam my subscribers 
                , status: {
                	privacyStatus: "public"
                }
            }
            // This is for the callback function 
            , part: "snippet,status,contentDetails,player,statistics"

            // Create the readable stream to upload the video 
            , media: {
            	body: fs.createReadStream(uploads_base+req.file.filename)
            }
        }, (err, data) => {
        	if(err){
        		console.log(err);
        	}else{
             console.log(data);
             console.log("Done.");
             fs.unlink(uploads_base+req.file.filename,function(err){
               console.log(err);
           });
             console.log('Video was uploaded with ID:', data.id)
             console.log(data.snippet.title);
             var Video=new addCourseVideo({
              Courseid:req.params.courseid,
              Video:data.id,
              VideoTitle:data.snippet.title,
              VideoLenghth:parseIsoDuration(data.contentDetails.duration),
              VideoChannel:data.snippet.channelTitle,
              VideoDescription:data.snippet.description,
              VideoThumbnail:data.snippet.thumbnails.default,
              VideoPublished:new Date()

          });
             Video.save({},function(error,data){
              if(error){
               console.log(error);
               res.send(error);
           }else{
               console.log(data);
               res.send(data);
           }
       })

         }
     });


};


