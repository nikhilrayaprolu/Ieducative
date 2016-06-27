
app.controller('PostBodyController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.postid=$routeParams.postid;
	$scope.userid=window.localStorage.user;
	$scope.Post={};
	$scope.Comments=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
	$scope.getComment=function(){
		$http.get('/forumcomment/'+$scope.postid).then(function(response){
			$scope.Comments=response.data;
		});
	};
	$scope.getComment();

	$scope.blogposts=function(){
		$http.get('/postbody/'+$scope.postid).then(function(response){
			$scope.Post=response.data;
		})
	}
	$scope.NewComment=function(){
		$scope.commentshow=1;

	}

	$scope.submit=function(){
		$http.post("/forumcomment",{
			Postid:$scope.postid,
			CommentBody:$scope.CommentBody,
			user:$scope.user,

		}).then(function(response){
			$scope.commentshow=0;
			$scope.Comments.push(response);
			alert("successfully submitted");
		});


	};
	
	//$scope.NewComment=function(){
	//	$location.path('/commentcreate/'+$scope.postid);
		//window.location="http://localhost:8080/commentcreate.html?postid="+$scope.postid;
	
	
}]);
