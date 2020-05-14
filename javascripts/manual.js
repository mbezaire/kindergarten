window.mmlinks = {"Monday": "", "Tuesday":"", "Wednesday": "", "Thursday": "", "Friday": ""};
window.readlinks = {"Monday": "", "Tuesday":"", "Wednesday": "", "Thursday": "", "Friday": ""};


d3.csv("data/morning.csv").then(function(data) {
	for (d = 0; d < data.length; d++) {
		if (data[d].Day.length > 0) {
			if (data[d].Type =="Morning Meeting") {
			window.mmlinks[data[d].Day] = data[d].Link;
		} else {
			window.readlinks[data[d].Day] = data[d].Link;
		}
		}
	}
});

d3.csv("data/concat.csv").then(function(data) {
	for (d = 0; d < data.length; d++) {
		if (data[d].Day.length > 0 && data[d].Subject.length > 0) {
			if (data[d].Action == "makeYouTube") {
				task2add = makeYouTube(data[d].Link)
			} else if (data[d].Action == "HTML") {
				task2add = data[d].Link
			} else if (data[d].Action == "makeVideo") {
				task2add = makeVideo(data[d].Link)
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
window.artLinks = {};
window.musicLinks = {};
window.peLinks = {};
d3.csv("data/art.csv").then(function(data) {
	for (d = 0; d < data.length; d++) {
		if (data[d].Day.length > 0) {
			window.artLinks[data[d].Day] = data[d].Link;
		}
	}
});

d3.csv("data/music.csv").then(function(data) {
	for (d = 0; d < data.length; d++) {
		if (data[d].Day.length > 0) {
			window.musicLinks[data[d].Day] = data[d].Link;
		}
	}
});

d3.csv("data/pe.csv").then(function(data) {
	for (d = 0; d < data.length; d++) {
		if (data[d].Day.length > 0) {
			window.peLinks[data[d].Day] = data[d].Link;
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


d3.csv("data/poemvideo.csv").then(function(data) {
	for (d = 0; d < data.length; d++) {
		if (data[d].Link.length > 0) {
			var poemURL = data[d].Link
			if (data[d].Action == "makeYouTube") {
				window.poemVideo = makeYouTube(data[d].Link)
			} else if (data[d].Action == "HTML") {
				window.poemVideo = data[d].Link
			} else if (data[d].Action == "makeVideo") {
				window.poemVideo = makeVideo(data[d].Link)
			} else if (data[d].Action == "makeSlides") {
				window.poemVideo = makeSlides(data[d].Link, "the teacher")
			} else {
				window.poemVideo = [data[d].Link]
			}
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