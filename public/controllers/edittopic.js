
app.controller('TopicEditor',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.id=$routeParams.id;
	$scope.topictitle='';
	$scope.topictext='';
	$scope.Course='';
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
	init=function(){
		$http.get("/findtopic/"+$scope.id).then(function(response){
			console.log(response.data[0]);
			$scope.topictext=response.data[0].topictext;
			$scope.topictitle=response.data[0].topictitle;
			$scope.Course=response.data[0].Course;
			return response;
		});
	};
	init();
	$scope.submit=function(){
		$http.put("/addTopic",{
	id:$scope.id,
	topictitle:$scope.topictitle,
	topictext:$scope.topictext,
	Course:$scope.Course,
	
			
			}).then(function(response){
			return response;
		});


	};
	$scope.delete=function(){
		$http.post("/removeTopic",{
			id:$scope.id,
		}).then(function(response){
			alert("Topic deleted");
		});
	};

}]);

