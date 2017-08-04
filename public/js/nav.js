$(document).ready(function() {
var iScrollPos = 500;
    $(window).scroll(function () {
        var iCurScrollPos = $(this).scrollTop();
            if (iCurScrollPos > iScrollPos) {
                $("#nav").fadeOut("slow");
            } else {
                $("#nav").fadeIn("slow");
                
        
    }
    });
});