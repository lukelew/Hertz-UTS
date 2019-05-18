<?php
	ini_set('display_errors', 'On');
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();

	$content = trim(file_get_contents("php://input"));
	$new_data = json_decode($content);

	foreach ($_SESSION['carReserve'] as $index => $array) {
		$_SESSION['carReserve'][$index]['counts'] = $new_data[$index]['counts'];
	}


?>