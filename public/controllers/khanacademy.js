app.controller('KhanAcademyController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	
	$scope.userid=window.localStorage.user;
	$scope.khanid='';
	$scope.updateid=function(){
		$http.post('/updatekhanid',function(response){
			console.log(response);
		})
	}
}]);
