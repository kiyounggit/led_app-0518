//http://www.w3schools.com/ajax/
var xmlHttp = null;

if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlHttp = new XMLHttpRequest();
} else {// code for IE6, IE5
	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}

setInterval(function(){ getSensors(); }, 5000);

function getSensors() {
	xmlHttp.open('GET', '/api/sensors/list', true);
	xmlHttp.onreadystatechange = function() {
	    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	        //console.log(xmlHttp.responseText)
	        var sensors = JSON.parse(xmlHttp.responseText);
			for(i = 0; i < sensors.length; i++) {
	        	console.log(sensors[i]);
	        	var sensor = sensors[i];
		        var element = document.getElementById(""+sensor._id);
		        var temp =
		        	i + ":" + sensor.name+ "(" + sensor.switch + ")";
		        if(sensor.switch == "on")
		        	element.querySelector("img").src = "/images/light_on.png";
					// temp += "<img src='/images/light_on.png' id='img_light'" + i + ">"
				    //      + "<button id='ledbutton'" + i + " value=눌러!>";
				else
					element.querySelector("img").src = "/images/light_off.png";
		       element.innterText = temp;
	        }
		}
	};
	xmlHttp.send();
}

function changeBg() {
	var imgElement = document.getElementById("img_light");

	console.log(imgElement.src);

	if (imgElement.src.match("light_on")) {
	  imgElement.src = "/images/light_off.png";
	} else {
	  imgElement.src = "/images/light_on.png";
	}
}

function toggleImage(i, id) {
	var imgElement = document.getElementById("img_light"+i);
	var sw;
	if (imgElement.src.match("light_on")) {
	  imgElement.src = "/images/light_off.png";
	  sw = "off";
	} else {
	  imgElement.src = "/images/light_on.png";
	  sw = "on";
	}

	// http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp
	var params = "switch=" + sw + "&param2=abc";
	xmlHttp.open('PUT', '/api/sensors/' + id, true);
	xmlHttp.setRequestHeader('Content-Type',
							'application/x-www-form-urlencoded');
	xmlHttp.onreadystatechange = function() {//Call a function when the state changes.
	    if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	        console.log(xmlHttp.responseText);
		}
	};
	xmlHttp.send(params);
}
