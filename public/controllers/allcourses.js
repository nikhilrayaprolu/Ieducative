
app.controller('AllCourses',['$scope','$http','$location','AuthService',function($scope,$http,$location,AuthService){
	$scope.studentid=$location.search().id;
	$scope.courses=[];
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	AuthService.usertoken();
	$scope.allcourses=function(){
		AuthService.usertoken();
		$http.get("/courses/").then(function(response){
			console.log(response);
			$scope.courses=response.data;
		});
	};
	$scope.coursehome=function(id){
		$location.path('/coursehome/'+id)
		//window.location='http://localhost:8080/coursehome.html?id='+id;
	};
	$scope.subscribe=function(id){
		console.log(id);
		$http.post('/subscribe',{username:$scope.studentid,courseid:id}).then(function(response){
			response("subscribed")
		})
	};
}]);
	



