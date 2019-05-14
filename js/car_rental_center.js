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
			singleCar['counts'] = 1;

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

// get car rent information from session
function getSession(){
	var xml = new XMLHttpRequest();
	xml.open('get', 'updateCart.php', true);
	xml.onload = () => {	

		var hertz = new Vue({
			el: '#car_table',
			data: {
				cars: carData,
				cart: JSON.parse(xml.responseText)
			},
			computed: {
				car_list: function(){
					var carList = [];
					var length = Object.keys(this.cars).length;
					for(var i = 0; i < length; i++){
						if(this.cart.includes(this.cars[i]['id'])){
							let singleCar = this.cars[i];
							carList.push(singleCar);
						}
					}
					return carList;
				},
				total: function(){
					return 1;
				}
			},
			methods: {
				deleteCars: function(id){
					var xml = new XMLHttpRequest();
					xml.open('get', 'updateCart.php?deleteId='+id, false);
					xml.onload = e => {
						this.cart = JSON.parse(xml.responseText)
					}
					xml.send();
				},
				checkOut: function(){
					// console.log(this.cart)
				}
			}
		})
	}
	xml.send();
}
getSession();


