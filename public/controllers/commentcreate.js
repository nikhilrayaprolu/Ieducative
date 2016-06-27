
app.controller('CommentCreateController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	$scope.Postid=$routeParams.id;
	$scope.user=window.localStorage.user;
	$scope.commentshow=0;
	CommentBody='';
	$scope.NewComment=function(postid){
		$scope.commentshow=1;

	}

	$scope.submit=function(){
		$http.post("/forumcomment",{
			Postid:$scope.postid,
			CommentBody:$scope.CommentBody,
			user:$scope.user,

		}).then(function(response){
			return response;
			alert("successfully submitted");
		});


	};
	
}]);
