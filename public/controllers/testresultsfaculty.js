var app=angular.module('Ieducative',['ngRoute']);
app.controller('facultyresults',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	$scope.facultyid=window.localStorage.user;
	$scope.testid=$location.search().testid;
	$scope.response=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.submit=function(){
		console.log("submitted")
		$http.post("/addtopic",{topictitle:$scope.topictitle,topictext:$scope.topictext,Course:$scope.Course}).then(function(response){
			return response;
		});


	};
	$scope.facultystats=function(){
		$http.get('/testpaperstats/'+$scope.testid).then(function(response){
			console.log(response);
			$scope.response=response.data;
		})
	}

	$scope.results=function(marksid){
		window.location="http://localhost:8080/testresults.html?marksid="+marksid;
	}

}]);
app.config(function($locationProvider) {
 $locationProvider.html5Mode(true); 
});
