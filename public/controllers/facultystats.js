
app.controller('facultystats',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.tests={};
	$scope.facultyid=window.localStorage.user;
	$scope.response={};
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
		$http.get('/facultyteststats/'+$scope.facultyid).then(function(response){
			console.log(response);
			$scope.response=response.data;
		})
	}
	$scope.results=function(marksid){
		$location.path('/testresultsfaculty/'+marksid);
		//window.location="http://localhost:8080/testresultsfaculty.html?testid="+marksid;
	}

}]);
