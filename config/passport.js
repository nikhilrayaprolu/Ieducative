var JwtStrategy = require('passport-jwt').Strategy;
var User=require('../app/models/user');
var config = require('../config/database');
module.exports = function(passsport){
	var opts={};
	opts.secretOrKey=config.secret;
	passsport.use(new JwtStrategy(opts,function(jwt_payload,done){
		User.findOne({id:jwt_payload.id},function(err,user){
			if(err){
		
				return done(err,false);
			}
			if(user){
		
				done(null,user);
			}else{
		
				done(null,false);
			}
		});
	}));
};