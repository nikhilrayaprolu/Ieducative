app.controller('facultystats',['$location','$scope','$http','$routeParams',function($location,$scope,$http,$routeParams){
		$scope.pageno=$routeParams.pageid||1;
	$scope.facultyid=window.localStorage.user;
	$scope.TestPaper=[];
	$scope.select={};
	$scope.select.choices=["Draft","Active","Closed","All"];
	if($location.search().class!='undefined'){
	$scope.class=$location.search().class;
	}
	
	console.log($location.search().subject+"yes");
	$scope.subject=$location.search().subject||"All";
	$scope.Sort={createdAt:-1};
	
	
	
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.result=function(marksid){
		$location.path('/testresultsfaculty/'+marksid);
		//window.location="http://localhost:8080/testresultsfaculty.html?testid="+marksid;
	}

	
	$scope.NewTestPaper=function(){
		$location.path('/createtest/');
	}
	$scope.SortChange=function(num){
		$scope.num=num;
		if(num==1){
			$scope.Sort={createdAt:-1};
		}else if(num==2){
			$scope.Sort={RatingAvg:-1};
		}else if(num==3){
			$scope.Sort={totalNoOfStudentsAttempted:-1};
		}
	}
	$scope.SortChange($location.search().SortBy);
	$scope.TestPapers=function(){
		AuthService.usertoken();
		if($scope.subject!="All"){
		$http.post("/testpaperfilter/",{filters:{class:$scope.class,subject:$scope.subject,faculty:$scope.facultyid},sort:$scope.Sort,page:$scope.pageno,limit:10}).then(function(response){
			$scope.TestPaper=response.data.docs;
			$scope.pages=response.data.pages;
			});}
		else{
			$http.post("/testpaperfilter/",{filters:{class:$scope.class},sort:$scope.Sort,page:$scope.pageno,limit:10}).then(function(response){
			console.log(response);
			$scope.TestPaper=response.data.docs;
			$scope.pages=response.data.pages;
			console.log("yes");
			console.log($scope.pages);
			//alert(window.localStorage);
			console.log(window.localStorage.user);
		});
		}
	};
	
	$scope.testpaperhome=function(id){
		
		$location.path('/testdisplay/'+id);
		//window.location='http://localhost:8080/testdisplay.html?id='+id;
	}
	$scope.edittesthome=function(id){
		$location.path('/createtest/'+id);
	}
	$scope.changePage=function(page){
		$location.url('/testpaper/'+page+'?class='+$scope.class+'&subject='+$scope.subject+'&sort='+$scope.num);
	}

}]);
