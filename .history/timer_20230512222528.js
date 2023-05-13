
        let timeLeft = document.getElementById("timeLeft");
        let countdownCircle = document.getElementById('dd');
        let dots = document.querySelector('.dots');
        let endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + 5); // Set the end time to 1 minute from the current time

        let x = setInterval(function(){
            let now = new Date().getTime();
            let distance = endTime - now;

            // Time calculations for minutes and seconds
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the remaining time in the format MM:SS
            timeLeft.innerHTML = minutes.toString().padStart(2, '0') + ":" +
                                  seconds.toString().padStart(2, '0');

            // Calculate the radius of the circle based on the remaining time
            let radius = (distance / (endTime - now)) * 70;
            countdownCircle.setAttribute('r', radius);

            if (distance <= 0) {
                clearInterval(x);
                timeLeft.innerHTML = "00:00"; 
                showAlert();
                // Display a specific message or perform any actions when the countdown reaches zero
            } 

            dd.style.strokeDashoffset = 440 - (440 * (distance / (5 * 60 * 1000)));

        }, 1000);
        function showAlert(){
            alert("time is over");
        }
