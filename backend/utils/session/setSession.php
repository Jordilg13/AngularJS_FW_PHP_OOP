<?php
session_start();
include_once dirname(__FILE__).'/SessionHandlerr.class.php';
$_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array
error_log(print_r($_POST,1));
try {
    SessionHandlerr::setSession($_POST['sessionvar'],$_POST[$_POST['sessionvar']]);
    echo json_encode("setted");
} catch (Exception $e){
    http_response_code(400);
}