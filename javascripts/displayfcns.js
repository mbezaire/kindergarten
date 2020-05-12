function makeYouTube(videoKey) { // other options after frameborder: <!-- allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen-->
	window.chktube = 1
	return video = '<div  style="position:relative;padding-top: 56.25%;"><div class="hytPlayerWrap"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/' + videoKey + '?rel=0&enablejsapi=1" frameborder="0" allowfullscreen id="currentyoutube"></iframe></div></div>'
}

function makeVideo(videoURL) {
	return video = '<iframe src="' + videoURL + '/preview" width="640" height="480" allowfullscreen="true"></iframe>'
}

function makeSlides(slideURL, teacherName) { 
	return slides = '<p>Follow along with ' + teacherName + ' in the slides below!</p><br/><iframe src="' + slideURL + '/embed?start=false&loop=false&delayms=3000" frameborder="0" width="700px" height="450px" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>' // <!-- width="960" height="569" -->
}

function makeSet(meetingType, meetingTime, setLink) {
	return meeting = '<p>At ' + meetingTime + ', you\'ll have a '+'Z'+'o'+'o'+'m'+' meeting for ' + meetingType + '! <a href="' + setLink + '" target="_blank">Click here to join the meeting when it is time to start.</a>'
}

function makePoem(weekday) {
	return poem = ['<p style="font-family:Candara, \'Comic Sans MS\';line-height: 1.5;text-align:center;font-size:120%">' + window.poemText + '</p><br/><p>Here is today\'s work for our poem of the week:<br/>' + window.poemInst[weekday] + '</p>', window.poemVideo]
}

function makeMeeting(mmLink, readLink) {
	idx = 0
	var video = new Array();
	video.push("<p>Good morning! ")
	if (mmLink != "") {
		video[0] = video[0].concat('Get started with our morning meeting:</p>' + makeVideo(mmLink) + '<br/><p>And next... </p>')
		idx += 1
		video.push("")
	}
	if (readLink.length>0) {
	video[idx] = video[idx].concat('<p>Let\'s read aloud:<br/>' + makeVideo(readLink) + '</p>')
} else {
	video[idx] = video[idx].concat('<p>No regular read-aloud today - would you like to read aloud with someone?</p>')
}
	return video
}


function getMath(Desc,youTubeLink,PSLink,HWLink) {
	return content = ['<p>'+Desc+'<br/>First, let\'s watch the video.</p>' + makeYouTube(youTubeLink), 'Next, do the problem set worksheet:<br/><a target="_blank" href="'+PSLink+'">Problem Set Worksheet</a>', 'Finally, do the homework worksheet:<br/><a target="_blank" href="'+HWLink+'">Homework Worksheet</a>'];	
}
