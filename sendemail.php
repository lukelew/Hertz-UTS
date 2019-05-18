<?php
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();

	$content = trim(file_get_contents("php://input"));
	$raw_data = json_decode($content);
	$form_data = $raw_data[0];

	print_r($form_data);

	$to = $form_data['email'];
	$subject = "Thanks for renting!";

	$message = "<html><body>";
	$message .= "<p>Dear ".$form_data['name']."</p>";
	$message .= "<p>We have already received your order.</p>";
	$message .= "<p>Your address is: <strong>".$form_data['address']." ".$form_data['city']." ".$form_data['state']."</strong></p>";
	$message .= "<table><tr style='text-align:left;color: #ffffff;background: #6cbcf3;'>";
	$message .= "<th style='padding:5px 20px'>Brand</th>";
	$message .= "<th style='padding:5px 20px'>Model</th>";
	$message .= "<th style='padding:5px 20px'>Model Year</th>";
	$message .= "<th style='padding:5px 20px'>Mileage</th>";
	$message .= "<th style='padding:5px 20px'>Fuel Type</th>";
	$message .= "<th style='padding:5px 20px'>Seats</th>";
	$message .= "<th style='padding:5px 20px'>Price Per Day</th>";
	$message .= "<th style='padding:5px 20px'>Rent Days</th></tr>";
	$message .= "<p>The cars you've rent are:</p>";

	for($i=0; $i< count($_SESSION['carReserve']); $i++){
		$message .= "<tr>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['brand']."</td>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['model']."</td>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['model_year']."</td>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['mileage']."</td>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['fuel_type']."</td>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['seats']."</td>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['price_per_day']."</td>";
		$message .= "<td>".$_SESSION['carReserve'][$i]['counts']."</td>";
		$message .= "</tr>";
	}

	$message .= "</table>";
	$message .= "<p>The total price is: A$".$_SESSION['carReserveTotalPrice']."</p>";
	$message .= "<p>Please wait for your order to be updated.</p>";
	$message .= "<p>^_^</p>";
	$message .= '</body></html>';


	$from = "Herz-UTS@student.uts.edu.au";
	$headers = "From: $from";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html";

	mail($to,$subject,$message,$headers);
	
	echo "Mail Sent.";

?>