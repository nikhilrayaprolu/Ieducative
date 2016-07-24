
app.controller('ApplyFacultyController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	$scope.userid=window.localStorage.user;
	$scope.submit=function(){
		$http.post('/applyfaculty',{username:$scope.userid}).then(function(response){
			console.log(response);
			$location.path('/dashboarduser');
		})
	}
}]);
