var app=angular.module('Ieducative',['ngRoute']);
app.controller('NewQuestionController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.course=$location.search().courseid;
	$scope.user=window.localStorage.user;
	$scope.Title='';
	$scope.PostBody='';
	$scope.Topic='';
	$scope.submit=function(){
		$http.post("/forumpost",{
			Title:$scope.Title,
			course:$scope.course,
			Topic:$scope.Topic,
			PostBody:$scope.PostBody,
			user:$scope.user,


		}).then(function(response){
			return response;
			alert("successfully submitted");
		});


	};
	
}]);
app.config(function($locationProvider) {
 $locationProvider.html5Mode(true); 
});
