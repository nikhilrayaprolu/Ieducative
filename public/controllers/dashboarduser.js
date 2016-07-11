app.controller('DashBoardController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
	$scope.username=window.localStorage.user;
	$scope.topics=[];
	
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
}]);
