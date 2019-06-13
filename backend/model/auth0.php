<?php
include_once dirname(__FILE__).'/../../../../vendor/autoload.php';

use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => 'jordilg13.eu.auth0.com',
  'responseMode' => 'form_post',
  'client_id' => 'U93JEn4L9puus9oEMMdXtGWlbZprPbyJ',
  'client_secret' => file_get_contents(dirname(__FILE__).'/../../../../Auth0ClientSecret.txt'),
  'redirect_uri' => 'http://localhost/angular/modules/auth0callback/model/auth0callback.php',
  'scope' => 'openid profile email offline_access',
  'audience' => 'https://jordilg13.eu.auth0.com/userinfo',
  'persist_id_token' => true,
  'persist_access_token' => true,
  'persist_refresh_token' => true,
]);

$auth0->login();