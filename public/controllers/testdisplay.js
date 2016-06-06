var app=angular.module('TestForm',[]);
app.controller('TestCreator',['$scope','$http',function($scope,$http){
	$scope.Questions={};
	$scope.Questionid='';
	$scope.QuestionNumber='';
	$scope.Answers=[];

	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	init=function(){
	$http.post("/testpaper",{testid:16}).then(function(response){
			console.log(response);
			$scope.Questions=response.data[0].Questions;
			$scope.Questionid=response.data[0]._id;
			$scope.QuestionNumber=response.data[0].QuestionNumber;
			
			return response;
		});
};
init();
$scope.submit=function(){
		console.log("submitted")
		$http.post("/answercheck",{testid:$scope.Questionid,Answers:$scope.Answers}).then(function(response){
			console.log(response.data);
			console.log(response.data.completeresult,response.data.result);
			console.log(response.data.completeresult+response.data.result);
			alert(response.data.completeresult+response.data.result);
			return response;

		});


	};

}]);
