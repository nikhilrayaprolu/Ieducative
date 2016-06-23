var app=angular.module('Ieducative',['ngRoute']);
app.controller('PostBodyController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.postid=$location.search().postid;
	$scope.userid=window.localStorage.user;
	$scope.Post={};
	$scope.Comments=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
	$scope.getComment=function(){
		$http.get('/forumcomment/'+$scope.postid).then(function(response){
			$scope.Comments=response.data;
		});
	};
	$scope.getComment();

	$scope.blogposts=function(){
		$http.get('/postbody/'+$scope.postid).then(function(response){
			$scope.Post=response.data;
		})
	}
	$scope.NewComment=function(){
		window.location="http://localhost:8080/commentcreate.html?postid="+$scope.postid;
	};
	
}]);
app.config(function($locationProvider) {
 $locationProvider.html5Mode(true); 
});
