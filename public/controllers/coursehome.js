
app.controller('CourseHome',['$scope','$http','$location','$routeParams',function($scope,$http,$location,'$routeParams'){
	$scope.facultyid=window.localStorage.user;
	$scope.topics=[];
	$scope.Course_id=$routeParams.id;
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.newtopic=function(id){
		$location.path('/newtopic/'+$scope.Course_id);
		//window.location="http://localhost:8080/newtopic.html?id="+$scope.Course_id;
		};
	$scope.Blog=function(){
		$location.path('/courseblog/'+$scope.Course_id);
		//window.location="http://localhost:8080/courseblog.html?courseid="+$scope.Course_id;
	}
	topiccourses=function(){
		$http.post("/findTopic",{Course:$scope.Course_id}).then(function(response){
			console.log(response);
			$scope.topics=response.data;
		});
	};
	topiccourses();


	

}]);


