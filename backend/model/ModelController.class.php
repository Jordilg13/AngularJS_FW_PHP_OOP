<?
class ModelController extends ControllerCore{
    static $_instance;
    protected $tableName='';

    public function __construct($tabn =""){
        if ($tabn != "") {
            $this->tableName = $tabn;
        }
    }

    public function request($data, $func){
        $query=$this->$func($data);        
        return $this->runQuery($query);
    }

    /**
     * @deprecated
     * I stopped using this because each ModelController should has a different table name
     *
     * @param string $table
     * @return void
     */
    public static function getInstance($table) {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self($table);
        return self::$_instance;
    }

}