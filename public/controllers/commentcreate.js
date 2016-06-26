
app.controller('CommentCreateController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	$scope.Postid=$routeParams.id;
	$scope.user=window.localStorage.user;
	
	CommentBody='';
	
	$scope.submit=function(){
		$http.post("/forumcomment",{
			Postid:$scope.Postid,
			CommentBody:$scope.CommentBody,
			user:$scope.user,

		}).then(function(response){
			return response;
			alert("successfully submitted");
		});


	};
	
}]);
