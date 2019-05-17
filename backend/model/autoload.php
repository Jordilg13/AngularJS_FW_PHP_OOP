<?
spl_autoload_register(null,false);
spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
spl_autoload_register('loadClasses');

function loadClasses($className){
    error_log($className);
    // module class
    if (file_exists('modules/'.strtolower($className).'/model/'.$className.'.class.php')) {
        include_once 'modules/'.strtolower($className).'/model/'.$className.'.class.php';
    }
    // model class
    if (file_exists(dirname(__FILE__).'/'.$className.'.class.php')) {
        include_once dirname(__FILE__).'/'.$className.'.class.php';
    }
}

