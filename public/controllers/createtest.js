
app.controller('TestCreator',['$scope','$http',function($scope,$http){
	$scope.facultyname=window.localStorage.user;
	$scope.QuestionNumber=5;
	$scope.Questions={};
	$scope.uniqueno=10;
	$scope.title=''
	$scope.correct=[];
	$scope.option=4;
	$scope.testrating=1;
	$scope.subject='';
	$scope.class='';
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
	$scope.submit=function(){
		console.log("submitted")
		$http.post("/testcreate",{title:$scope.title,subject:$scope.subject,class:$scope.class,QuestionNumber:$scope.QuestionNumber,Questions:$scope.Questions,Correct:$scope.correct,testrating:$scope.testrating,facultyname:$scope.facultyname}).then(function(response){
			return response;
		});


	};


}]);


