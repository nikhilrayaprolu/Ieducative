

      
         app.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               var username=window.localStorage.user;
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "/updateprofilphoto/"+username;
               fileUpload.uploadFileToUrl(file, uploadUrl,function(err,response){
                  if(err){
                     console.log(err);
                  }else{
                     window.localStorage.profilepic=response.profilephoto;
                  }
               });
            };
         }]);
