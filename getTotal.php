<?php
	ini_set('display_errors', 'On');
	include 'json_encode.php';
	include 'json_decode.php';
	
	session_start();

	if($_GET['total']){
		$_SESSION['carReserveTotalPrice'] = $_GET['total'];
	}
	
	print_r($_SESSION['carReserveTotalPrice']);
?>