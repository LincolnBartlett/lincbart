$(document).ready(function() {
	"use strict";
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

	function romeNum(num) {
		if (num <= 3000) {
			var m;
			var M = "M";
			var d;
			var D = "D";
			var c;
			var C = "C";
			var l;
			var L = "L";
			var x;
			var X = "X";
			var v;
			var V = "V";
			var i;
			var I = "I";
			var numArr = [];
			m = Math.floor(num / 1000);
			numArr.push(M.repeat(m));
			m *= 1000;
			num -= m;
			d = Math.floor(num / 500);
			if (num / 900 >= 1 && num / 900 <= 1.11) {
				numArr.push("CM");
				num -= 900;
			} else {
				numArr.push(D.repeat(d));
				d *= 500;
				num -= d;
			}
			c = Math.floor(num / 100);
			if (num / 100 >= 0.9 && num / 100 <= 0.99) {
				numArr.push("XC");
				c *= 10;
				num -= c;
			} else {
				numArr.push(C.repeat(c));
				c *= 100;
				num -= c;
				if (num / 100 >= 0.9 && num / 100 <= 0.99) {
					numArr.push("XC");
				}
			}
			l = Math.floor(num / 50);
			if (num / 50 > 1.8) {
				num -= 90;
			} else {
				numArr.push(L.repeat(l));
				l *= 50;
				num -= l;
			}
			x = Math.floor(num / 10);
			if (num / 10 >= 4 && num / 10 <= 4.9) {
				numArr.push("XL");
				x *= 10;
				num -= x;
			} else {
				numArr.push(X.repeat(x));
				x *= 10;
				num -= x;
			}
			v = Math.floor(num / 5);
			if (num / 5 == 1.8) {
				numArr.push("IX");
				num *= 0;
			} else {
				numArr.push(V.repeat(v));
				v *= 5;
				num -= v;
			}
			i = Math.floor(num / 1);
			if (i == 4) {
				numArr.push("IV");
			} else {
				numArr.push(I.repeat(i));
			}
		} else {
			$("#warnTxt").html("Error: input must be a whole number below 3,000.");
			return "Error";
		}
		$("#warnTxt").html(" ");
		return numArr.join("");
	}
	$("#inputBtn").click(function() {
		var numOrg = $("#inputFrm").val();
		var numRom = romeNum(numOrg);
		$("#output").text(numRom);

		function list() {
			var txt = $("<li></li>").text(numOrg + " is " + numRom);
			var txt2 = document.createElement("li");
			txt2.innerHTML = "";
			$("#oldOutput").append(txt);
		}
		list();
	});
});