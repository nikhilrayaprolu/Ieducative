
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
      	$location.path('/coursesfaculty');
      	//window.location="http://localhost:8080/coursesfaculty";

      }else{
      	//window.location="/coursesstudent";
      	$location.path('/coursesstudent')
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