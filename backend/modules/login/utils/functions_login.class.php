<?
include_once dirname(__FILE__).'/../../../paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';
require(_PROJECT_PATH_.'/backend/lib/JWT.php');
require_once(_PROJECT_PATH_.'/backend/lib/JWT/BeforeValidException.php');
require_once(_PROJECT_PATH_.'/backend/lib/JWT/ExpiredException.php');
require_once(_PROJECT_PATH_.'/backend/lib/JWT/SignatureInvalidException.php');
use Firebase\JWT\JWT;

class LoginFunction {
    public static function login() {
        $method="GET"; //changed to get because i want to do a select, not an insert
        $object = new ModelController("users");
        $returndata = [];
        include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
        error_log("-l-l-l");
        error_log(print_r($results,1));
        
        // if password match, and the account is enabled
        if (isset($results[0]->password) && password_verify($_POST['data']['password'],$results[0]->password) && $results[0]->enabledAccount == 1) {
            $_SESSION['logged_user'] =LoginFunction::refreshToken($_POST['data']['username']);

            array_push($returndata,true);
            array_push($returndata,$results);
            error_log($_SESSION['logged_user']);
            error_log(print_r($returndata,1));
            
        } else {
            error_log("asdf");
            array_push($returndata,false);
        }   
        error_log(json_encode($returndata));     
        echo json_encode($returndata,JSON_FORCE_OBJECT);
    }

    public static function register() {
        $method="GET"; //changed to get because i want to do a select, not an insert
        $object = new ModelController("users");
        
        // check if user is already registred
        $_GET['username'] = $_POST['data']['username'];
        $emaildata["username"] = $_POST['data']['username'];
        error_log(print_r($_GET,1));
        include _PROJECT_PATH_.'/backend/model/ApiController.php';

        if (empty($results)) {

            $method="POST"; // changed to post to do the insert
            $_POST['data']['password']=password_hash($_POST['data']['password'],PASSWORD_BCRYPT);
            error_log("data--");
            $_POST['data']['token'] = LoginFunction::refreshToken($_POST['data']['username']);
            error_log(print_r($_POST['data'],1));
            $emaildata["token"]= $_POST['data']['token'];
            $_POST['data']=json_encode($_POST['data']);

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
    }

    public static function getLoggedUser() {
        if (isset($_SESSION['logged_user'])) {
            $method = "GET";
            $object = new ModelController("users");

            try { // checking if token is correct
                $decoded = LoginFunction::decodeToken($_SESSION['logged_user']);
            } catch (Exception $e) {
                echo json_encode("token expired");
                unset($_SESSION['logged_user']);
                die();
            } 
            $_GET['username']=$decoded->message;
            include _PROJECT_PATH_.'/backend/model/ApiController.php';
            
            $rres = new stdClass();
            $rres->token = $_SESSION['logged_user'];
            $_SESSION['logged_user'] =LoginFunction::refreshToken($decoded->message);
            $rres->data = $results;
            echo json_encode($rres);

        } else {
            error_log(print_r("user not logged",1));
            echo json_encode(false);
        }
    }
    public static function enableaccount() {
        $object = new ModelController("users");
        $method="GET";
        $results=false;

        include _PROJECT_PATH_.'/backend/model/ApiController.php';

        if (isset($results[0]->token) && $results[0]->token == $_POST['token']) {
            $method="PUT";
            $_POST =[];
            $_POST['fromphp']=true;
            $_POST['data']['enabledAccount']=1;
            include _PROJECT_PATH_.'/backend/model/ApiController.php';
            echo json_encode($results);
        } else {
            echo json_encode(false);
        }
    }

    public static function logout() {
        unset($_SESSION['logged_user']);
        if (isset($_SESSION['logged_user'])) {
            echo json_encode(false);
        } else {
            echo json_encode(true);
        }
    }
    public static function changePass(){
        $object = new ModelController("users");
        $method="PUT";
        $password = $_POST['pass'];

        $_POST =[];
        $_POST['fromphp']=true;


        $_POST['data']['password']=password_hash($password,PASSWORD_BCRYPT);
        error_log(print_r($_POST,1));

        include _PROJECT_PATH_.'/backend/model/ApiController.php';
        echo json_encode($results);
    }
    public static function recoverPassword() {
        $json = send_mailgun($_POST['email'],"Recover Password","Click <a href='http://localhost/angular/#/recoverPassword/".$_POST['token']."'>here</a> to recover your password.");
        echo json_encode($json);
    }

    public static function refreshToken($username) {
        $secret_key = parse_ini_file(_PROJECT_PATH_."/backend/keys/jwt_secret_key.ini")['secretkey'];
        $payload = array(
            "message" => $username,
            "exp" => time() + (60*30)
        ); 
        return JWT::encode($payload,$secret_key);
    }

    public static function decodeToken($token) {
        $secret_key = parse_ini_file(_PROJECT_PATH_."/backend/keys/jwt_secret_key.ini")['secretkey'];
        return JWT::decode($token,$secret_key,array('HS256'));;
    }


}
