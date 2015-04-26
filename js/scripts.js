var green = "#26A65B";
var red = "#D91E18";
var yellow = "#F4B350";
var light = 0;
var textarea = document.getElementById('textarea');

function count () {
	var time = document.getElementById('timer').textContent;
	var min = parseInt(time.substring(0, 1));
	var sec = parseInt(time.substring(2, 4));
	
	// do the counting
	if (min > 0 && sec == 0) {
		min--;
		sec = 59;
	} else if (min == 0 && sec == 0 && light == 0) {
		min = 5;
		go();
	} else if (min == 0 && sec == 0 && light == 1) {
		stop();
	} else {
		sec--
	};
			
	// add a 0 before single digit seconds
	if (sec < 10) {
		sec = "0" + sec;
	};

	if (document.getElementById('timer')) {
		document.getElementById('timer').textContent = min + ":" + sec;
	};
}

var interval = setInterval(count, 1000);

function go () {
	light = 1;
	document.getElementById('circle').style.backgroundColor = green;
	textarea.disabled = false;
	textarea.readOnly = false;
	textarea.placeholder = "";
	textarea.focus();
}

function stop () {
	clearInterval(interval);
	light = 0;
	var circle = document.getElementById('circle');
	circle.removeChild(circle.firstChild);
	circle.style.backgroundImage = "url(img/refresh-icon.png)";
	circle.style.backgroundSize = "200px 200px";
	circle.style.backgroundColor = yellow;
	circle.onclick = restart;
	circle.onmouseover = function () {
		circle.style.backgroundColor = "#F4C360";
	};
	circle.onmouseout = function () {
		circle.style.backgroundColor = yellow;
	}
	textarea.readOnly = true;
	textarea.disabled = true;
	textarea.placeholder = "Wait for the green light, then write like mad."

}

function getPrompt () {
	$.ajax({
		url: "http://trevorpostma.com/prompts2.json",
		success: function (data) {
			// get a number between 0 and 500
			var random = Math.floor(Math.random() * (30 - 0)) + 0;
			console.log(random);
			
			// get prompt from array
			var prompt = data[random];
			
			// add prompt to the website
			document.getElementById('prompt').textContent = prompt;
		}
	});
}

function restart () {
	var span = document.createElement('span');
	span.id = 'timer';
	var text = document.createTextNode('0:30');
	span.appendChild(text);
	var circle = document.getElementById('circle');
	circle.appendChild(span);
	circle.style.backgroundColor = red;
	circle.style.backgroundImage = "";
	circle.onclick = "";
	circle.onmouseover = function () {
	};
	circle.onmouseout = function () {
	}
	textarea.value = "";
	getPrompt();
	interval = setInterval(count, 1000);
}

getPrompt();