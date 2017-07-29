$(document).ready(function() {
	var quote = {	
		//0 : {quote: "test", name: "nametest"},
		0 : {quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
			name: "Alan Turing"},
		
		1 : {quote: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.",
			name: "Tim Berners-Lee"},
		
		2 : {quote: "Computers are useless. They can only give you answers.",
			name: "Pablo Picasso"},
		
		3 : {quote: "That's what's cool about working with computers. They don't argue, they remember everything, and they don't drink all your beer.",
			name: "Paul Leary"},
		
		4 : {quote: "Never trust a computer you can't throw out a window.",
			name: "Steve Wozniak"},
		
		5 : {quote: "The Internet? Is that thing still around?",
			name: "Homer Simpson"},
		
		6 : {quote: "The function of good software is to make the complex appear to be simple.",
			name: "Grady Booch"},
		
		7 : {quote: "Controlling complexity is the essence of computer programming.",
			name: "Brian Kernigan"},
		
		8 : {quote: "It ain’t what you don’t know that gets you into trouble. It’s what you know for sure that just ain’t so.",
			name: "Mark Twain"},
		
		9 : {quote: "I do not fear computers. I fear the lack of them.",
			name: "Isaac Asimov"},
		
		10 : {quote: "A good programmer is someone who always looks both ways before crossing a one-way street.",
			name: "Doug Linder"},
		
		11 : {quote: "Men are only as good as their technical development allows them to be",
			name: "George Orwell"},
	};
	
	var srtquo = Math.floor(Math.random() * 12);
	
	$("#quotxt").html("\"" + quote[srtquo].quote + "\"");
	$("#quonam").html(quote[srtquo].name );
	
	
	var numdump = [];
	$("#quobtn").click(function(){
		
		var rnum = Math.floor(Math.random() * 12);
		var tf = false;
		if(numdump.length !== 11){
			while(tf === false){
				
				if (numdump.indexOf(rnum) === -1){
					numdump.push(rnum);
					tf = true;
				}
				
			rnum = Math.floor(Math.random() * 12);
			}
		}else{
			numdump= [];
			rnum = Math.floor(Math.random() * 12);
			numdump.push(rnum);
		}
		
		$("#quotxt").html("\"" + quote[rnum].quote + "\"");
		$("#quonam").html(quote[rnum].name );
	});
	
	
});