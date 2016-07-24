
app.controller('ForgotPasswordRequest',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.username='';
	$scope.emailid='';
	$scope.submit=function(){
		$http.post('/forgotpasswordmailsend',{username:$scope.username,emailid:$scope.emailid}).then(function(response){
			console.log(response);
		})
	}
}]);
