var app=angular.module('Ieducative',[]);
app.controller('CourseHome',['$scope','$http','$location',function($scope,$http,$location){
	$scope.facultyid='slj';
	$scope.topics=[];
	$scope.Course_id=$location.search().id;
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.newtopic=function(id){
		window.location="http://localhost:8080/newtopic.html?id="+$scope.Course_id;
		};
	$scope.Blog=function(){
		window.location="http://localhost:8080/courseblog.html?courseid="+$scope.Course_id;
	}
	topiccourses=function(){
		$http.post("/findTopic",{Course:$scope.Course_id}).then(function(response){
			console.log(response);
			$scope.topics=response.data;
		});
	};
	topiccourses();


	

}]);
app.config(function($locationProvider) {
 $locationProvider.html5Mode(true); 
});


