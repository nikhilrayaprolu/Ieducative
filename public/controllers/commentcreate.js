var app=angular.module('Ieducative',['ngRoute']);
app.controller('CommentCreateController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.Postid=$location.search().postid;
	$scope.user=window.localStorage.user;
	
	CommentBody='';
	
	$scope.submit=function(){
		$http.post("/forumcomment",{
			Postid:$scope.Postid,
			CommentBody:$scope.CommentBody,
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
