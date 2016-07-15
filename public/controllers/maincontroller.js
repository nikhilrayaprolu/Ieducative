var app=angular.module('Ieducative',['ngRoute','ngAnimate','ui.materialize']);
app.controller('MainController',['$location','$scope','$http','$routeParams','AuthService',function($location,$scope,$http,$routeParams,AuthService){
	$scope.isAuthenticated=function(){
		return AuthService.isAuthenticated()};
	$scope.channels=[];
	$scope.notificationscount=0;
	console.log($scope.notificationscount);
	$scope.username=window.localStorage.user;
	$scope.profilepic=window.localStorage.profilepic;
	
	$scope.group=window.localStorage.group;
	
	$scope.notifications=[];
	

	var socket = io.connect();
	$scope.socket=socket;
	socket.on('connect',function(){
		if($scope.username){
			socket.emit('username',$scope.username);
		}else{
			
		}
	});
	
	AuthService.usertoken();
	$http.get('/userchannels/'+$scope.username).then(function(response){
		console.log(response);
		if(response.data.channels){
		$scope.channels=response.data.channels;	
		}
		
		console.log($scope.channels);
		$scope.channels.push('all');
		$scope.channels.push($scope.username);
		$http.post('/notificationsindbafterlogout',{channels:$scope.channels,username:$scope.username}).then(function(response){
			//$scope.notifications.push.apply($scope.notifications,response.data);
			$scope.notificationscount=response.data;
			console.log($scope.notificationscount);

		});
		socket.on('connect', function() {
	   // Connected, let's sign-up for to receive messages for this room
	   console.log($scope.channels);
	   for(room in $scope.channels){
	   		console.log($scope.channels[room]);
	   		socket.emit('room', String($scope.channels[room]));
	   		console.log(String($scope.channels[room]));
	   }});
		socket.on('message', function(data) {
			console.log('Incoming message:', data);
			notification={
				text:data.body,
				room:data.room,
				time:new Date()
			}
			$scope.notifications.push(notification);
			Materialize.toast(data.body, 10000) 
			$scope.notificationscount=$scope.notificationscount+1;
			console.log($scope.notificationscount);
			$scope.$digest();

		});
		socket.on('disconnect', function () {
        console.log("disconnected");  
    });

	});
	$scope.LogOut=function(){
		AuthService.logout();
		window.location='http://localhost:8080'
	}

	}]);