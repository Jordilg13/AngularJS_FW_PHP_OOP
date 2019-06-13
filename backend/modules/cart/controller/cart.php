<?php
include_once dirname(__FILE__).'/../../../paths.php';
include_once _PROJECT_PATH_.'/backend/model/autoload.php';
include_once _PROJECT_PATH_."/backend/modules/login/utils/functions_login.class.php";
include_once _PROJECT_PATH_."/backend/modules/cart/utils/functions_cart.php";

$_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array
$method = $_SERVER['REQUEST_METHOD'];


if (isset($_POST['checkout']) && $_POST['checkout']) { // checkout
    // get user ID
    $method = "GET";
    $_GET = [];
    session_start();
    $_GET['username'] = LoginFunction::decodeToken($_SESSION['logged_user'])->message;
    $object = new ModelController("users");
    include_once _PROJECT_PATH_.'/backend/model/ApiController.php';
    $user = $results[0]->ID;

    // get the id of last purchase
    $_GET = [];
    $_GET['user'] = $user;
    $object = new ModelController("purchases");
    include _PROJECT_PATH_.'/backend/model/ApiController.php';
    $idpur = getLastPurchase($results);

    // insert the purchase
    $cartdata = createPurchaseObject($_POST['cart'],$idpur+1);
    $method="POST";
    $_POST = [];
    for ($i=0; $i < count($cartdata); $i++) { 
        $_POST['data'] = $cartdata[$i];
        include _PROJECT_PATH_.'/backend/model/ApiController.php';
    }

    // delete products from cart
    $method = "DELETE";
    $object = new ModelController("cart");
    $_GET = [];
    $_GET['user'] = $user;

} elseif (isset($_POST['purchase']) && $_POST['purchase']) { // purchase
    if (isset($_POST['op'])) {
        $method = $_POST['op'];
    }
    $object = new ModelController("purchases");
    

} elseif (isset($_POST['getPreviousPurchase']) && $_POST['getPreviousPurchase']) {
    $method = "GET";
    $object = new ModelController("purchases");
    $user = $_GET['user'];
    include _PROJECT_PATH_.'/backend/model/ApiController.php';
    $idpur = getLastPurchase($results);

    $_GET['user']=$user;
    $_GET['id_purchase'] = $idpur;

} else {
    $object = new ModelController("cart");
}

include _PROJECT_PATH_.'/backend/model/ApiController.php';
echo json_encode($results);