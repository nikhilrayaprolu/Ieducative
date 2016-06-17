var app=angular.module('Ieducative',[]);
app.controller('TestPaper',['$scope','$http','$location','AuthService',function($scope,$http,$location,AuthService){
	$scope.studentid=window.localStorage.user;
	$scope.TestPaper=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};

	$scope.newcourse=function(id){
		window.location="http://localhost:8080/allcourses.html?id="+$scope.studentid;
		};
	$scope.TestPapers=function(){
		AuthService.usertoken();
		$http.get("/testpapers/").then(function(response){
			console.log(response);
			$scope.TestPaper=response.data;
			//alert(window.localStorage);
			console.log(window.localStorage.user);
		});
	};
	$scope.testpaperhome=function(id){
		window.location='http://localhost:8080/testdisplay.html?id='+id;
	}
}]);
app.config(function($locationProvider) {
 $locationProvider.html5Mode(true); 
});



