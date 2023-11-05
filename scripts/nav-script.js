const NavWid = window.screen.width;
const NavHei = window.screen.height;
const nav = $(".nav");
const navLiA = $(".nav .nav-container > ul > li > a");
const backbtn = $(".nav .nav-container > ul > li .back a");


console.log(window.screen.width)

if (NavWid <= 635) {
    if (NavWid > 540){
        $(".nav .nav-container > ul > li:nth-child(2) > a").text("Comm.");
        $(".nav .nav-container > ul > li:nth-child(5) > a").text("Conf.");
    }
    
    nav.on("click", function(){
        $("header").toggleClass("mobopen");
        if ($("header").hasClass("mobopen")){
            nav.removeClass("selection");
            $(".nav .nav-container > ul > li.navselection").removeClass("navselection");
        }
    });

    navLiA.on("click", function(e){
        e.stopPropagation();
        nav.addClass("selection");
        $(this).parent().addClass("navselection");
    });

    backbtn.on("click", function(e){
        e.stopPropagation();
        nav.removeClass("selection");
        $(this).parent().parent().parent().removeClass("navselection");
    })
} 

