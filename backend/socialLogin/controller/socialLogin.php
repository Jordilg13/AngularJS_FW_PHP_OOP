<?
include_once dirname(__FILE__).'/../../../paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';

$method = $_SERVER['REQUEST_METHOD'];
$_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array
$object = new SocialLogin();
include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
echo json_encode($results);