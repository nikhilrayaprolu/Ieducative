
app.controller('SignUpController',['$scope','$http','AuthService','$location',function($scope,$http,AuthService,$location){
	if(AuthService.isAuthenticated()){
		console.log(AuthService.isAuthenticated());
		$location.path('/dashboarduser');
	}
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
      	$location.path('/profile');
      	//window.location="http://localhost:8080/coursesfaculty";

      }else if(msg=='Student'){
      	//window.location="/coursesstudent";
      	$location.path('/profile')
      }else{

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
	
	$scope.password='',
			$scope.user={
	name:$scope.name,
	password:$scope.password,

};
$scope.forgotpassword=function(){
	$location.path('/forgotpasswordrequest');
}
$scope.submit=function(){

    AuthService.login({
	name:$scope.name,
	password:$scope.password,

}).then(function(msg) {
	$scope.username=window.localStorage.user;
	$scope.profilepic=window.localStorage.profilepic;
	$scope.group=window.localStorage.group;
	$scope.$digest();
	console.log(msg);
      if(msg=='Faculty'){
      	//$location.path('/dashboarduser');
      	window.location="/dashboarduser";

      }else if(msg=='Student'){
      	window.location="/dashboarduser";
      	//$location.path('/dashboarduser')
      }else{
      	alert("LOGIN WRONG");
      	window.location='/signup';
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