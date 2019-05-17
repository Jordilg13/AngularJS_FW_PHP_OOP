project.controller('loginCtrl', function ($scope, services, toastr) {
    console.log("login controller");

    services.req("POST","api/login",{op: "loggeduser"}).then(function(data){
        data = JSON.parse(data);
        console.log(data);
        
        if (!data) {
            setLoginMenu();
        } else {
            setLogoutMenu(data);
        }
    });

    $scope.login = function () {
        console.log($scope.logindata);
        services.req("POST","api/login/username-"+$scope.logindata['username'],{op: "login", data: $scope.logindata}).then(function(data){
            data = JSON.parse(data);

            console.log(data);
            if (data) {
                toastr.success("You are now logged.","Logged In");
                setTimeout(location.href="#/",1000);
                setLogoutMenu($scope);
            } else {
                toastr.error("Something went wrong.","Error");
            }
        });
    }

    function setLoginMenu() {
        console.log("not logged");
        $scope.loggeduser = false;
        $scope.notloggeduser = true;
    
    }
    function setLogoutMenu(data) {
        console.log("logged");
        console.log(data);
        
        $scope.loggeduser = true;
        $scope.notloggeduser = false;

        services.req("GET","api/login/token-!"+data).then(function(data){
            console.log(data);
        });
    }
});

