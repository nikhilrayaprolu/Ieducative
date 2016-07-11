
app.controller('NewCourse',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
	$scope.id=''
	$scope.name="";
	$scope.syllabus="";
	$scope.fees="";
	$scope.durationWeeks="";
	$scope.faculty=[];
	$scope.student=[];
	$scope.pre_requisites=[];
	$scope.courseclass=''
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	
	init=function(){
		//alert($location.search());
		console.log($location.search().id);

		$http.post("/findCourse",{
			id:$routeParams.id

		}).then(function(response){
			console.log(response.data[0]);
			course=response.data[0];
			$scope.id=course._id;
			$scope.name=course.name;
			$scope.syllabus=course.syllabus;
			$scope.fees=course.fees;
			$scope.durationWeeks=course.durationWeeks;
			$scope.faculty=course.faculty;
			$scope.student=course.student;
			$scope.pre_requisites=course.pre_requisites;
			$scope.courseclass=course.courseclass;
					
			return response;
		});
	};
	init();
	$scope.submit=function(){
		$http.post("/addCourse",{
			id:$scope.id,
			name:$scope.name,
			syllabus:$scope.syllabus,
			fees:$scope.fees,
			durationWeeks:$scope.durationWeeks,
			faculty:$scope.faculty,
			student:$scope.student,
			pre_requisites:$scope.pre_requisites,
			courseclass:$scope.courseclass,
		}).then(function(response){
			return response;
		});


	};
	$scope.delete=function(){
		$http.post("/removeCourse",{
			id:$scope.id,
		}).then(function(response){
			alert("course deleted");
		});
	};

}]);

