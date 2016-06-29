app.controller('NotificationReceiver',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.user=window.localStorage.user;
	//$scope.channels=[];
	//$scope.notifications=[];
  	//var socket = io.connect();

	$http.get('/userchannels/'+$scope.user).then(function(response){
		console.log(response);
		//$scope.channels=response.data.channels;
		//$scope.channels.push('all');
		//	$scope.channels.push($scope.user);
		console.log($scope.channels);
		$http.post('/notificationsindb',{channels:$scope.channels,username:$scope.user}).then(function(response){
			//console.log('success')
			$scope.notifications.push.apply($scope.notifications,response.data);

			//console.log(response.data);
			console.log($scope.notifications);
			$scope.notificationscount=0;
		});
		
	/*	socket.on('connect', function() {
	   // Connected, let's sign-up for to receive messages for this room
	   for(room in $scope.channels){
	   		socket.emit('room', room);
	   }
	   })
	});*/
	$scope.submit=function(){
		console.log('emitted');
		$scope.socket.emit('newnotification',{room:'all',body:'hello nikhil'});
	};
});
}]);
