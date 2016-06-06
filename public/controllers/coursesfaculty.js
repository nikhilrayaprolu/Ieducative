var app=angular.module('CourseFaculty',[]);
app.controller('CourseFaculty',['$scope','$http',function($scope,$http){
	$scope.facultyid='slj';
	$scope.courses=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.newcourse=function(){
		window.location="localhost:8080/newcourse.html"
		};
	$scope.coursesfaculty=function(){
		$http.get("/faculty/slj").then(function(response){
			console.log(response);
			$scope.courses=response.data;
		});
	};


	

}]);


