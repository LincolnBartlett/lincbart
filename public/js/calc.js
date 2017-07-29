$(document).ready(function() {
	$("#btm").hide();
	$("#ftr").hide();
	//enables contact btn in Nav
	$("#contactBtn").click(function() {
		$("#btm").fadeIn("slow");
		$("#ftr").fadeIn("slow");
		$("html,body").animate({
			scrollTop: $("#ftr").offset().top
		}, 1000);
	});
	var arrSto = [];
	var numFir;
	var numSec;
	var func;
	var ans;
	var booEqu = false;
	//input buttons
	$("#zerBtn").click(function() {
		arrSto.push(0);
		$("#output").html(arrSto.join(""));
	});
	$("#thrBtn").click(function() {
		arrSto.push(3);
		$("#output").html(arrSto.join(""));
	});
	$("#twoBtn").click(function() {
		arrSto.push(2);
		$("#output").html(arrSto.join(""));
	});
	$("#oneBtn").click(function() {
		arrSto.push(1);
		$("#output").html(arrSto.join(""));
	});
	$("#sixBtn").click(function() {
		arrSto.push(6);
		$("#output").html(arrSto.join(""));
	});
	$("#fivBtn").click(function() {
		arrSto.push(5);
		$("#output").html(arrSto.join(""));
	});
	$("#forBtn").click(function() {
		arrSto.push(4);
		$("#output").html(arrSto.join(""));
	});
	$("#ninBtn").click(function() {
		arrSto.push(9);
		$("#output").html(arrSto.join(""));
	});
	$("#eigBtn").click(function() {
		arrSto.push(8);
		$("#output").html(arrSto.join(""));
	});
	$("#sevBtn").click(function() {
		arrSto.push(7);
		$("#output").html(arrSto.join(""));
	});
	$("#decBtn").click(function() {
		if (arrSto.indexOf(".") <= 0) {
			arrSto.push(".");
			$("#output").html(arrSto.join(""));
		}
	});
	//math function
	var calc = function calc(a, b) {
		switch (func) {
			case "/":
				ans = (Number(a) / Number(b));
				break;
			case "+":
				ans = (Number(a) + Number(b));
				break;
			case "-":
				ans = (Number(a) - Number(b));
				break;
			case "x":
				ans = (Number(a) * Number(b));
				break;
		}
		return ans;
	};
	//function buttons
	//clear
	$("#cleBtn").click(function() {
		arrSto = [];
		$("#output").html(" ");
		$("#output2").html(" ");
		numFir = undefined;
		numSec = undefined;
		func = undefined;
		booEqu = false;
	});
	//negative
	$("#negBtn").click(function() {
		if (booEqu === false) {
			if (arrSto[0] !== "-") {
				arrSto.unshift("-");
				$("#output").html(arrSto.join(""));
			} else {
				arrSto.shift();
				$("#output").html(arrSto.join(""));
			}
		} else {
			numSec *= -1;
			$("#output").html(numSec);
		}
	});
	//equal
	$("#equBtn").click(function() {
		var x = arrSto.join("");
		var y = calc(numSec, x);
		$("#output").html(y);
		$("#output2").html(numSec + " " + func + " " + x + " = " + y);
		numSec = y;
		arrSto = [];
		booEqu = true;
	});
	//undo
	$("#undoBtn").click(function() {
		arrSto.pop();
		$("#output").html(arrSto);
	});
	//math function buttons
	$("#divBtn").click(function() {
		if (booEqu === false) {
			if (numSec == undefined) {
				numSec = 1;
				func = "/";
				numFir = Number(arrSto.join(""));
				calc(numFir, numSec);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
				$("#output2").html(numFir);
			} else {
				func = "/";
				numFir = Number(arrSto.join(""));
				calc(numSec, numFir);
				$("#output2").html(numSec + " " + func + " " + numFir + " = " + ans);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
			}
		} else {
			func = "/";
			arrSto = [];
			$("#output").html(numSec);
			$("#output2").html(numSec);
			booEqu = false;
		}
	});
	$("#addBtn").click(function() {
		if (booEqu === false) {
			if (numSec == undefined) {
				numSec = 0;
				func = "+";
				numFir = Number(arrSto.join(""));
				calc(numSec, numFir);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
				$("#output2").html(numFir);
			} else {
				func = "+";
				numFir = Number(arrSto.join(""));
				calc(numSec, numFir);
				$("#output2").html(numSec + " " + func + " " + numFir + " = " + ans);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
			}
		} else {
			func = "+";
			arrSto = [];
			$("#output").html(numSec);
			$("#output2").html(numSec);
			booEqu = false;
		}
	});
	$("#minBtn").click(function() {
		if (booEqu === false) {
			if (numSec == undefined) {
				numSec = 0;
				func = "-";
				numFir = Number(arrSto.join(""));
				calc(numFir, numSec);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
				$("#output2").html(numFir);
			} else {
				func = "-";
				numFir = Number(arrSto.join(""));
				calc(numSec, numFir);
				$("#output2").html(numSec + " " + func + " " + numFir + " = " + ans);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
			}
		} else {
			func = "-";
			arrSto = [];
			$("#output").html(numSec);
			$("#output2").html(numSec);
			booEqu = false;
		}
	});
	$("#mulBtn").click(function() {
		if (booEqu === false) {
			if (numSec == undefined) {
				numSec = 1;
				func = "x";
				numFir = Number(arrSto.join(""));
				calc(numFir, numSec);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
				$("#output2").html(numFir);
			} else {
				func = "x";
				numFir = Number(arrSto.join(""));
				calc(numSec, numFir);
				$("#output2").html(numSec + " " + func + " " + numFir + " = " + ans);
				numSec = ans;
				arrSto = [];
				$("#output").html(ans);
			}
		} else {
			func = "x";
			arrSto = [];
			$("#output").html(numSec);
			$("#output2").html(numSec);
			booEqu = false;
		}
	});
});