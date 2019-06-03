project.controller('loginCtrl', function (services, toastr, $scope, $rootScope, CommonService) {
  $rootScope.loggeduser = false;
  console.log("login controller");
  $rootScope.login_card = {};

  $scope.login = function () {
    services.req("POST", "api/login/username--" + $scope.logindata['username'], { op: "login", data: $scope.logindata }).then(function (data) {
      // data = JSON.parse(data);
      // console.loArray\n(\n    [0] => 1\n    [1] => Array\n        (\n            [0] => stdClass Object\n                (\n                    [ID] => 33\n                    [name] => \n                    [email] => jordillopis00@gmail.com\n                    [username] => asdf\n                    [password] => $2y$10$BZgRiWndXt6zSa.ySONA..uytlwIjz5KOwD8C9HPT280tM.8Ny2qS\n                    [type] => Client\n                    [img] => default-avatar.png\n       g(data[1][0]);
      // TODO: netejar codi
      console.log(data);
      if (data[0]) {
        toastr.success("You are now logged.", "Logged In");
        location.href = "#/";
        $rootScope.loggeduser = true;

        $rootScope.login_card['username'] = data[1][0]['username'];
        $rootScope.login_card['img'] = data[1][0]['img'];
        // $state.reload();
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
  // var pc = this;
  // pc.data = "Lorem Name Test"; 
  // $scope.recover_password = function(size){

  //       var modalInstance = $uibModal.open({
  //         animation: true,
  //         ariaLabelledBy: 'modal-title',
  //         ariaDescribedBy: 'modal-body',
  //         template: 'frontend/modules/login/view/recover_password.html',
  //         controllerAs: 'pc',
  //         size: size,
  //       });

  //       modalInstance.result.then(function () {
  //         alert("now I'll close the modal");
  //       });
  // }
});

