function updateCar(carId){
	var carId = carId;
	var xml = new XMLHttpRequest();
	xml.onreadystatechange = function() {
	    if (xml.readyState === 4) {
	      console.log(typeof(xml.response));
	    }
	  }
	xml.open('GET','updateCart.php?carId='+carId,false);
	xml.send();
}

updateCar('');