
app.controller('TestResults',['$scope','$http','$location','AuthService','$routeParams',function($scope,$http,$location,AuthService,$routeParams){
	$scope.studentid=window.localStorage.user;
	$scope.marksid=$routeParams.marksid;
	$scope.testid='';
	$scope.TestPaper=[];
	$scope.NoofAttemptedStudents=0;
	$scope.presentRank=0;
	$scope.marks=0;
	$scope.Questions={};
	$scope.Questionid='';
	$scope.QuestionNumber='';
	$scope.Answers=[];
	$scope.CorrectAnswers=[];
	$scope.questionwiseresult='';
	$scope.topten=[];
	$scope.rating=1;
	$scope.rated=false;
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};

	$scope.yourtestresults=function(){
		AuthService.usertoken();
		$http.get("/testresults/"+$scope.marksid).then(function(response){
			$scope.questionwiseresult=response.data.data.answersgiven;
	$scope.marks=response.data.data.totalmarks;
	$scope.studentid=response.data.data.username;
	$scope.testid=response.data.data.Testid;
	$scope.Answers=response.data.data.Answers;
	$scope.rated=response.data.rating;
	console.log(response.data)
	console.log(response.data.Testid)
	$http.post("/testpaper",{testid:response.data.data.Testid}).then(function(response){
			console.log(response);
			$scope.Questions=response.data[0].Questions;
			$scope.Questionid=response.data[0]._id;
			$scope.QuestionNumber=response.data[0].QuestionNumber;
			$scope.CorrectAnswers=response.data[0].Correct;

			return response;
		});
	$http.get("/userrank/"+$scope.testid+'/'+$scope.marks).then(function(response){
		$scope.presentRank=response.data[0];
		$scope.NoofAttemptedStudents=response.data[1];
	});
	$http.get("/topten/"+$scope.testid).then(function(response){
		$scope.topten=response.data;
	});

		});
		
};

	$scope.testpaperhome=function(id){
		$location.path('/testdisplay/'+id);
		//window.location='http://localhost:8080/testdisplay.html?id='+id;
	};
	$scope.submitrating=function(){
		$http.post('/testrating',{
		Rating:$scope.rating,
		Testid:$scope.testid,
		username:$scope.studentid,
		}).then(function(response){
			alert("rating Submitted")
		})
	};
}]);



