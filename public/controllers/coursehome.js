app.controller('CourseHome',['$scope','$http','$location','$routeParams','fileUpload',function($scope,$http,$location,$routeParams,fileUpload){
	$scope.facultyid=window.localStorage.user;
	$scope.topics=[];
	$scope.Course_id=$routeParams.id;
	$scope.tab=1;
	$scope.videouploadtitle='';
	$scope.data={};
	$scope.setTab=function(N){
		$scope.tab=N;
	}
	$scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };
	$scope.getNumber=function(N){
		return Array.apply(null, {length: N}).map(Number.call, Number);
	};
	$scope.newtopic=function(id){
		$location.path('/newtopic/'+$scope.Course_id);
		//window.location="http://localhost:8080/newtopic.html?id="+$scope.Course_id;
		};
	$scope.Blog=function(){
		$location.path('/courseblog/'+$scope.Course_id);
		//window.location="http://localhost:8080/courseblog.html?courseid="+$scope.Course_id;
	}
	topiccourses=function(){
		$http.post("/findTopic",{Course:$scope.Course_id}).then(function(response){
			console.log(response);
			$scope.topics=response.data;
		});
	};
	topiccourses();
	$scope.edittopic=function(id){
		$location.path('/edittopic/'+id);
	}

	$scope.uploadFile = function(){
              $scope.uploadprogress=1;
               var file = $scope.myFile;
               var username=window.localStorage.user;
               console.log('file is ' );
               console.dir(file);
               var uploaddata={Title:$scope.data.VideoTitle,Description:$scope.data.VideoDescription};
               alert("video upload in progress we will notify you once completed please do not refresh page");
               var uploadUrl = "/updatevideo/"+$scope.Course_id;
               fileUpload.uploadFileToUrl(file, uploadUrl,uploaddata,function(err,response){
                  if(err){
                     console.log(err);
                  }else{
                     alert("video upload successfull")
                     $scope.uploadprogress=0;
                     console.log(response);
                  }
               });
            };
    $scope.uploadDocument = function(){
               var file = $scope.myDocument;
               var username=window.localStorage.user;
               var uploaddata={Title:$scope.data.DocumentTitle,Description:$scope.data.DocumentDescription};
               console.log('file is ' );
               console.dir(file);
               alert("video upload in progress we will notify you once completed please do not refresh page");
               var uploadUrl = "/updatedocument/"+$scope.Course_id;
               fileUpload.uploadFileToUrl(file, uploadUrl,uploaddata,function(err,response){
                  if(err){
                     console.log(err);
                  }else{
                     alert("video upload successfull")
                     console.log(response);
                  }
               });
            };
    $scope.videowatch=function(id){
    	$location.path('/watchvideo/'+id);
    }
    $scope.Documentwatch=function(id){
    	window.location="http://localhost:8080/documents/"+id;
    	//$location.reload('/documents/'+id);
    }
    $scope.loadvideos=function(){
    	if(!$scope.loadedvideos){
    		$scope.loadedvideos=true;
    		$http.post('/loadvideos/'+$scope.Course_id).then(function(response){
    		$scope.videos=response.data;
    	})
    	}}
    $scope.loaddocuments=function(){
    	if(!$scope.loadeddocuments){
    		$scope.loadeddocuments=true;
    		$http.post('/loaddocuments/'+$scope.Course_id).then(function(response){
    			$scope.documents=response.data;
    		})
    	}
    	
    }
    

}]);


