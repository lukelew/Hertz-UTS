var getTotal = new XMLHttpRequest();
getTotal.open('GET', 'getTotal.php');
getTotal.onloadend = e=>{
	var hertz = new Vue({
		el: '#total',
		data: {
			total: getTotal.response
		}
	})
}
getTotal.send();



// Validate the form
function validateForm(){
	// var popLayer = document.querySelector('#pop_layer');
	var name = document.querySelector("input[name='name']");
	var email = document.querySelector("input[name='email']");
	var address = document.querySelector("input[name='address']");
	var city = document.querySelector("input[name='city']");	
	var state = document.querySelector("input[name='state']");
	var postCode = document.querySelector("input[name='post_code']");

	var feedbackBox = document.querySelector('#feedback');
	

	function warningInfo(text){	
		var feedbackContent = document.querySelector('#feedback p');
		feedbackBox.classList.add('active');
		feedbackContent.innerText = text;
	}

	function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	}

	if(name.value == ''){
		warningInfo('You should input your name');
		return false;
	}
	else if(email.value == ''){
		warningInfo('You should input your email');
		return false;
	}
	else if(!validateEmail(email.value)){
		warningInfo('Invalidate email address');
		return false;
	}
	else if(address.value == ''){
		warningInfo('You should input your address');
		return false;
	}
	else if(city.value == ''){
		warningInfo('You should input your city');
		return false;
	}
	else if(state.value == ''){
		warningInfo('You should input your state');
		return false;
	}
	else if(postCode.value == ''){
		warningInfo('You should input your post code');
		return false;
	}
	else{
		feedbackBox.classList.remove('active');
		var formData = [{
					name: name.value,
					email: email.value,
					address: address.value,
					city: city.value,
					state: state.value,
					post_code: postCode.value,
				}]
		var xml = new XMLHttpRequest();
		xml.open('POST', 'sendemail.php');
		xml.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xml.send(JSON.stringify(formData));
	}
}

var submit = document.querySelector('#submit');
submit.addEventListener('click', ()=>{
	validateForm();
})