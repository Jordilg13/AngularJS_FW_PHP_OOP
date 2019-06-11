<?
include_once dirname(__FILE__).'/../../../paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';

$method = $_SERVER['REQUEST_METHOD'];
$object = new Likes();
include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
error_log(print_r("milagritos",1));
echo json_encode($results);