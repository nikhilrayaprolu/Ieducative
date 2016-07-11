
app.controller('YourProfile',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.userid=window.localStorage.user;
	$scope.profile={};
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
	$scope.getuserdetailstillnow=function(){
		$http.get('/updateprofile/'+$scope.userid).then(function(response){
			$scope.profile=response.data;
		})
	}
	$scope.getuserdetailstillnow();
	$scope.submit=function(){
		$http.post('/updatedprofile/'+$scope.userid,{profile:$scope.profile}).then(function(response){
			console.log(response);
			$location.path('/updatephoto');
		})
	}

}]);


