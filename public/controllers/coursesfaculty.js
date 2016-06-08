var app=angular.module('CourseFaculty',[]);
app.controller('CourseFaculty',['$scope','$http',function($scope,$http){
	$scope.facultyid='slj';
	$scope.courses=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.newcourse=function(id){
		window.location="http://localhost:8080/newcourse.html?id="+id;
		};
	$scope.coursesfaculty=function(){
		$http.get("/faculty/"+$scope.facultyid).then(function(response){
			console.log(response);
			$scope.courses=response.data;
		});
	};
	$scope.coursehome=function(id){
		window.location='http://localhost:8080/coursehome.html?id='+id;
	}


	

}]);


