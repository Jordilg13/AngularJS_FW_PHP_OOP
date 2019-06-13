<?
spl_autoload_register(null,false);
spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
spl_autoload_register('loadClasses');

/**
 * load classes when they are going to be used from backend/model
 *
 * @param string $className
 * @return void
 */
function loadClasses($className){
    error_log("autoloaded class: ".$className);
    // model class
    if (file_exists(dirname(__FILE__).'/'.$className.'.class.php')) {
        include_once dirname(__FILE__).'/'.$className.'.class.php';
    }
}

