
app.controller('NotificationReceiver',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.user=window.localStorage.user;
	$scope.channels=[];
  var socket = io.connect();

$http.get('/userchannels/'+$scope.user).then(function(response){
	console.log(response);
	$scope.channels=response.data.channels;
	console.log($scope.channels);
	socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   for(room in $scope.channels){
   		socket.emit('room', room);
   }
   	
   })
});





socket.on('message', function(data) {
   console.log('Incoming message:', data);
});

	$scope.submit=function(){
		socket.emit('newnotification',{room:1,body:'hello nikhil'});
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
