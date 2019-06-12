<?
class ModelController extends ControllerCore{
    static $_instance;
    protected $tableName='';

    public function __construct($tabn =""){
        if ($tabn != "") {
            $this->tableName = $tabn;
        }
    }
    
    // protected function __construct(){
    // }

    public function request($data, $func){
        // debug($data);
        $query=$this->$func($data);        
        return $this->runQuery($query);
    }

    public static function getInstance($table) {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self($table);
        return self::$_instance;
    }

}