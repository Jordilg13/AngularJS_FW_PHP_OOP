<?
class ModelController extends ControllerCore{
    // static $_instance;
    
    protected function __construct(){
    }

    public function request($data, $func){
        // debug($data);
        $query=$this->$func($data);        
        return $this->runQuery($query);
    }

}