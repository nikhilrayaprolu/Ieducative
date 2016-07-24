
app.controller('ForgotPassword',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	$scope.hashvalue=$routeParams.hashid;
	$scope.newpassword='';
	$scope.checkhashcorrect=function(){
		$http.post("/checkhashcorrect",{hashvalue:$routeParams.hashid}).then(function(response){
			if(response.data.username){
				$scope.username=response.data.username;	
			}else{
				console.log(response);
			}
			

		});

	}
	$scope.checkhashcorrect();
	$scope.submit=function(){
		$http.post("/api/forgotpassword",{name:$scope.username,newpassword:$scope.newpassword}).then(function(response){
			console.log(response);
		})
	}
}]);
