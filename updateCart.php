<?php
	ini_set('display_errors', 'On');
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();
	$content = trim(file_get_contents("php://input"));
	$new_car = json_decode($content);

	if(empty($_SESSION['carReserve'])){
		$_SESSION['carReserve'] = array();
	}
	// if there is a car value
	if($new_car){
		foreach($_SESSION['carReserve'] as $index => $array){
			foreach ($array as $key => $value) {
				if($value==$new_car['id']){
					$exist_id = $key;
				}
			}
		}
		if(isset($exist_id)){
			echo 2;
		}
		else{
			array_push($_SESSION['carReserve'], $new_car);
			echo 1;
		}
	}
	// if there is a delete id
	else if($_GET['deleteId']){
		foreach($_SESSION['carReserve'] as $index => $array){
			foreach ($array as $key => $value) {
				if($value==$_GET['deleteId']){
					$delete_id = $index;
				}
			}
		}

		array_splice($_SESSION['carReserve'], $delete_id ,1);
		echo json_encode($_SESSION['carReserve']);
	}
	// no id value
	else{
		echo json_encode($_SESSION['carReserve']);
	}
?>