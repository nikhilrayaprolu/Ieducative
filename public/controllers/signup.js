
app.controller('SignUpController',['$scope','$http','AuthService',function($scope,$http,AuthService){
	$scope.pageClass = 'page-home';
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
   AuthService.login({
	name:$scope.name,
	password:$scope.password,

}).then(function(msg) {
	console.log(msg);
      if(msg=='Faculty'){
      	$location.path('/dashboarduser');
      	//window.location="http://localhost:8080/coursesfaculty";

      }else{
      	//window.location="/coursesstudent";
      	$location.path('/dashboarduser')
      };

    }, function(errMsg) {
      alert("unsuccess");
    });
    }, function(errMsg) {
      alert("registration is not successfull")
    });		
		

 

  };	



}]);
		

app.controller('SignInController',['$scope','$http','AuthService','$location',function($scope,$http,AuthService,$location){
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
      	$location.path('/dashboarduser');
      	//window.location="http://localhost:8080/coursesfaculty";

      }else{
      	//window.location="/coursesstudent";
      	$location.path('/dashboarduser')
      };

    }, function(errMsg) {
      alert("unsuccess");
    });

};

	$scope.$on('auth-not-authenticated',function(event){
		AuthService.logout();
	alert("login again");
	});

}]);