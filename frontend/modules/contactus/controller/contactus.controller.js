project.controller('contactusCtrl', function ($scope,services,toastr) {
    $scope.contact = {
        name: "",
        email: "",
        message: ""
    };
    /**
     * it sends a contact email
     *
     */
    $scope.SubmitContact = function () {
        var data = {
            "name": $scope.contact.name, 
            "email": $scope.contact.email, 
            "message": $scope.contact.message
        };

        services.req("POST","api/contactus",data).then(function (response) {

            if (response.message == 'Queued. Thank you.') {
                toastr.success("We sent the email, please check your inbox.", "Email sent.");
                window.setTimeout(function(){
                    document.location.href = "";
                },2000)
            } else {
                toastr.error("We aren't able to send you an email, please check if the contact information is correct.", "Something went wrong");
            }
        });
    };
});
