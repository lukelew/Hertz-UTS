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
var sessionCart = {};

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

// get car rent information from session
function getSession(){
	var xml = new XMLHttpRequest();
	xml.open('get', 'updateCart.php', false);
	xml.onload = e => {
		sessionCart = e.target.response;
	};
	xml.onloadend = e => {	
		var hertz = new Vue({
			el: '#car_table',
			data: {
				cars: carData,
				cart: sessionCart
			},
			computed: {
				car_list: function(){
					var carList = {};
					var length = Object.keys(this.cars).length;
					for(let i = 0; i < length; i++){
						if(this.cart.includes(this.cars[i][9])){
							carList[i] = this.cars[i];
						}
					}
					return carList;
				}
			},
			methods: {
				deleteCars: function(id){
					var xml = new XMLHttpRequest();
					xml.open('get', 'updateCart.php?deleteId='+id, false);
					xml.onloadend = e => {
						this.cart = e.target.response;
					}
					xml.send();
				}
			}
		})
	}
	xml.send();
}
getSession();


