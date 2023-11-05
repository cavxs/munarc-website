const slider = document.querySelector('.chair-board .viewer .mover');
let organisation = false;


$("header").hover(
    function() {
      $( this ).removeClass("slided-up");
    }, function() {
      $( this ).addClass("slided-up");
    }
);

$(".bottom-sticker .chngpgright").click(function(){
  goOrg();
});

$(".bottom-sticker .chngpgleft").click(function(){
  goAca();
});

if (NavWid <= 1100) {
  $(".bottom-sticker .team:nth-child(2)").text("ORG.");
}

if (NavWid <= 650) {
  slider.scrollLeft = 300;
}

function goAca(){
  $("#main-viewer").animate({
    left: "0"
  }, 500, $.bez([0.22, 0.61, 0.35, 1]));
  $(".bottom-sticker .chngpgleft").addClass("hidden");
  $(".bottom-sticker .chngpgright").removeClass("hidden")
  $(".bottom-sticker").removeClass("switch")
    $(".bottom-sticker .class").removeClass("unshown");
  organisation = false;
}

function goOrg(){
  $("#main-viewer").animate({
    left: "-100%"
  }, 500, $.bez([0.22, 0.61, 0.35, 1]));
  $(".bottom-sticker .chngpgright").addClass("hidden");
  $(".bottom-sticker .chngpgleft").removeClass("hidden")
  $(".bottom-sticker").addClass("switch")
  $(".bottom-sticker .committee").addClass("unshown");
    $(".bottom-sticker .class").addClass("unshown");
  organisation = true;
}

let isDown = false;


slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  //console.log(scrollLeft)
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
  const walk = (x - startX) * 0.8; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});


var lastScrollLeft = 0;
$(slider).scroll(function() {
    var middle = ($(document).width()/2);
    var choosen = null;
    middle-=0;
    $(slider).children(".group").each(function(){
      if (middle > $(this).offset().left && middle < ($(this).width() + $(this).offset().left)) {
        $(this).addClass("selected")
        choosen = $(this);
      }else{
        $(this).removeClass("selected")
      }
    })

    

    if (choosen != null) {
      // if ($(choosen).is(":last-child")){
      //   // Bring the first child to be the last child
      //   console.log("last child")
      //   $(".chair-board .viewer .mover .group:nth-last-child(6)").clone().appendTo(slider);
      // }
      if (choosen.hasClass("unsc")){
        if (!($(".bottom-sticker .committee").text() == "unsc")){
          $(".bottom-sticker .committee").addClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").text("unsc")
            $(".bottom-sticker .committee").removeClass("unshown");
          }, 300);
        }
      }else if (choosen.hasClass("ga-1")){
        if (!($(".bottom-sticker .committee").text() == "ga-1")){
          $(".bottom-sticker .committee").addClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").text("ga-1")
            $(".bottom-sticker .committee").removeClass("unshown");
          }, 300);
        }
      }else if (choosen.hasClass("ga-6")){
        if (!($(".bottom-sticker .committee").text() == "ga-6")){
          $(".bottom-sticker .committee").addClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").text("ga-6")
            $(".bottom-sticker .committee").removeClass("unshown");
          }, 300);
        }
      }else if (choosen.hasClass("unhrc")){
        if (!($(".bottom-sticker .committee").text() == "unhrc")){
          $(".bottom-sticker .committee").addClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").text("unhrc")
            $(".bottom-sticker .committee").removeClass("unshown");
          }, 300);
        }
      }else if (choosen.hasClass("hc")){
        if (!($(".bottom-sticker .committee").text() == "historical crisis")){
          $(".bottom-sticker .committee").addClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").text("historical crisis")
            $(".bottom-sticker .committee").removeClass("unshown");
          }, 300);
        }
      }else if (choosen.hasClass("fc")){
        if (!($(".bottom-sticker .committee").text() == "futuristic crisis")){
          $(".bottom-sticker .committee").addClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").text("futuristic crisis")
            $(".bottom-sticker .committee").removeClass("unshown");
          }, 300);
        }
      }
    }else{
      $(".bottom-sticker .committee").addClass("unshown");
    }
    


}); 

const AcademicTeam = ["Executive Board", "Chair Board", "Crisis Team"];
const offset = 200;

const params = window.location.search;
const urlParams = new URLSearchParams(params);
const locWanted = urlParams.get("p");

$(document).on("ready", function(){
  $(".bottom-sticker .team").removeClass("unshown");
  var docHeight = $(document).height();
  var docWidth = $(document).width();
  var hexHeight = $("#bggrid li div").height();
  var hexWidth = $("#bggrid li div").width();
  var amntNeeded = Math.ceil(docHeight/hexHeight) * Math.ceil(docWidth/hexWidth);
  console.log(amntNeeded)
  for(i=0; i < amntNeeded; i++){
    $("#bggrid").append('<li><div class="bghexagon"></div></li>')
  }
  $("#bggrid li .bghexagon").mouseover(function() {
    console.log("hovered")
  });
  if (locWanted == "organisation"){
    setTimeout(() => {
      goOrg();
    }, 500);
  }else if(locWanted == "academic") {
    setTimeout(() => {
      goAca();
    }, 500);
  }
});

$(document).on('scroll', function() { 
  if (!organisation) {
    if ($(this).scrollTop() >= $(".crisis-team").position().top - offset) {
      if (!($(".bottom-sticker .class").text() == AcademicTeam[2]) || !($(".bottom-sticker .committee").hasClass("unshown"))){
        $(".bottom-sticker .class").addClass("unshown");
        $(".bottom-sticker .committee").addClass("unshown");

        console.log("true")
        setTimeout(() => {
          $(".bottom-sticker .class").text(AcademicTeam[2])
          $(".bottom-sticker .class").removeClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").addClass("unshown");
          }, 100);
        }, 300);
      }
    }else if ($(this).scrollTop() >= $(".chair-board").position().top - offset) {
      if (!($(".bottom-sticker .class").text() == AcademicTeam[1])){
        $(".bottom-sticker .class").addClass("unshown");
        $(".bottom-sticker .committee").addClass("unshown");

        console.log("true")
        setTimeout(() => {
          $(".bottom-sticker .class").text(AcademicTeam[1])
          $(".bottom-sticker .class").removeClass("unshown");
          setTimeout(() => {
            $(".bottom-sticker .committee").removeClass("unshown");
          }, 100);
        }, 300);
        
    }
    }else if ($(this).scrollTop() >= $(".executive").position().top - offset) {
      if (!($(".bottom-sticker .class").text() == AcademicTeam[0]) || !($(".bottom-sticker .committee").hasClass("unshown"))) {
          $(".bottom-sticker .class").addClass("unshown");
          $(".bottom-sticker .committee").addClass("unshown");
          console.log("false")
          setTimeout(() => {
            $(".bottom-sticker .class").text(AcademicTeam[0])
            $(".bottom-sticker .class").removeClass("unshown");
          }, 300);
      }
    }
  }else {
    $(".bottom-sticker .committee").addClass("unshown");
    $(".bottom-sticker .class").addClass("unshown");
  }
});


var originalBG = $("body").css("background-color");
var lightColor = "#ff0000"
var gradientSize = 20

$('body')
.mousemove(function(e) {

    x  = e.pageX - this.offsetLeft;
    y  = e.pageY - this.offsetTop;
    xy = x + " " + y;
	   
    bgWebKit = "-webkit-gradient(radial, " + xy + ", 100, " + xy + ", 300, from(rgba(255, 179, 0, 0.15)), to(rgba(0, 0, 0, 0.0))), " + originalBG;
    bgMoz    = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBG + " " + gradientSize + "px)";

    $(this)
      .css({ background: bgWebKit })
      .css({ background: bgMoz });
		
}).mouseleave(function() {
	$(this).css({ background: originalBG });
});