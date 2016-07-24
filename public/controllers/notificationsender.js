app.controller('NotificationSender',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.Postid=$location.search().postid;
	$scope.user=window.localStorage.user;
	$scope.Room='';
	$scope.Body='';
	
	$scope.submit=function(){
		console.log('emitted');
		$scope.socket.emit('newnotification',{room:$scope.Room,body:$scope.Body});
	};
	
}]);
