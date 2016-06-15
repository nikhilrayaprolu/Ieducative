var app=angular.module('TestForm',[]);
app.controller('TestCreator',['$scope','$http',function($scope,$http){
	$scope.Questions={};
	$scope.Questionid='';
	$scope.QuestionNumber='';
	$scope.Answers=[];
	$scope.NoOfHours=1;
	$scope.username=window.localStorage.user;
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	var starttime=new Date();
	var endtime=new Date(starttime);
	endtime.setHours(starttime.getHours()+$scope.NoOfHours);
	$scope.getTimeRemaining=function (endtime){
		  var t = Date.parse(endtime) - Date.parse(new Date());
		  var seconds = Math.floor( (t/1000) % 60 );
		  var minutes = Math.floor( (t/1000/60) % 60 );
		  var hours = Math.floor( (t/(1000*60*60)) % 24 );
		  var days = Math.floor( t/(1000*60*60*24) );
		  return {
		    'total': t,
		    'days': days,
		    'hours': hours,
		    'minutes': minutes,
		    'seconds': seconds
		  };
		}
	$scope.initializeClock=function (id, endtime){
		  var clock = document.getElementById(id);
		  var timeinterval = setInterval(function(){
		    var t = $scope.getTimeRemaining(endtime);
		    clock.innerHTML = 'days: ' + t.days + '<br>' +
		                      'hours: '+ t.hours + '<br>' +
		                      'minutes: ' + t.minutes + '<br>' +
		                      'seconds: ' + t.seconds;
		    if(t.total<=0){
		      clearInterval(timeinterval);
		    }
		  },1000);
		}
	init=function(){

	$http.post("/testpaper",{testid:21}).then(function(response){
			console.log(response);
			$scope.Questions=response.data[0].Questions;
			$scope.Questionid=response.data[0]._id;
			$scope.QuestionNumber=response.data[0].QuestionNumber;
			
			return response;
		});
};
init();
$scope.initializeClock('clockdiv', endtime);
$scope.submit=function(){
		console.log("submitted")
		$http.post("/answercheck",{testid:$scope.Questionid,Answers:$scope.Answers,username:$scope.username}).then(function(response){
			console.log(response.data);
			console.log(response.data.completeresult,response.data.result);
			console.log(response.data.completeresult+response.data.result);
			alert(response.data.completeresult+response.data.result);
			window.location="http://localhost:8080/testresults.html?marksid="+response.data.marksid;
			return response;

		});


	};

}]);
