<?
// TODO: create a masterclass that manage all modules, allowing to change the tablename like in this class
class Cart extends ModelController {
    protected $tableName='cart';
    public function __construct($tabn =""){
        if ($tabn != "") {
            $this->tableName = $tabn;
        }
    }
}