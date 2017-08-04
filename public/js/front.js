$(document).ready(function() {
    $("#javPan").fadeOut();
    var bool= false;
	$("#javBtn").click(function() {
        if (bool === false){
            $("#javPan").fadeIn("slow"); 
            bool = true; 
        }else{
            $("#javPan").fadeOut("slow");
            bool = false;
        }   
	});
});