
app.controller('TestCreator',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
	$scope.facultyname=window.localStorage.user;
	$scope.testid=$routeParams.id;
	$scope.data={};
	$scope.selectarray=["1(easy)","2(medium)","3(hard)"];
	//$scope.data.QuestionNumber=$scope.QuestionNumber;
	
	$scope.Questions={};
	$scope.uniqueno=10;
	$scope.title=''
	$scope.correct=[];
	$scope.option=4;
	$scope.testrating=1;
	$scope.subject='';
	this.class1=8;
	$scope.$watch("data.Questions",function(){
		console.log("success");
	})
	$scope.title='';
	$scope.getQuestionPaper=function(){
		$http.post("/testpaper",{testid:$scope.testid}).then(function(response){
			console.log(response);
			$scope.data=response.data[0];
			$scope.data.title=response.data[0].TestPaperTitle;
			$scope.Questions=response.data[0].Questions;
			$scope.Correct=response.data[0].Correct;
		
			console.log($scope.data);
			return response;
		});
	
	}
	$scope.getQuestionPaper();
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
	$scope.submit=function(){
		console.log("submitted");
		$http.post("/testcreate",{testid:$scope.data._id,TestPaperTitle:$scope.data.title,subject:$scope.data.subject,class:$scope.data.class,QuestionNumber:$scope.data.QuestionNumber,Questions:$scope.Questions,Correct:$scope.data.Correct,testrating:parseInt($scope.data.testrating[0]),facultyname:$scope.data.facultyname,State:"Active"}).then(function(response){
			return response;
		});


	};
	$scope.Draft=function(){
		console.log("drafted");
		$http.post("/testcreate",{testid:$scope.data._id,TestPaperTitle:$scope.data.title,subject:$scope.data.subject,class:$scope.data.class,QuestionNumber:$scope.data.QuestionNumber,Questions:$scope.Questions,Correct:$scope.data.Correct,testrating:parseInt($scope.data.testrating[0]),facultyname:$scope.data.facultyname,State:"Drafted"}).then(function(response){
			return response;
		});


	};
	


}]);


