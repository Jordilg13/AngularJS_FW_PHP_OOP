<?
class Cart extends ModelController {
    protected $tableName='cart';
    public function __construct($tabn =""){
        if ($tabn != "") {
            $this->tableName = $tabn;
        }
    }
}