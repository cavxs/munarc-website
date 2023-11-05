// Credit: Ibrahim Ghassan





// Constant Objects (for performance)
const docu = $(document);
const spinner = $("div.head .spinner");
const spinnerWrapperHexagon = $('div.head .spinner .wrapper .hexagon');
const rightScreenToolHex = $(".screen-tool img:nth-child(1)");
const leftScreenToolHex = $(".screen-tool img:nth-child(2)");
const nextButtonRight = $("div.head .next-buttons img:nth-child(2)");
const nextButtonLeft = $("div.head .next-buttons img:nth-child(1)");
const screenTool = $(".screen-tool");
const screenToolImg = $(".screen-tool img");
const toolTip = $("div.head .tooltip");
const header = $("header");
const divHead = $("div.head");
const divHeadContent = $("div.head .content");
const committeeContentDiv = $(".committee-content > div");
const contentComVid = $("div.head .content .com .video");
const contentCom = $("div.head .content .com");

// Other constants and global variables
const spinnercomtxt = ["g", "g", "u", "u", "h", "f"];
const committeesInOrder = ["ga-1", "ga-6", "unhrc", "unsc", "historical crisis", "futuristic crisis"];
const comamnt = $("div.head .content .com").length;
let comselected = 1;

// Set position of spinner to div.head .content .com.selectedr .heading .top h1
spinner.css("left", $("div.head .content .com .heading").first().position().left)
spinner.css("top", $("div.head .content .com .heading").first().position().top)

$("div.head .tab-select").append("<div class='btn hexagon selected'><span></span></div>")
for (i = 0; i < comamnt-1; i++) {
    $("div.head .tab-select").append("<div class='btn hexagon'><span></span></div>")
}

// Object constant after making the hexagons
const tabSelectHexagon = $("div.head .tab-select .hexagon");

// num is from 0
function GoTo(num){
    var timesToUpdateCOM = num+1 - comselected;
    console.log("times to update: " + timesToUpdateCOM + ", num: " + num);
    if (timesToUpdateCOM != 0) {
        
        
        //console.log(goingto+1 + ", " + comselected);
        var leftOrRight;
        if (timesToUpdateCOM > 0) {
            leftOrRight = "r"
            comselected += 1;
        }else{
            leftOrRight = "l"
            comselected -= 1;
        }
        updateCOM(leftOrRight);

        tabSelectHexagon.removeClass("selected")
        tabSelectHexagon.eq(num).addClass("selected")

        if (Math.abs(timesToUpdateCOM)-1 != 0){
            var timesMoved = 1;
            var moveRest = setInterval(() => {
                if (leftOrRight=="r"){
                    comselected += 1;
                }else{
                    comselected -= 1;
                }
                updateCOM(leftOrRight);
                if (timesMoved >= Math.abs(timesToUpdateCOM) - 1){
                    clearInterval(moveRest);
                }
                timesMoved++;
            }, 600);
        }
        if (num == comamnt-1){
            rightScreenToolHex.addClass("hide");
            leftScreenToolHex.removeClass("hide");
            nextButtonRight.addClass("hide")
            nextButtonLeft.removeClass("hide")
        }else if (num == 0){
            leftScreenToolHex.addClass("hide");
            rightScreenToolHex.removeClass("hide");
            nextButtonLeft.addClass("hide")
            nextButtonRight.removeClass("hide")
        }else{
            nextButtonLeft.removeClass("hide")
            nextButtonRight.removeClass("hide")
            screenToolImg.addClass("hide"); // TODO: WHAT?!
            screenToolImg.removeClass("hide");
        }
        
    }
}


tabSelectHexagon.click(function() {
    if (!$(this).hasClass("selected")){
        // Get which one selected 
        GoTo($(this).index());
    }    
});

nextButtonLeft.click(function(){
    comselected -= 1;
    if (limitComSelected()) {
        $(this).addClass("hide")
        leftScreenToolHex.addClass("hide");
    }
    nextButtonRight.removeClass("hide")
    rightScreenToolHex.removeClass("hide");

    tabSelectHexagon.removeClass("selected");
    $("div.head .tab-select .hexagon:nth-child(" + comselected + ")").addClass("selected");
    updateCOM("l");
    console.log(comselected);
});

const param = new URLSearchParams(window.location.search).get("c");
const paramValues = ["g1", "g6", "uh", "un", "hc", "fc"];

function paramsTest(paramfunc){
    return paramfunc == param;
}

docu.on("ready", function(){
    const whichComI = paramValues.findIndex(paramsTest);
    if (whichComI >= 0){
        GoTo(whichComI);
    }
    

  $(function($) {
    var currentMousePos = { x: -1, y: -1 };
    docu.mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });
    $( "div.head .tab-select .hexagon" )
    .mouseover(function() {
        toolTip.css("display", "block")
        toolTip.css("left", (currentMousePos.x - 20) +"px");
        toolTip.css("top", (currentMousePos.y - 50) +"px");
        toolTip.find("span").text(committeesInOrder[$(this).index()])
    })
    .mouseout(function() {
        toolTip.css("display", "none")
    });
    
});
})

nextButtonRight.click(function() {
    comselected += 1;
    if (limitComSelected()) {
        $(this).addClass("hide")
        rightScreenToolHex.addClass("hide");
    }
    nextButtonLeft.removeClass("hide");
    leftScreenToolHex.removeClass("hide");

    tabSelectHexagon.removeClass("selected");
    $("div.head .tab-select .hexagon:nth-child(" + comselected + ")").addClass("selected");
    updateCOM("r");
    console.log(comselected);
});



rightScreenToolHex.on("click", function(){
    comselected += 1;
    if (limitComSelected()) {
        $(this).addClass("hide")
        nextButtonRight.addClass("hide");
    }
    nextButtonLeft.removeClass("hide");
    leftScreenToolHex.removeClass("hide");
    
    tabSelectHexagon.removeClass("selected");
    $("div.head .tab-select .hexagon:nth-child(" + comselected + ")").addClass("selected");
    updateCOM("r");
    console.log(comselected);
})

leftScreenToolHex.on("click", function(){
    comselected -= 1;
    if (limitComSelected()) {
        $(this).addClass("hide")
        nextButtonLeft.addClass("hide");
    }
    nextButtonRight.removeClass("hide")
    rightScreenToolHex.removeClass("hide");

    
    tabSelectHexagon.removeClass("selected");
    $("div.head .tab-select .hexagon:nth-child(" + comselected + ")").addClass("selected");
    updateCOM("l");
    console.log(comselected);
})

docu.on("scroll", function(){
    if (docu.scrollTop() > 10) {
        screenTool.addClass("vis");
        divHead.addClass("scrolled");
        header.removeClass("slided-up");
    }else{
        screenTool.removeClass("vis");
        divHead.removeClass("scrolled");
        header.addClass("slided-up");
    }
});

let pressedX = false;

if (NavWid > 640) {
    $("div.head .content .com .video .vd").click(function(){
        if ($(this).parent().parent().index() == comselected-1) {
            if (!pressedX){
                $(this).parent().addClass("pstate");
            }else {
                pressedX = false;
            }
        }
    });
    $("div.head .content .com .video .vd .X").click(function(){
        $(this).parent().parent().removeClass("pstate");
        pressedX = true;
    });
}else {
    $("div.head .content .com .video .vd").click(function(){
        var vd = $(this);
        var win = window.open(vd.find("iframe").attr("src"), "_blank");
        if (win) {
            win.focus();
        } else {
            alert("Please allow popups for this website");
        }
    });
}

function updateCOM(going){
    removeAllSelected();
    console.log(comselected)
    $("div.head .content .com:nth-child(" + comselected + ")").addClass("selected");
    
    setTimeout(() => {
        // Animate insides of .com according to going left or going right
        $("div.head .content .com.selected").removeClass("selected").addClass("selected" + going);
        // Animate the .content to a left of comselected * 100%
        divHeadContent.animate({
            left: -((comselected-1)*100)+ "%"
        }, 500, $.bez([0.22, 0.61, 0.35, 1]));
    }, 250);
    // Rotates the spinner
    if (going == "r"){
        spinnerWrapperHexagon.animate(
            { deg: "+=360" },
            {
            duration: 700,
            step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' }); 
            }
            }
        );
    }else{
        spinnerWrapperHexagon.animate(
            { deg: "-=360" },
            {
            duration: 700,
            step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' }); 
            }
            }
        );
    }
    // Change the Spinner text according to the committee
    $('div.head .spinner > span').animate({
        opacity: 0
    }, 250, "linear", function() {
        $('div.head .spinner > span').html(spinnercomtxt[comselected-1]);
      })
    $('div.head .spinner > span').animate({
        opacity: 1
    }, 1)

    // Change the content of the page to the selected committee's content
    committeeContentDiv.find("*").removeClass("come-in");
    committeeContentDiv.removeClass("selected");
    committeeContentDiv.eq(comselected-1).addClass("selected");

    // Update the screen tool
    $(".screen-tool.vis p").text(committeesInOrder[comselected-1]);
    if ($(".screen-tool.vis p").hasClass("unshown")){
        $(".screen-tool.vis p").removeClass("unshown");
        setTimeout(() => {
            $(".screen-tool.vis p").addClass("unshown");
        }, 1000);
    }else {
        $(".screen-tool.vis p").removeClass("unshown");
    }
}

function removeAllSelected(){
    // Close any video open
    contentComVid.removeClass("pstate");

    contentCom.removeClass("selected");
    contentCom.removeClass("selectedl");
    contentCom.removeClass("selectedr");
}

function limitComSelected(){
    if (comselected > comamnt) {
        comselected = comamnt;
        return true;
    }
    if (comselected < 1) {
        comselected = 1;
        return true;
    }
    if (comselected + 1 > comamnt || comselected - 1 < 1) {
        return true;
    }
    return false;
}

header.hover(
    function() {
      $( this ).removeClass("slided-up");
    }, function() {
        if (docu.scrollTop() <= 10) {
            $( this ).addClass("slided-up");
        }
    }
);


if (NavWid <= 1100) {
    $("div.head .content .com:nth-child(5) .heading .top h1").text("   crisis");
    $("div.head .content .com:nth-child(6) .heading .top h1").text("   crisis");
}
if (NavWid <= 480) {
    $("div.head .content .com:nth-child(5) .heading .top h1").text("   c");
    $("div.head .content .com:nth-child(6) .heading .top h1").text("   c");
    $("div.head .content .com:nth-child(3) .heading .top h1").text("nhrc");
    $("div.head .content .com:nth-child(4) .heading .top h1").text("nsc");
    $("div.head .content .com:nth-child(3) .heading .top h1").prepend("<br>");
    $("div.head .content .com:nth-child(4) .heading .top h1").prepend("<br>");
}