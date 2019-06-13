project.controller('loginCtrl', function (services, toastr, $scope, $rootScope, CommonService) {
  $rootScope.loggeduser = false;
  console.log("login controller");
  $rootScope.login_card = {};

  $scope.login = function () {
    services.req("POST", "api/login/username--" + $scope.logindata['username'], { op: "login", data: $scope.logindata }).then(function (data) {
      // data = JSON.parse(data);
      // TODO: netejar codi
      console.log(data);
      if (data[0]) {
        toastr.success("You are now logged.", "Logged In");
        location.href = "#/";
        $rootScope.loggeduser = true;

        $rootScope.login_card['username'] = data[1][0]['username'];
        $rootScope.login_card['img'] = data[1][0]['img'];
      } else {
        toastr.error("Something went wrong.", "Error");
      }
    });
  }


  $scope.recoverPass = function () {

    CommonService.openModal("frontend/modules/login/view/recover_password.html", "loginCtrl");

  }


  // send email to recover password
  $scope.recoverpassdata = {};

  $scope.sendRecoverEmail = function () {
    console.log($scope.recoverpassdata.email);
    services.req("GET", "api/login/email--" + $scope.recoverpassdata.email).then(function (userdata) {
      var recoverdata = { op: "recoverpassword", email: $scope.recoverpassdata.email, token: userdata[0].token };

      services.req("POST", "api/login", recoverdata).then(function (data) {
        console.log(data);
        location.href = "#/";
      });

    });

  }

});

