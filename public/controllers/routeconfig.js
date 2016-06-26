app.config(function($routeProvider){
	$routeProvider
		.when('/signup',{
		templateUrl:'signup.html',
		controller:'SignUpController'
	})
	.when('/coursesfaculty',{
		templateUrl:'coursesfaculty.html',
		controller:'CourseFaculty'
	})
	.when('/coursesstudent',{
		templateUrl:'coursesstudent.html',
		controller:'CourseStudent'

	})
	.when('/allcourses',{
		templateUrl:'allcourses.html',
		controller:'AllCourses'
	})
	.when('/commentcreate',{
		templateUrl:'commentcreate.html',
		controller:'CommentCreateController'
	})
	.when('/courseblog',{
		templateUrl:'courseblog.html',
		controller:'CourseBlogController'
	})
	.when('/coursehome',{
		templateUrl:'coursehome.html',
		controller:'CourseHome'
	})
	.when('/createtest',{
		templateUrl:'createtest.html',
		controller:'TestCreator'
	})
	.when('doubtcreate',{
		templateUrl:'doubtcreate.html',
		controller:'NewQuestionController'
	})
	.when('editcourse',{
		templateUrl:'editcourse.html',
		controller:'EditCourse'
	})
	.when('edittopic',{
		templateUrl:'edittopic.html',
		controller:'TopicEditor'
	})
	.when('facultystats',{
		templateUrl:'facultystats.html',
		controller:'facultystats'
	})
	.when('memberinfo',{
		templateUrl:'memberinfo.html',
		controller:'MemberController'
	})
	.when('newcourse',{
		templateUrl:'newcourse.html',
		controller:'NewCourse'
	})
	.when('newtopic',{
		templateUrl:'newtopic.html',
		controller:'TopicCreator'
	})
	.when('notificationreceiver',{
		templateUrl:'notificationreceiver.html',
		controller:'NotificationReceiver'
	})
	.when('notificationsender',{
		templateUrl:'notificationsender.html',
		controller:'NotificationSender'
	})
	
	.when('postbody',{
		templateUrl:'postbody.html',
		controller:'PostBodyController'
	})
	.when('testdisplay',{
		templateUrl:'testdisplay.html',
		controller:'TestingController'
	})
	.when('testpapers',{
		templateUrl:'testpapers.html',
		controller:'TestPaper'

	})
	.when('testresults',{
		templateUrl:'testresults.html',
		controller:'TestResults'
	})
	.when('testresultsfaculty',{
		templateUrl:'testresultsfaculty.html',
		controller:'facultyresults'
	})
	.when('userstats',{
		templateUrl:'userstats.html',
		controller:'UserStats'
	})
})