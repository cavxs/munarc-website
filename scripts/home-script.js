var timeTillLastVO = new Date().getTime();
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const slider = document.querySelector('.committees-section .body');
let isDown = false;
let startX;
let scrollLeft;

// Selectors
const home_nav = $("header .nav");
const docu = $(document);
const head = $(".head");
const headv = $(".head .video")
const headvv = $(".head .video video")

docu.ready(function() {
    startTimer();
    setInterval(function() {
        var curTime = new Date().getTime();
        if (docu.scrollTop() <= 10){
            showTimer();
            if (curTime - timeTillLastVO > 10000) { 
                hideTimer();
                $(".head").addClass("hidden");
                home_nav.addClass("hidden");
                $(".head .video").addClass("show")
                if (document.hasFocus()){
                    $(".head .video video").prop("muted", false);
                }else{
                    console.log("muted")
                    $(".head .video video").prop("muted", true);
                }
                $(".head .video video").trigger("play");
            }else{
                turnVidOff();
            }
        }else{
            hideTimer();
        }
    }, 500)

    $(function() {

        $(".committees-section .body").mousewheel(function(event, delta) {
     
           this.scrollLeft -= (delta * 100);
         
           event.preventDefault();
     
        });
     
     });
})


docu.click(function() {
    if (document.hasFocus()){
        turnVidOff();
        resetTimer();
        startTimer();
        timeTillLastVO = new Date().getTime();
    }
});

docu.scroll(function() {
    if (docu.scrollTop() > 1) {
        home_nav.removeClass('affix');
    } else {
        home_nav.addClass('affix');
    }
    turnVidOff();
    resetTimer();
    startTimer();
    timeTillLastVO = new Date().getTime();
});

function turnVidOff(){
    head.removeClass("hidden")
    home_nav.removeClass("hidden")
    headv.removeClass("show")
    headvv.trigger("pause");
    headvv.get(0).currentTime = 0;
}

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

$(".apply-section div button").hover(
  function() {
    $(".apply-section").addClass("darken");
  }, function() {
    $(".apply-section").removeClass("darken");
  }
);

const TIME_LIMIT = 10;
const FULL_DASH_ARRAY = 283;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerAlreadyStarted = false;

function formatTime(time) {
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${seconds}`;
}

let timerInterval = null;

document.getElementById("app").innerHTML = `...`

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer() {
    if (!timerAlreadyStarted){ 
        timerAlreadyStarted = true;
        timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
    }
}

function resetTimer(){
    clearInterval(timerInterval);
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    timerAlreadyStarted = false;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setCircleDasharray();
}

function showTimer(){
    $(".base-timer").removeClass("hide");
}

function hideTimer(){
    $(".base-timer").addClass("hide");
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
      
function setCircleDasharray() {
const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
).toFixed(0)} 283`;
document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}