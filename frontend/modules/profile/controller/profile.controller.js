project.controller('profileCtrl', function ($scope, services, userdata, $rootScope) {
    $scope.varr = true;

    // middleware
    if (userdata == "false") {
        location.href = "#/login";
    } else {
        $scope.userinfo = userdata['data'][0];
    }

    console.log(userdata);
    $scope.saveprofile = function(){
        console.log($scope.userinfo);
        services.req("PUT","api/login/ID--"+$scope.userinfo.ID,{data: $scope.userinfo, op: "profileupdate"}).then(function(data){
            console.log(data);
            $rootScope.login_card['username'] = $scope.userinfo.username;
            $rootScope.login_card['img'] = $scope.userinfo.img;
        });
    }

    // dropzone
    Dropzone.prototype.defaultOptions.dictDefaultMessage = "Drop images here or click to change your profile image.";

    $scope.dropzoneConfig = {
        'options': {
            'url': 'api/login/op--uploadimg',
            addRemoveLinks: true,
            maxFileSize: 3000,
            dictResponseError: 'Server error',
            acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF'
        },
        'eventHandlers': {
            'sending': function (file, formData, xhr) {},
            'success': function (file, response) {
                response = JSON.parse(response);
                $scope.userinfo.img = response.data;
            },
            'removedfile': function (file, serverFilename) {
                delete $scope.userinfo.img;
            }
        }
    }


});
