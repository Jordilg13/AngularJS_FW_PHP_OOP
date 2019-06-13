<?php
include_once dirname(__FILE__).'/../../../../backend/paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';
include_once _PROJECT_PATH_.'/backend/vendor/autoload.php';
include_once _PROJECT_PATH_."/backend/modules/login/utils/functions_login.class.php";

use Auth0\SDK\Auth0;

$auth0 = new Auth0([
    'domain' => 'jordilg13.eu.auth0.com',
    'responseMode' => 'form_post',
    'client_id' => 'U93JEn4L9puus9oEMMdXtGWlbZprPbyJ',
    'client_secret' => file_get_contents(dirname(__FILE__).'/../../../../Auth0ClientSecret.txt'),
    'redirect_uri' => 'http://localhost/angular/backend/modules/auth0callback/model/auth0callback.php',
    'scope' => 'openid profile email offline_access',
    'audience' => 'https://jordilg13.eu.auth0.com/userinfo',
    'persist_id_token' => true,
    'persist_access_token' => true,
    'persist_refresh_token' => true,
  ]);

$userInfo=$auth0->getUser();

// BEHAVIOR: the first time that a social user joins the app, is registred as a social user, if it's already in db, it's logged as usually
// TODO: change this behavior, when the user is registred, his data wont be changed even if he changes any information, for example his picture

$method="GET";
$object = ModelController::getInstance("users");

// check if user is already registred
$_GET = [];
$_GET['username'] = $userInfo['nickname'];
include _PROJECT_PATH_.'/backend/model/ApiController.php';

if (empty($results)) { //register social

    $method="POST"; // changed to post to do the insert

    $_POST['data']['img'] = $userInfo['picture'];
    $_POST['data']['username'] = $userInfo['nickname'];
    $_POST['data']['sociallogin'] = 1;
    $_POST['data']['enabledAccount'] = 1;
    $_POST['data']=json_encode($_POST['data']);

    include _PROJECT_PATH_.'/backend/model/ApiController.php';

    if ($results == 1) {
        $_SESSION['logged_user'] = LoginFunction::refreshToken($userInfo['nickname']);
    }
} else { //login social
    $_SESSION['logged_user'] =LoginFunction::refreshToken($userInfo['nickname']);
}

header('Location: http://localhost/angular/#/');