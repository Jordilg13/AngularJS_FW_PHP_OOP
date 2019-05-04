project.controller('contactusCtrl', function ($scope,services) {
    $scope.contact = {
        inputName: "",
        inputEmail: "",
        inputSubject: "",
        inputMessage: ""
    };
    
    $scope.SubmitContact = function () {
        var data = {
            "name": $scope.contact.inputName, 
            "email": $scope.contact.inputEmail, 
            "subject": $scope.contact.inputSubject, 
            "message": $scope.contact.inputMessage
        };

        services.req("POST","api/contactus",data).then(function (response) {
            console.log(response);
        });
        
        // services.post('contact', 'send_cont', contact_form).then(function (response) {
        //     if (response == 'true') {
        //             toastr.success('El mensaje ha sido enviado correctamente', 'Mensaje enviado',{
        //             closeButton: true
        //         });
        //     } else {
        //             toastr.error('El mensaje no se ha enviado', 'Mensaje no enviado',{
        //             closeButton: true
        //         });
        //     }
        // });
    };
});
