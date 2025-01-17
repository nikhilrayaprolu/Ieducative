
app.controller('CourseBlogController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	
	$scope.courseid=$routeParams.id;
	$scope.userid=window.localStorage.user;
	$scope.Questions=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.submit=function(){
		$http.post("/addtopic",{topictitle:$scope.topictitle,topictext:$scope.topictext,Course:$scope.Course}).then(function(response){
			return response;
		});


	};
	$scope.blogposts=function(){
		$http.get('/forumpost/'+$scope.courseid).then(function(response){
			$scope.Questions=response.data;
		})
	};
	$scope.NewQuestion=function(){
		$location.path('/doubtcreate/'+$scope.courseid);
		//window.location="http://localhost:8080/doubtcreate.html?courseid="+$scope.courseid;
	};
	$scope.postmain=function(id){
		$location.path('/doubt/'+id);
		//window.location="http://localhost:8080/postbody.html?postid="+id;
	}
}]);
