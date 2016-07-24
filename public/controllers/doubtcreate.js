
app.controller('NewQuestionController',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.data={};
	$scope.data.course=$routeParams.courseid;
	$scope.data.user=window.localStorage.user;
	
	$scope.Title='';
	$scope.PostBody='';
	$scope.Topic='';
	$scope.submit=function(){
		if($scope.data.PostBody){
			$http.post("/forumpost",{

				Title:$scope.data.Title,
				course:$scope.data.course,
				Topic:$scope.data.Topic,
				PostBody:$scope.data.PostBody,
				user:$scope.data.user,


			}).then(function(response){

				alert("successfully submitted");
				$location.path('/courseblog/'+$scope.data.course);
			});

		}
		else{
			alert("fill the required details");
		}
		

	};
	 $('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');
	
}]);
