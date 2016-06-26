var app=angular.module('Ieducative',['ngRoute']);
app.controller('MainController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.username=window.localStorage.user;
	$scope.group=window.localStorage.group;
	

}]);
app.config(function($locationProvider) {
 $locationProvider.html5Mode(true); 
});
