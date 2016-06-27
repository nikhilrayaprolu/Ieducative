
app.controller('CourseStudent',['$scope','$http','$location','AuthService',function($scope,$http,$location,AuthService){
	$scope.studentid=window.localStorage.user;
	$scope.courses=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};

	$scope.coursesstudent=function(){
		AuthService.usertoken();
		$http.get("/student/"+$scope.studentid).then(function(response){
			console.log(response);
			$scope.courses=response.data;
		});
	};
	$scope.coursesstudent();
	$scope.coursehome=function(id){
		$location.path('coursehome/'+id);
		//window.location='http://localhost:8080/coursehome.html?id='+id;
	}
	
}]);



