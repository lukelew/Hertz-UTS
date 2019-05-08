function modifyXml(oldArr){
	var	oldArr = oldArr.trim().split('\n');
	var	newArr = oldArr.map( x => {
		let ele = x.trim();
		if(ele === 'True'){
			ele = true;
		}
		else if( ele === 'False'){
			ele = false;
		}
		return ele
	});
	return newArr;
}

var carData = {};

function getCars(){
	var carArr = new Array();

	var xml = new XMLHttpRequest();
	xml.open('GET','cars.xml',false);
	xml.onload = e => {
		var xmlDoc = xml.responseXML;
		var carTags = xmlDoc.getElementsByTagName('car');
		for(var i =0; i < carTags.length; i++ ){
			carArr[i] = modifyXml(carTags[i].textContent);
			carArr[i].push(carTags[i].id);
		}
	}
	xml.send();

	carData = Object.assign({}, carArr);
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