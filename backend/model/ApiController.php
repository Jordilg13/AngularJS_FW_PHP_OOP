<?
// this handle the operations depending of the request type
switch ($method) {
    case 'GET':
    case 'DELETE':
        $data=$_GET;
        $results = [];
        $meth = "build".$method."Query";
        $response = $object->request($data,$meth);

        if ($method=='DELETE'){
            if ($response){
                $results=$response;
            } else {
                header('HTTP/1.0 400 Bad Request');
                die();
            }
        } else {
            if ($response){
                foreach ($response as $row){
                    foreach ($row as &$element){
                        $element=utf8_encode($element);
                    }
                    $results[]=(object)$row;
                }
            } else {
                header('HTTP/1.0 400 Bad Request');
                die();
            }
        }
        break;
    case 'POST':
        if (isset($_POST['data']) && is_array($_POST['data']) ) {
            $data=(Object) $_POST['data'];
        } else {
            $data=json_decode($_POST['data']);
        }
        $meth = "build".$method."Query";
        $response = $object->request($data,$meth);
        if ($response){
            $results=$response;
        } else {
            header('HTTP/1.0 400 Bad Request');
            die();
        }
        break;
    case 'PUT':
        $data = [];
        array_push($data,$_GET);
        
        if (isset($_POST['fromphp']) && $_POST['fromphp']) {
            $dataPUT = $_POST;
        } else {
            $dataPUT = json_decode(file_get_contents('php://input'),true); 
        }

        array_push($data,$dataPUT['data']);
       
        $meth = "build".$method."Query";
        $response = $object->request($data,$meth);

        if ($response){
            $results=$response;
        } else {
            header('HTTP/1.0 400 Bad Request');
            die();
        }
        break;
    default:
        echo json_encode("default");
        break;
}