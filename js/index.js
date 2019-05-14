var carData = [];
function getCars(){
	var carArr = [];

	var xml = new XMLHttpRequest();
	xml.open('GET','cars.xml', false);
	xml.onload = e => {
		var xmlDoc = xml.responseXML;
		var rawCarTags = xmlDoc.getElementsByTagName('car');

		for(var i =0; i < rawCarTags.length; i++ ){
			let singleCar = {}
			singleCar['id'] = rawCarTags[i].id
			for(let j=0; j<rawCarTags[i].childNodes.length; j++){
				if(rawCarTags[i].childNodes[j].nodeType == 3){
					rawCarTags[i].removeChild(rawCarTags[i].childNodes[j])
					j--;
				}
				else {
					singleCar[rawCarTags[i].childNodes[j].nodeName] = rawCarTags[i].childNodes[j].innerHTML;
				}
			}
			carData.push(singleCar);
		}
	}
	xml.send();
}
getCars();

var hertz = new Vue({
	el: '#car_list',
	data: {
		cars: carData
	}
})

var throttle = (func, wait, mustRun) => {
    var timeout,
        startTime = new Date();
 
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
 
        clearTimeout(timeout);
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
        }else{
            timeout = setTimeout(func, wait);
        }
    };
};

// control the header to slide down
var header = document.querySelector('header')
var fixNav = ()=>{
	if(window.scrollY>5){
		header.classList.add('active');
	}
	else{
		header.classList.remove('active');
	}
}

window.addEventListener('scroll',throttle(fixNav,60,1000));


// rent btn
function updateCar(carId){
	var carId = carId;
	var xml = new XMLHttpRequest();
	xml.open('GET','updateCart.php?carId='+carId,false);
	xml.onload = e => {
		var res = e.target.response;
		if(res == 1){
			warningBox('This car has been added successfully')
		}
		else if(res == 2){
			warningBox('This car is already reserved')
		}
	};
	xml.send();
}

var carList = document.querySelector('#car_list');
carList.addEventListener('click', (e)=>{
	var curId = e.target.dataset.id;
	if(e.target.classList.contains('rent_button') && !e.target.classList.contains('active')){
		warningBox('Sorry, the car is not available now. Please try other cars');
	}
	else{
		updateCar(curId);
	}
})

// warning information box
function warningBox(text){
	var warningBox = document.querySelector('#warning');
	var contentBox = document.querySelector('#warning strong');

	contentBox.innerText = text;
	warningBox.classList.add('active');

	var toggleWarning = function(){
		warningBox.classList.remove('active');
	}

	clearTimeout(toggleWarning);
	setTimeout(toggleWarning, 3000);
}