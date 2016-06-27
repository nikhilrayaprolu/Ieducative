
app.controller('NewQuestionController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.course=$routeParams.courseid;
	$scope.user=window.localStorage.user;
	$scope.Title='';
	$scope.PostBody='';
	$scope.Topic='';
	$scope.submit=function(){
		$http.post("/forumpost",{
			Title:$scope.Title,
			course:$scope.course,
			Topic:$scope.Topic,
			PostBody:$scope.PostBody,
			user:$scope.user,


		}).then(function(response){
			
			alert("successfully submitted");
			$location.path('/courseblog/'+$scope.course);
		});


	};
	
}]);
