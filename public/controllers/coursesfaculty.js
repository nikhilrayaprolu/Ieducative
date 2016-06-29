
app.controller('CourseFaculty',['$scope','$http','$location','AuthService',function($scope,$http,$location,AuthService){
	$scope.facultyid=window.localStorage.user;
	$scope.courses=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.newcourse=function(){
		$location.path('/newcourse/');
		//window.location="http://localhost:8080/newcourse.html?id="+id;
		};
	$scope.coursesfaculty=function(){
		AuthService.usertoken();
		$http.get("/faculty/"+$scope.facultyid).then(function(response){
			console.log(response);
			$scope.courses=response.data;
		});
	};
	$scope.coursehome=function(id){
		$location.path('/coursehome/'+id);
		//window.location='http://localhost:8080/coursehome.html?id='+id;
	}
}]);



