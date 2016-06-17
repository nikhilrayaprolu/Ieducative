var app=angular.module('CoursesStudent',[]);
app.controller('CourseStudent',['$scope','$http','$location','AuthService',function($scope,$http,$location,AuthService){
	$scope.studentid=window.localStorage.user;
	$scope.courses=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};

	$scope.newcourse=function(id){
		window.location="http://localhost:8080/allcourses.html?id="+$scope.studentid;
		};
	$scope.coursesstudent=function(){
		AuthService.usertoken();
		$http.get("/student/"+$scope.studentid).then(function(response){
			console.log(response);
			$scope.courses=response.data;
		});
	};
	$scope.coursehome=function(id){
		window.location='http://localhost:8080/coursehome.html?id='+id;
	}
	$scope.TestPaper=function(){
		window.location='http://location:8080/testpapers.html?id='+$scope.studentid;
	}
}]);
app.config(function($locationProvider) {
 $locationProvider.html5Mode(true); 
});



