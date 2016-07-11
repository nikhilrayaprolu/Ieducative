
app.controller('WatchVideoController',['$location','$scope','$http','$routeParams','$sce',function($location,$scope,$http,$routeParams,$sce){
	
	$scope.videoid=$routeParams.id;
	$scope.userid=window.localStorage.user;
	$scope.getIframeSrc = function (videoId) {
  return 'https://www.youtube.com/embed/' + 12;
};
$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.movie = {src:"http://www.youtube.com/embed/"+$routeParams.id, title:"Egghead.io AngularJS Binding"};
}]);
