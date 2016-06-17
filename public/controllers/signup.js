var app=angular.module('SignUp',[]);
app.controller('SignUpController',['$scope','$http','AuthService',function($scope,$http,AuthService){
	$scope.name='',
	$scope.password='',
	$scope.FirstName='',
	$scope.LastName='',
	$scope.email='',
	$scope.phone='',
	$scope.dob='',
	$scope.studentclass='',
	$scope.schoolname='',
$scope.submit=function(){
AuthService.register({
	name:$scope.name,
	password:$scope.password,
	FirstName:$scope.FirstName,
	LastName:$scope.LastName,
	email:$scope.email,
	phone:$scope.phone,
	dob:$scope.dob,
	studentclass:$scope.studentclass,
	schoolname:$scope.schoolname,

}).then(function(msg) {
      alert("registration successfull Please Login to have the fun")
    }, function(errMsg) {
      alert("registration is not successfull")
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
	console.log(msg);
      if(msg=='Faculty'){
      	window.location="http://localhost:8080/coursesfaculty.html?id="+$scope.name;
      }else{
      	window.location="http://localhost:8080/coursesstudent.html?id="+$scope.name;
      };

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
    ]);*/