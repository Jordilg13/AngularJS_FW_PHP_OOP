project.controller('registerCtrl', function ($scope, services, toastr) {
    console.log("reg contr");

    $scope.register = function(){
        console.log($scope.registerdata);
        services.req("POST", "api/login", {op: "register", data: $scope.registerdata}).then(function(data){
            console.log(data);
            data = JSON.parse(data);
            if (data) {

                services.req("POST","api/login",{"username": $scope.registerdata['username']}).then(function (response) {

                    if (response.message == 'Queued. Thank you.') {
                        toastr.success("We sent the email, please check your inbox.", "Email sent.");
                        window.setTimeout(function(){
                            document.location.href = "";
                        },2000)
                    } else {
                        toastr.error("We aren't able to send you an email, please check if the contact information is correct.", "Something went wrong");
                    }
                });
                toastr.success("We have sent a message to confirm your account.","Email sent");
                setTimeout(location.href="#/",3000);
            } else {
                toastr.error("Something went wrong.","Error");
            }
        });

        
    };
    
});