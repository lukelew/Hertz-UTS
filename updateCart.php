<?php
	ini_set('display_errors', 'On');
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();

	if(empty($_SESSION['cart'])){
		$_SESSION['cart'] = array();
	}
	if($_GET['carId']){
		foreach($_SESSION['cart'] as $key => $value){
			if($value==$_GET['carId']){
				$exist_id = $key;
			}
		}
		if(isset($exist_id)){
			$_SESSION['cart'][$exist_id] = $_GET['carId'];
		}
		else{
			array_push($_SESSION['cart'], $_GET['carId']);
		}	
	}
	echo json_encode($_SESSION['cart']);

?>