project.controller('loginCtrl', function ($scope, services, toastr, $route) {
    $scope.loggeduser = false; 
    console.log("login controller");
    $scope.login_card = {};

    // detect logged user
    services.req("POST","api/login",{op: "loggeduser"}).then(function(data){
        data = JSON.parse(data);
        token = data;
        // get username using token
        services.req("GET","api/login/token--"+token).then(function(response){
            if (!response[0]) {
                $scope.loggeduser = false; 
            } else {
                $scope.loggeduser = true;
        
                $scope.login_card['username']=response[0]['username'];
                $scope.login_card['img']=response[0]['img'];
            }
            
        });
        
        
    });

    $scope.login = function () {        
        services.req("POST","api/login/username--"+$scope.logindata['username'],{op: "login", data: $scope.logindata}).then(function(data){
            // data = JSON.parse(data);

            if (data[0]) {
                toastr.success("You are now logged.","Logged In");
                $route.reload();
                setTimeout(location.href="#/",1000);
            } else {
                toastr.error("Something went wrong.","Error");
            }
        });
    }
});

