<?
class FrontController {
    static $_instance;

    public function FrontController(){
        $this->uri = $_SERVER['REQUEST_URI'];
        $this->run();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    private function getAllowedPages(){
        $allowedPages=array(
            'aboutus',
            'cart',
            'contactus',
            'home',
            'likes',
            'shop',
            'login',
            'products_crud',
            'profile',
            'services'
        );
        return $allowedPages;
    }

    public function run(){
        include_once dirname(__FILE__).'/../paths.php';
        $allowedPages=$this->getAllowedPages(); 
        $this->uri=rtrim($this->uri, '/');
        $cutUrl=explode('/',$this->uri);
        // $cutUrl[2] = (!isset($cutUrl[2])) ? "home" : $cutUrl[2]; // if isn't set, set home

            if (in_array($cutUrl[3],$allowedPages)){
                $getParams=array_slice($cutUrl,4);
                foreach ($getParams as $getParam){
                    $params = explode('-',$getParam);
                    $_GET[$params[0]]=$params[1];
                }
                include_once _PROJECT_PATH_.'/module/'.$cutUrl[3].'/controller/'.$cutUrl[3].'.php';
            } else {
                header('HTTP/1.0 404 Not found');
            }
        }
    }

?>