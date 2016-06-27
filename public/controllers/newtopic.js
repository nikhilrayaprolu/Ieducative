
app.controller('TopicCreator',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.topictitle="";
	$scope.topictext="";
	$scope.Course=$routeParams.courseid;
	init=function(){
		//console.log($location.search().id);
		//console.log($location.search());
	//	$scope.Course=$routeParams.courseid;
	//console.log($location.search().id);
	//Course=$location.search().id;
};
init();

	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.submit=function(){
		console.log("submitted")
		$http.post("/addtopic",{topictitle:$scope.topictitle,topictext:$scope.topictext,Course:$scope.Course}).then(function(response){
			
			$location.path('/coursehome/'+$scope.Course);
		});


	};

}]);


