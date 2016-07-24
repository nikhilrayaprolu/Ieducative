app.controller('TestPaperConditions',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
	$scope.userid=window.localStorage.user;
	$scope.testid=$routeParams.testid;
	$scope.Agree=false;
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.testpaperdisplay=function(){
		if($scope.Agree==true){
		$location.path('/testdisplay/'+$scope.testid);}
		else{
			alert("agree first");
		}
	}


	

}]);


