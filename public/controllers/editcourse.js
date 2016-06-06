var app=angular.module('NewCourseApp',[]);
app.controller('EditCourse',['$scope','$http',function($scope,$http){
	$scope.name="";
	$scope.syllabus="";
	$scope.fees="";
	$scope.durationWeeks="";
	$scope.faculty=[]
	$scope.student=[];
	$scope.pre_requisites=[];
	$scope.courseclass=''
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.init(){
		$http.get("/editcourse/?courseno=15")
	}
	$scope.submit=function(){
		$http.post("/addCourse",{
			name:$scope.name,
			syllabus:$scope.syllabus,
			fees:$scope.fees,
			durationWeeks:$scope.durationWeeks,
			faculty:$scope.faculty,
			student:$scope.student,
			pre_requisites:$scope.pre_requisites,
			profilephoto:$scope.profilephoto,
			courseclass:$scope.courseclass,
		}).then(function(response){
			return response;
		});


	};

}]);


