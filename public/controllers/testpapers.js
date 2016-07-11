app.controller('TestPaper',['$scope','$http','$location','AuthService','$routeParams',function($scope,$http,$location,AuthService,$routeParams){
	$scope.pageno=$routeParams.pageid||1;
	$scope.studentid=window.localStorage.user;
	$scope.TestPaper=[];
	if($location.search().class!='undefined'){
$scope.class=$location.search().class;
	}
	
	console.log($location.search().subject+"yes");
	$scope.subject=$location.search().subject||"All";
	$scope.Sort={createdAt:-1};
	
	
	
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
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
		$http.post("/testpaperfilter/",{filters:{class:$scope.class,subject:$scope.subject,State:"Active"},sort:$scope.Sort,page:$scope.pageno,limit:10}).then(function(response){
			$scope.TestPaper=response.data.docs;
			$scope.pages=response.data.pages;
			});}else{
			$http.post("/testpaperfilter/",{filters:{class:$scope.class,State:"Active"},sort:$scope.Sort,page:$scope.pageno,limit:10}).then(function(response){
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
		$location.url('/testpaperconditions/'+id);
		//$location.path('/testdisplay/'+id);
		//window.location='http://localhost:8080/testdisplay.html?id='+id;
	}
	$scope.Search=function(){
		$http.post("/testpapers/",{class:$scope.class,sort:$scope.sort,subject:$scope.subject}).then(function(response){
			$scope.TestPaper=response.data;
		});
	}
	$scope.changePage=function(page){
		$location.url('/testpaper/'+page+'?class='+$scope.class+'&subject='+$scope.subject+'&sort='+$scope.num);
	}
}]);



