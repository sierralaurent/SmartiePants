let timeLeft = document.getElementById("timeLeft");
let countdownCircle = document.getElementById('dd');
let dots = document.querySelector('.dots');
let endTime = new Date();

let x;

function startTimer() {
  // Hide the settings container and show the quiz container
  document.getElementById("settingsContainer").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";

  // Set the end time for 30 seconds from now
  endTime = new Date();
  endTime.setSeconds(endTime.getSeconds() + 30);

  // Start the timer
  x = setInterval(function() {
    let now = new Date().getTime();
    let distance = endTime - now;

    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeLeft.innerHTML = seconds.toString().padStart(2, '0');

    let radius = (distance / (endTime - now)) * 70;
    countdownCircle.setAttribute('r', radius);

    if (distance <= 0) {
      clearInterval(x);
      timeLeft.innerHTML = "00";
      showAlert();
    }

    dd.style.strokeDashoffset = 440 - (440 * (distance / (30 * 1000)));

  }, 1000);
}

function showAlert() {
  alert("Time is over");
  window.location.href = "https://example.com/another-page";
}

// Add event listener to the start button
document.getElementById("start-button").addEventListener("click", startTimer);


