project.controller('recoverCtrl', function ($scope, services, toastr, token) {
    $scope.recoverdata = {};
    var changepassobj = { token: token, pass: "" };

    /**
     * checks if the link is valid
     *
     */
    services.req("GET", "api/login/token--" + token).then(function (user) {

        if (user.length == 0) {
            toastr.error("This token doesn't exists in our database.", "Error");
            location.href = "#/login";
        } else {
            /**
             * change the password of the user
             *
             */
            $scope.changePassword = function () {
                changepassobj.pass = $scope.recoverdata.password;

                services.req("POST", "api/login/token--" + user[0].token, { op: "changepass", pass: $scope.recoverdata.password }).then(function (data) {
                    data = JSON.parse(data);
                    if (data === true) {
                        toastr.success("Password changed succesfully");
                        location.href = "#/";
                    } else {
                        toastr.success("Something went wrong", "Error");
                    }
                });
            }
        }
    });



});