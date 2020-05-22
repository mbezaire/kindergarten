d3.csv("data/concat.csv").then(function(data) {
	for (d = 0; d < data.length; d++) {
		if (data[d].Day.length > 0 && data[d].Subject.length > 0) {
			if (data[d].Action == "makeYouTube") {
				task2add = makeYouTube(data[d].Link)
			} else if (data[d].Action == "HTML") {
				task2add = data[d].Link
			} else if (data[d].Action == "makeVideo") {
				task2add = makeVideo(data[d].Link)
			} else if (data[d].Action == "makeVideoDesc") {
				task2add = makeVideoDesc(data[d].Desc,data[d].Link)
			} else if (data[d].Action == "makeWorksheet") {
				task2add = makeWorksheet(data[d].Desc,data[d].Link)
			} else if (data[d].Action == "makeSlidesDesc") {
				task2add = makeSlidesDesc(data[d].Desc,data[d].Link)
			} else if (data[d].Action == "makeYouTubeDesc") {
				task2add = makeYouTubeDesc(data[d].Desc,data[d].Link)
			} else if (data[d].Action == "makeSlides") {
				task2add = makeSlides(data[d].Link, "the teacher")
			} else {
				task2add = [data[d].Link]
			}

			if (typeof window.concatend == 'undefined' || window.concatend.hasOwnProperty(data[d].Day) == 0) {
				window.concatend[data[d].Day] = {};
				window.concatend[data[d].Day][data[d].Subject] = [task2add]; 
			} else if (window.concatend[data[d].Day].hasOwnProperty(data[d].Subject) == 0) {
				window.concatend[data[d].Day][data[d].Subject] = [task2add]; 
			} else {
				window.concatend[data[d].Day][data[d].Subject].push([task2add]); 
			}
		}
	}
});


d3.csv("data/poem.csv").then(function(data) {
	window.poemText = "<b><u>";
	window.poemText += data[0].Text + "</u></b><br/><br/>";
	for (d = 1; d < data.length; d++) {
		if (data[d].Text.length > 0) {
			window.poemText += data[d].Text + "<br/>";
		}
	}
});


function getManual(weekday, subj) {
	if (typeof window.manual === 'undefined' || window.manual === null || window.manual.hasOwnProperty(weekday)===false || window.manual[weekday].hasOwnProperty(subj)===false  || window.manual[weekday][subj]=== null) {
		console.log("manual = "+window.manual+" weekday prop: "+window.manual.hasOwnProperty(weekday))
		return content = [];
	 } else {
	return content = window.manual[weekday][subj];
}
}