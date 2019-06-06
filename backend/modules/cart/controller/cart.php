<?php
include_once dirname(__FILE__).'/../../../paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';
// error_log(print_r("-----"));

$_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array
$method = $_SERVER['REQUEST_METHOD'];
$object = new Cart();
include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
error_log(print_r($results,1));
echo json_encode($results);