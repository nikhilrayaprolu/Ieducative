var app=angular.module('SignUp',[]);
app.factory('initialretriever',function($http){
	console.log('OK')
	return $http.get('/api/memberinfo');
});

app.controller('MemberController',['$scope','$http','$rootScope','AuthService','initialretriever',function($scope,$http,AuthService,AUTH_EVENTS,initialretriever,$rootScope){
	initialretriever.success(function(data){
		document.write(data);
	});
	$scope.submit=function(){
		console.log("submitted")
		AuthService.usertoken();
		

		$http.get("/api/memberinfo").then(function(response){
			console.log(response);
		});


	};

}]);
