<?php
    $arr = array ('0'=>array('0'=>0,'1'=>0,'2'=>0,'3'=>0,'4'=>0,'5'=>0,'6'=>0,'7'=>0),
				  '1'=>array('0'=>0,'1'=>1,'2'=>1,'3'=>1,'4'=>1,'5'=>1,'6'=>1,'7'=>0),
				  '2'=>array('0'=>0,'1'=>1,'2'=>0,'3'=>0,'4'=>0,'5'=>0,'6'=>1,'7'=>0),
				  '3'=>array('0'=>0,'1'=>0,'2'=>0,'3'=>1,'4'=>1,'5'=>0,'6'=>0,'7'=>0),
				  '4'=>array('0'=>0,'1'=>0,'2'=>0,'3'=>1,'4'=>1,'5'=>0,'6'=>0,'7'=>0),
				  '5'=>array('0'=>0,'1'=>1,'2'=>0,'3'=>0,'4'=>0,'5'=>0,'6'=>1,'7'=>0),
				  '6'=>array('0'=>0,'1'=>1,'2'=>1,'3'=>1,'4'=>1,'5'=>1,'6'=>1,'7'=>0),
				  '7'=>array('0'=>0,'1'=>0,'2'=>0,'3'=>0,'4'=>0,'5'=>0,'6'=>0,'7'=>0));

    echo json_encode($arr);
?>