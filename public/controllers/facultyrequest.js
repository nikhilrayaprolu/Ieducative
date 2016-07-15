app.controller('facultyrequestcontroller',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	
	$scope.user=window.localStorage.user;
	$scope.facultyrequest=function(){
		$http.post('/facultyrequestconfirm',{username:$scope.user}).then(function(response){
			console.log(response);
		})
	}
	
}]);
