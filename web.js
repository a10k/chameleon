/**
 * Chemeleon Game !
 *
 *
 * written by alok pepakayala (c)
 * 
 * Copyright(c) 2015 
 * a10k@icloud.com
 */


var express = require("express");
var app = express();
var mongoo = require('mongoose');
var Schema = mongoo.Schema;
var schedule = require('node-schedule'); // for cron like scheduling
var rule = new schedule.RecurrenceRule(); //rule for cron like scheduling
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var request = require('request');

rule.hour = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23]; //cron times
rule.minute = 0; //cron times

app.use(express.bodyParser());
app.enable('trust proxy');
app.use('/media', express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(session({ secret: 'a10k' })); // session secret anything is fine
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//Schema for storing user records
var userSchema = mongoo.Schema({
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    chameleon : {
    	score        : { type: Number, default: 0 },
    	arcade       : { type: Number, default: 1 },
    	rank         : { type: Number, default: 99999 }
    }
});


//Connection and compilation
 mongoo.connect('mongodb://chameleon:chameleon-open@alex.mongohq.com:10007/a10kfdb');
 var User = mongoo.model('User', userSchema);

//Functions for date range
 Date.prototype.addDays = function(days) {
   var dat = new Date(this.valueOf())
   dat.setDate(dat.getDate() + days);
   return dat;
 }
 function getDates(startDate, stopDate) {
   var dateArray = new Array();
   var currentDate = startDate;
   while (currentDate <= stopDate) {
     dateArray.push(currentDate)
     currentDate = currentDate.addDays(1);
   }
   return dateArray;
 }








/* // DEBUG HANDLE 
 app.post('/',function(req,res){
 	console.log(req.body);
 	res.send(req.body);
 });*/

app.post('/fbuserchk',function(req,res){
	handleFBuser(req.body,res);
})

app.get('/start',function(req,res){
	//console.log("test");
	//handleFBuser({id:'abc',name:'test',token:'123',email:'test@example.com'},res);
	res.redirect("Arcade.html");
})

app.post('/', function(req, res) {
	res.redirect("index.html");
});

// Listeners
 var port = process.env.PORT || 8080;
 app.listen(port, function() {
    console.log("Listening on " + port);
 });



console.log("Chemeleon  Game \nALOK PEPAKAYALA");

//june9 performed massive cleanup to reduce loc 

//fb user handling
var handleFBuser = function(profile,res){
	User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
		if (err){return;}
		if (user) {
			console.log("Already present " + profile.name);
			res.send(profile.name);
		} else {
			// if there is no user, create them
			var newUser = new User();
			newUser.facebook.id    = profile.id;
			newUser.facebook.token = profile.token;
			newUser.facebook.name  = profile.name;
			newUser.facebook.email = profile.email;
			newUser.save(function(err) {
				if (err){return;}
				console.log("Created user " + profile.name)
				res.send(profile.name);
			});
		}
	});
}



// Create FB notifications 
var createFBnotification = function(User_id_string,msg_string){
	request.get('https://graph.facebook.com/oauth/access_token?client_id=1431028050502861&client_secret=c2c81c65555e733ff0f30af762c5271b&grant_type=client_credentials',{},
		function(error,response,access_token_string){
			if(error){return;}
			if(!access_token_string){return;}
			var Full_string = 'https://graph.facebook.com/'+User_id_string+'/notifications?'+access_token_string+'&template='+msg_string;
			request.post(Full_string);
	});
}
