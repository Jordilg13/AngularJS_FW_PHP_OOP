<?php

function getLastPurchase($purchases) {
    $ret = 0;
    if (count($purchases) != 0) {
        $ids = [];
        for ($i=0; $i < count($purchases); $i++) { 
            array_push($ids,$purchases[$i]->id_purchase);
        }
        $ret = max($ids);
    }
    return $ret;
}

function createPurchaseObject($cart,$id) {
    $checkout = [];
    error_log(print_r("aaaaaaaaaaaaaa",1));
    for ($i=0; $i < count($cart); $i++) {
        $method = "GET";
        $object = new Cart("products");
        $_GET = [];
        $_GET['product_code'] = $cart[$i]['id_prod'];
        include _PROJECT_PATH_.'/backend/model/ApiController.php';
        $checkout[$i]['totalprice'] = $results[0]->price*$cart[$i]['cant'];


        $checkout[$i]['id_purchase'] = $id;
        $checkout[$i]['user'] = $cart[$i]['user'];
        $checkout[$i]['product'] = $cart[$i]['id_prod'];
        $checkout[$i]['cant'] = $cart[$i]['cant'];
        $checkout[$i]['date'] = date(DATE_ATOM);
    }
    return $checkout;
}