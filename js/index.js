function modifyXml(oldArr){
	var oldArr = oldArr.trim().split('\n');
	var newArr = oldArr.map(x => x.trim());
	return newArr;
}
var carArr = new Array();


var xml = new XMLHttpRequest();
xml.open('GET','cars.xml',false);
xml.onload = e => {
	var xmlDoc = xml.responseXML;
	var carTags = xmlDoc.getElementsByTagName('car');
	for(let i =0; i < carTags.length; i++ ){
		carArr[i] = modifyXml(carTags[i].textContent);
	}
}
xml.send();

var carData = Object.assign({}, carArr);

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
        // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;
        // 没达到触发间隔，重新设定定时器
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

window.addEventListener('scroll',throttle(fixNav,60,1000))