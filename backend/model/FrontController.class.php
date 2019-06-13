<?
// acts as a routing for the "api"
class FrontController {
    static $_instance;

    public function FrontController(){
        $this->uri = $_SERVER['REQUEST_URI'];
        $this->run();
    }

    /**
     * create an instance of the classe only if it doesn't exists
     *
     * @return self
     */
    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    /**
     * returns an array of the allowed pages
     *
     * @return array
     */
    private function getAllowedPages(){
        return array(
            'aboutus',
            'cart',
            'contactus',
            'home',
            'likes',
            'shop',
            'login',
            'products_crud',
            'profile',
            'services',
            "auth0",
            "auth0callback",
        );
    }

    /**
     * handles the api requests and convert the pretty urls into parameters
     * 
     * "localhost/angular/api/users/user--ethan". Here the parameters will be extracted into $_GET['user']="ethan" 
     *  and redirected to the users controller
     * 
     * the parameters are separated by --  (.../key--value)
     * 
     * @example LIMIT limit must be the first parameter in URL .../api/products/limit--3
     * @example COUNT must be the first parameter in the URL .../api/products/count--1/family--tech(the number must be here but won't be used)
     *
     * @return void
     */
    public function run(){
        include_once dirname(__FILE__).'/../paths.php';

        $allowedPages=$this->getAllowedPages(); 
        $this->uri=rtrim($this->uri, '/');
        $cutUrl=explode('/',$this->uri);
        // error_log(print_r($cutUrl,1));

        $_POST = json_decode(file_get_contents('php://input'),true); // true makes it parse as an array
        
        if (isset($cutUrl[2]) && $cutUrl[2]=='api') { // if is a request for the api
            if (in_array($cutUrl[3],$allowedPages)){ // if the page is allowed
                $getParams=array_slice($cutUrl,4);
                foreach ($getParams as $getParam){
                    $params = explode('--',$getParam);
                    $_GET[$params[0]]=$params[1];
                }
                include_once _PROJECT_PATH_.'/backend/modules/'.$cutUrl[3].'/controller/'.$cutUrl[3].'.php';
            } else {
                header('HTTP/1.0 404 Not found');
            }
        }
    }
}

?>