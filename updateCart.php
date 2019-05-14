<?php
	ini_set('display_errors', 'On');
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();

	if(empty($_SESSION['carReserve'])){
		$_SESSION['carReserve'] = array();
	}
	// if there is a id value
	if($_GET['carId']){
		foreach($_SESSION['carReserve'] as $key => $value){
			if($value==$_GET['carId']){
				$exist_id = $key;
			}
		}
		if(isset($exist_id)){
			$_SESSION['carReserve'][$exist_id] = $_GET['carId'];
			echo 2;
		}
		else{
			array_push($_SESSION['carReserve'], $_GET['carId']);
			echo 1;
		}
	}
	// if there is a delete id
	else if($_GET['deleteId']){
		$key = array_search($_GET['deleteId'], $_SESSION['carReserve']);
		array_splice($_SESSION['carReserve'], $key ,1);
		echo json_encode($_SESSION['carReserve']);
	}
	// no id value
	else{
		echo json_encode($_SESSION['carReserve']);
	}
?>