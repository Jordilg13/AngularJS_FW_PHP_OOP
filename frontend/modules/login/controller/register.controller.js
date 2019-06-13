project.controller('registerCtrl', function ($scope, services, toastr) {
   
    /**
     * registers a user and sends him the confirm account email
     * the account is registred but disabled
     *
     */
    $scope.register = function(){
        services.req("POST", "api/login", {op: "register", data: $scope.registerdata}).then(function(data){
            data = JSON.parse(data);
            if (data) {

                services.req("POST","api/login",{"username": $scope.registerdata['username']}).then(function (response) {

                    if (response.message == 'Queued. Thank you.') {
                        window.setTimeout(function(){
                            document.location.href = "";
                        },2000)
                    } 
                });
                toastr.success("We have sent a message to confirm your account.","Email sent");
                location.href="#/",3000;
            } else {
                toastr.error("Something went wrong.","Error");
            }
        });

        
    };
    
});