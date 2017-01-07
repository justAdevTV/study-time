
  document.addEventListener("DOMContentLoaded", function(event) {
   console.log("DOM fully loaded and parsed");
   var time = document.getElementById('timer');
   function startTimer(duration, display) {
	    var timer = duration, minutes, seconds;
	    setInterval(function () {
	        minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        display.innerHTML = 'Redirecting you in ' + seconds + ' seconds.'

	        if (timer !== 0){
	        	timer--;
	        }else{
	        	return 0;
	        }

	    }, 1000);
	}
	startTimer(7, time);
  });
