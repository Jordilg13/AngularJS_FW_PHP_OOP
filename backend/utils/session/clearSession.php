<?php
session_start();
include_once dirname(__FILE__).'/SessionHandlerr.class.php';
$_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array
try {
    SessionHandlerr::clear($_POST['sessionvar']);
} catch (Exception $e){
    http_response_code(400);
}
