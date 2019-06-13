<?
include_once dirname(__FILE__).'/../../../paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';
include_once _PROJECT_PATH_."/backend/utils/sendemails/sendemail.php";
include_once _PROJECT_PATH_."/backend/modules/login/utils/functions_login.class.php";

use Firebase\JWT\JWT;

$method = $_SERVER['REQUEST_METHOD'];
$_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array


session_start();
// POST = register/login/confirmemail/enableaccount/changepass
// PUT = update user
// DELETE = logout(i might add delete user if i had a crud)

// in the upload of the image, the method is POST, but the parameters  are stored in $_GET
if (isset($_GET['op']) && $_GET['op'] == "uploadimg") {
    error_log("dins if");
    include_once _PROJECT_PATH_."/backend/modules/login/utils/upload.php";
    $result_prodpic = upload_files();
    $_SESSION['result_prodpic'] = $result_prodpic;

    echo json_encode($result_prodpic);
}

if ($method == "POST") { // login or register
    switch ($_POST['op']) {

        case 'login':
            LoginFunction::login();
            break;
        case 'register':
            LoginFunction::register();
            break;
        case 'loggeduser':
            LoginFunction::getLoggedUser();
            break;
        case 'enableaccount':
            LoginFunction::enableaccount();
            break;
        case 'recoverpassword':
            LoginFunction::recoverPassword();
            break;
        case 'changepass':
            LoginFunction::changePass();
            break;
        default:
            error_log("default option");
            break;
    }
} elseif ($method == "GET") { // normal get
    $object = new Login();
    include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
    echo json_encode($results);

} elseif ($method == "DELETE") {  // logout
    unset($_SESSION['logged_user']);
    if (isset($_SESSION['logged_user'])) {
        echo json_encode(false);
    } else {
        echo json_encode(true);
    }

} 
elseif ($method == "PUT") {
    $object = new Login();
    include _PROJECT_PATH_.'/backend/model/ApiController.php';

    if (isset($_POST['op']) && $_POST['op']="profileupdate") {
        $_SESSION['logged_user'] =LoginFunction::refreshToken($_POST['data']['username']);
    }
}