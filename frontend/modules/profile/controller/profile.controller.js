project.controller('profileCtrl', function ($scope, services, userdata, $rootScope) {

    // middleware
    if (userdata == "false") {
        location.href = "#/login";
    } else {
        $scope.userinfo = userdata['data'][0];

        // load location
        services.req("GET", "frontend/assets/resources/countries.json").then(function (countries) {
            $scope.AllCountries = countries;
        })
            .then(function () {
                if ($scope.userinfo.location.length != 0) {
                    $scope.AllCountries.forEach(function (value, index, array) {
                        if (value.code == $scope.userinfo.location.split("-")[0]) {
                            $scope.sel += value.name;
                            console.log(value);
                        }
                    });
                } else {
                    $scope.countries = $scope.AllCountries;
                }
            });
    }

    // update profile
    $scope.saveprofile = function () {
        console.log($scope.userinfo);
        services.req("PUT", "api/login/ID--" + $scope.userinfo.ID, { data: $scope.userinfo, op: "profileupdate" }).then(function (data) {
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
            'sending': function (file, formData, xhr) { },
            'success': function (file, response) {
                response = JSON.parse(response);
                $scope.userinfo.img = response.data;
            },
            'removedfile': function (file, serverFilename) {
                delete $scope.userinfo.img;
            }
        }
    }
    console.log("prof controller");
    // dependent dropdowns

    $scope.loadProvinces = function () {
        console.log($scope.selectedCountry);

        services.req("GET", "frontend/assets/resources/countries/" + $scope.selectedCountry.filename + ".json").then(function (provinces) {
            $scope.provinces = provinces;
        });
    }
    $scope.changeLocation = function () {
        $scope.userinfo.location = $scope.selectedProvince.code;
    }

});