var app=angular.module('SignUp',[]);
app.controller('SignUpController',['$scope','$http',function($scope,$http,AuthService){
	$scope.name='',
	$scope.password='',
	$scope.FirstName='',
	$scope.LastName='',
	$scope.email='',
	$scope.phone='',
	$scope.dob='',
	$scope.studentclass='',
	$scope.schoolname='',
			
$scope.user={
	name:$scope.name,
	password:$scope.password,
	FirstName:$scope.FirstName,
	LastName:$scope.LastName,
	email:$scope.email,
	phone:$scope.phone,
	dob:$scope.dob,
	studentclass:$scope.studentclass,
	schoolname:$scope.schoolname,

};

$scope.submit=function(){
AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });		
		

 

  };	



}]);
		
/*		$http.post("/api/signup",{
	name:$scope.name,
	password:$scope.password,
	FirstName:$scope.FirstName,
	LastName:$scope.LastName,
	email:$scope.email,
	phone:$scope.phone,
	dob:$scope.dob,
	studentclass:$scope.studentclass,
	schoolname:$scope.schoolname,

}).then(function(response){
			alert(response);
			console.log(response);
			return response;

		});
*/

app.controller('SignInController',['$scope','$http','AuthService',function($scope,$http,AuthService,AUTH_EVENTS){
	$scope.name='',
	$scope.password='',
			$scope.user={
	name:$scope.name,
	password:$scope.password,

};
$scope.submit=function(){

    AuthService.login({
	name:$scope.name,
	password:$scope.password,

}).then(function(msg) {
      alert("success");
    }, function(errMsg) {
      alert("unsuccess");
    });

/*		$http.post("/api/authenticate",{
	name:$scope.name,
	password:$scope.password,

}).then(function(response){
			alert(response.data);
			console.log(response.data);
			return response;

		});
*/};
$scope.redirect=function(){
	$http.get("/api/memberinfo").then(function(response){
			document.write(response);
		});
};
	$scope.$on('auth-not-authenticated',function(event){
		AuthService.logout();
	alert("login again");
	});

}]);

/*$httpProvider.interceptors.push(['$rootScope', '$q', '$localStorage',
      function ($rootScope, $q, $localStorage) {
        return {
          request: function (config) {
            config.params = config.params || {};
            config.headers = config.headers || {};
            if ($localStorage.token) {
              config.headers.Authorization = $localStorage.token;
              config.params.token = $localStorage.token; 
            }
            return config;
          },
          response: function (res) {
            return res || $q.when(res);
          },
          'responseError': function(response) {
              if(response.status === 401 || response.status === 400) {
                //console.log("Not logged in");
                // Handle unauthenticated user
                $rootScope.$broadcast('unauthorized');
                //$location.path('auth/login');
              }
              return $q.reject(response);
          }
        };
      }
    ]);
*