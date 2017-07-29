$(document).ready(function() {
	$("#btm").hide();
	$("#ftr").hide();
	$("#resetBtn").hide();
	//enables contact btn in Nav
	$("#contactBtn").click(function() {
		$("#btm").fadeIn("slow");
		$("#ftr").fadeIn("slow");
		$("html,body").animate({
			scrollTop: $("#ftr").offset().top
		}, 1000);
	});
	$("#sesSli").change(function() {
		$("#sesTim").html($("#sesSli").val());
	});
	$("#breSli").change(function() {
		$("#breTim").html($("#breSli").val());
	});
	var startBtnBoo = false;
	var resetBtnBoo = false;
	$("#startBtn").click(function() {
		$("#startBtn").hide();
		$("#resetBtn").fadeIn("slow");
		if (startBtnBoo === false) {
			startBtnBoo = true;
			var sesCount = ($("#sesSli").val() * 60);
			var breCount = ($("#breSli").val() * 60);
			var sesCounter = setInterval(sesTimer, 1000);
			$("disp").html($("#sesSli").val() + ":00");
			$("#dispBre").html($("#breSli").val() + ":00");

			function sesTimer() {
				sesCount -= 1;
				if (resetBtnBoo === true) {
					clearInterval(sesCounter);
					sesCount = ($("#sesSli").val() * 60);
					resetBtnBoo = false;
				}
				if (sesCount === 0) {
					clearInterval(sesCounter);
					$("#timeUp")[0].play();
					sesCount = ($("#sesSli").val() * 60);
					var breCounter = setInterval(breTimer, 1000);

					function breTimer() {
						breCount -= 1;
						if (resetBtnBoo === true) {
							clearInterval(breCounter);
							breCount = ($("#breSli").val() * 60);
							resetBtnBoo = false;
						}
						if (breCount === 0) {
							clearInterval(breCounter);
							$("#timeUp2")[0].play();
							breCount = ($("#breSli").val() * 60);
							sesCounter = setInterval(sesTimer, 1000);
						}
						if (breCount % 60 >= 10) {
							$("#dispBre").html(Math.floor(breCount / 60) + ":" + breCount % 60);
						} else {
							$("#dispBre").html(Math.floor(breCount / 60) + ":" + "0" + breCount % 60);
						}
					}
				}
				if (sesCount % 60 >= 10) {
					$("#disp").html(Math.floor(sesCount / 60) + ":" + sesCount % 60);
				} else {
					$("#disp").html(Math.floor(sesCount / 60) + ":" + "0" + sesCount % 60);
				}
			}
		}
	});
	$("#resetBtn").click(function() {
		$("#resetBtn").hide();
		$("#startBtn").fadeIn("slow");
		if (startBtnBoo === true) {
			resetBtnBoo = true;
			startBtnBoo = false;
		} else {
			resetBtnBoo = false;
			startBtnBoo = false;
		}
	});
});