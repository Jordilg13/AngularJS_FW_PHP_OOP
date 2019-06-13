<?php
include_once dirname(__FILE__).'/../../../../backend/vendor/autoload.php';

use Auth0\SDK\Auth0;
use Auth0\SDK\API\Authentication;

$auth0 = new Auth0([
  'domain' => 'jordilg13.eu.auth0.com',
  'responseMode' => 'form_post',
  'client_id' => 'U93JEn4L9puus9oEMMdXtGWlbZprPbyJ',
  'client_secret' => file_get_contents(dirname(__FILE__).'/../../../../Auth0ClientSecret.txt'),
  'redirect_uri' => 'http://localhost/angular/backend/modules/auth0callback/controller/auth0callback.php',
  'scope' => 'openid profile email offline_access',
  'audience' => 'https://jordilg13.eu.auth0.com/userinfo',
  'persist_id_token' => true,
  'persist_access_token' => true,
  'persist_refresh_token' => true,
]);

if ($_SERVER['REQUEST_METHOD']=='GET'){  // login

  $auth0->login();

} else if ($_SERVER['REQUEST_METHOD']=='DELETE'){  // logout

  $auth0->logout();
  session_destroy();
  $auth0_auth_api = new Authentication('jordilg13.eu.auth0.com');

  $auth0_logout_url = $auth0_auth_api->get_logout_link(
    'http://localhost/angular',
    'U93JEn4L9puus9oEMMdXtGWlbZprPbyJ'
  );

  echo $auth0_logout_url;

}
