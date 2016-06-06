var app=angular.module('TestForm',[]);
app.controller('TestCreator',['$scope','$http',function($scope,$http){
	$scope.QuestionNumber=5;
	$scope.Questions={};
	$scope.uniqueno=10;
	$scope.title=''
	$scope.correct=[];
	$scope.option=4;
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.submit=function(){
		console.log("submitted")
		$http.post("/testcreate",{QuestionNumber:$scope.QuestionNumber,Questions:$scope.Questions,Correct:$scope.correct}).then(function(response){
			return response;
		});


	};

}]);


