<?php
include_once _PROJECT_PATH_."/backend/utils/sendemails/sendemail.php";

error_log(print_r($_POST,1));

if (filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
    $json = send_mailgun($_POST['email'],"ContactMessage","Welcome ".$_POST['name'].", this is the body of the contact mail.");
    print_r($json);
} else {
    echo json_encode(false);
}