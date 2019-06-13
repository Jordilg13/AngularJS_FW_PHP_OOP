<?
include_once _PROJECT_PATH_.'/backend/model/db.class.singleton.php';

// ControllerCore generates the queries depending on the given parameters
class ControllerCore{
    // LIMIT must go first of all
    // COUNT mustn't be last

    /**
     * adds a where statement to the actual query
     *
     * @param array $array
     * @return string
     */
    private function addWhereStatement($array){
        $conditions=count($array);
        $query='';
        $limit='';
        if ($conditions>=1){
            $query = " WHERE ";
        }
        foreach ($array as $row => $value){
            if ($row=='limit'){
                $limit = $this->addLimitStatement($value);
                $conditions--;
            } else if ($row=='count'){
                $conditions--;
            } else {
                $query .= $row." LIKE '".str_replace('!','%',$value)."'"; 
                $conditions--;
                if ($conditions>0){
                    $query .= ' AND ';
                }
            }
        }
        if ($query == " WHERE "){
            return $limit;
        }
        return $query.$limit;
    }
    
    /**
     * adds the limit statement to the actual query
     *
     * @param string $limit
     * @return string
     */
    private function addLimitStatement($limit){
        $query='';
        $values=explode(',',$limit);
        $query .= ' LIMIT '.$values[0];
        if (array_key_exists(1,$values)){
            $query .= ', '.$values[1];
        }
        return $query;
    }

    /**
     * executes a query
     *
     * @param string $query
     * @return array
     */
    protected function runQuery($query){
        $con = DB::getInstance();
        $res = $con->ejecutar($query);
        return $res;
    }

    /**
     * builds a select query
     *
     * @param array $data
     * @return string
     */
    protected function buildGETQuery($data){
        $query = 'SELECT * FROM '.$this->tableName;
        if ($data!="" && is_array($data)){
            if (isset($data['count'])){
                $query = 'SELECT COUNT(*) as rowcount FROM '.$this->tableName;
            }
            $query .= $this->addWhereStatement($data);
        }
        error_log(print_r($query,1));
        return $query;
    }
    /**
     * builds an insert query
     *
     * @param array $data
     * @return string
     */
    protected function buildPOSTQuery($data){
        // Object: {column_name: "value"} 
        if ($data!="" && is_object($data)){
            $query = 'INSERT INTO '.$this->tableName;
            $rows = ' (';
            $values = ' VALUES (';
            $endData=end($data);
            $endKey = key($data);
            unset($data->$endKey);
            foreach ($data as $row => $value){
                $rows .= $row.', ';
                $values .= '"'.$value.'", ';
            }
            $values .= '"'.$endData.'")';
            $rows .= $endKey.')';
            $query .= $rows.$values;
        }
        error_log(print_r($query,1));
        return $query;
    }

    /**
     * builds an update query
     *
     * @param array $data
     * @return string
     */
    protected function buildPUTQuery($data){
        // Object: {column_name: "value"} 
        $count = 0;
        if ($data!="" && is_array($data)){
            $query = 'UPDATE '.$this->tableName.' SET ';
            foreach ($data[1] as $row => $value){
                $count++;
                $query .= $row."='".$value."'";
                if (count($data[1]) == $count) $query .= ' ';
                else $query .= ', ';
            }
            $query .= $this->addWhereStatement($data[0]);
        }
        error_log(print_r($query,1));
        return $query;
    }
    
    /**
     * builds a delete query
     *
     * @param array $data
     * @return string
     */
    protected function buildDELETEQuery($data){
        error_log(print_r($data,1));
        $query = 'DELETE FROM '.$this->tableName;
        $query .= $this->addWhereStatement($data);
        error_log(print_r($query,1));
        return $query;
    }
}