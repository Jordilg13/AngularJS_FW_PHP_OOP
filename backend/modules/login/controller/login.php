<?
include_once dirname(__FILE__).'/../../../paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';
include_once _PROJECT_PATH_."/backend/utils/sendemails/sendemail.php";
include_once _PROJECT_PATH_."/backend/modules/login/utils/functions_login.class.php";


use Firebase\JWT\JWT;

$method = $_SERVER['REQUEST_METHOD'];
// $secret_key = parse_ini_file(_PROJECT_PATH_."/backend/keys/jwt_secret_key.ini")['secretkey'];

$_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array


session_start();
// POST = register/login/confirmemail/enableaccount
// PUT = update user
error_log("asdf");
error_log(print_r($_GET,1));
error_log(print_r($method,1));
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
            $method="GET"; //changed to get because i want to do a select, not an insert
            $object = new Login();
            $returndata = [];
            include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
            error_log("-l-l-l");
            error_log(print_r($results,1));
            // TODO: remove token field from db
            
            // if password match, and the account is enabled
            if (isset($results[0]->password) && password_verify($_POST['data']['password'],$results[0]->password) && $results[0]->enabledAccount == 1) {
                LoginFunction::refreshToken($_POST['data']['username']);

                array_push($returndata,true);
                array_push($returndata,$results);
                error_log($_SESSION['logged_user']);
                error_log(print_r($returndata,1));

                // check if token is wrong
                // try {
                //     $decoded = JWT::decode($results[0]->token,$secret_key,array('HS256'));
                // } catch (Exception $e) {
                //     echo json_encode("token expired");
                //     die();
                // }
                // // check if token matches with the user
                // if ($decoded->message != $results[0]->username) {
                //     error_log("token doesnt match");
                //     echo json_encode("token doesnt match");
                // }  
            } else {
                error_log("asdf");
                array_push($returndata,false);
            }   
            error_log(json_encode($returndata));     
            echo json_encode($returndata,JSON_FORCE_OBJECT);
            break;
        case 'register':
            $method="GET"; //changed to get because i want to do a select, not an insert
            $object = new Login();
            
            // check if user is already registred
            $_GET['username'] = $_POST['data']['username'];
            $emaildata["username"] = $_POST['data']['username'];
            error_log(print_r($_GET,1));
            include _PROJECT_PATH_.'/backend/model/ApiController.php';

            if (empty($results)) {

                $method="POST"; // changed to post to do the insert
                $_POST['data']['password']=password_hash($_POST['data']['password'],PASSWORD_BCRYPT);
                LoginFunction::refreshToken($_POST['data']['username']);
                $emaildata["token"]= $_POST['data']['token'];
                $_POST['data']=json_encode($_POST['data']);

                // $emaildata= array("username" => $_POST['data']['username'], "token" => $_POST['data']['token']);

                include _PROJECT_PATH_.'/backend/model/ApiController.php';

                error_log(print_r($results,1));
                error_log(print_r("asdf",1));

                if ($results == 1) {

                    // sending confirmation email
                    // is forced to send the email to my account because there aren't more emails registred in mailgun
                    $json = send_mailgun("jordillopis00@gmail.com","Confirm Account","Welcome ".$emaildata['username'].", we sent you this message to confirm your account. Please click <a href='http://localhost/angular/#/confirmaccount/".$emaildata['username']."/".$emaildata['token']."'>here</a> to confirm your account.");
                    echo json_encode($json);

                } else {
                    echo json_encode(false);
                }
            } else {
                echo json_encode(false);
            }
            break;

        case 'loggeduser':
            if (isset($_SESSION['logged_user'])) {
                $method = "GET";
                $object = new Login();

                try {
                    $decoded = LoginFunction::decodeToken($_SESSION['logged_user']);
                } catch (Exception $e) {
                    echo json_encode("token expired");
                    die();
                } 
                $_GET['username']=$decoded->message;
                include _PROJECT_PATH_.'/backend/model/ApiController.php';
                
                $rres = new stdClass();
                $rres->token = $_SESSION['logged_user'];
                LoginFunction::refreshToken($decoded->message);
                $rres->data = $results;
                echo json_encode($rres);

            } else {
                echo json_encode(false);
            }
            break;
        case 'enableaccount':
            $object = new Login();
            $method="GET";
            $results=false;

            include _PROJECT_PATH_.'/backend/model/ApiController.php';

            // error_log(print_r($results,1));
            // error_log(print_r($results[0]->token,1));
            // error_log(print_r($_POST['token'],1));

            if (isset($results[0]->token) && $results[0]->token == $_POST['token']) {
                $method="PUT";
                $_POST =[];
                $_POST['fromphp']=true;
                $_POST['data']['enabledAccount']=1;
                include _PROJECT_PATH_.'/backend/model/ApiController.php';
            }
            
            echo json_encode($results);
            break;
        case 'recoverpassword':
            $json = send_mailgun($_POST['email'],"Recover Password","Click <a href='http://localhost/angular/#/recoverPassword/".$_POST['token']."'>here</a> to recover your password.");
            echo json_encode($json);
            break;
        case 'changepass':
            $object = new Login();
            $method="PUT";
            $password = $_POST['pass'];

            $_POST =[];
            $_POST['fromphp']=true;


            $_POST['data']['password']=password_hash($password,PASSWORD_BCRYPT);
            error_log(print_r($_POST,1));

            include _PROJECT_PATH_.'/backend/model/ApiController.php';
            echo json_encode($results);
            break;
        default:
            error_log("default option");
            break;
    }
} elseif ($method == "GET") {
    $object = new Login();
    include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
    echo json_encode($results);

} elseif ($method == "DELETE") {
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
        LoginFunction::refreshToken($_POST['data']['username']);
    }
}