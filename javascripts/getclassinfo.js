
var currentDay = 0

function gotoClass() {
	window.open('https://classroom.google.com', '_blank');
}

var myVideo = document.getElementById("video1");

var myTeacher = document.getElementById("video1");

function ToggleDone(buttonid, i, weekday, subjnum) {
	mybutton = document.getElementById(buttonid)
	if (mybutton.done == "1") {
		savework[weekday][schedule[weekday][subjnum]][i] = 0
		mybutton.done = "0";
		mybutton.src = "./Todo.png";
	} else {
		savework[weekday][schedule[weekday][subjnum]][i] = 1
		mybutton.done = "1";
		mybutton.src = "./Done.png";
	}
	ToggleStatus(weekday)
	SaveUserProgress()
}


function SaveUserProgress() {
	console.log("Saving user progress")
	localStorage.setItem('classprogress', JSON.stringify(savework));
	localStorage.setItem('lastCheckDate', JSON.stringify(new Date()));
}

function ToggleStatus(weekday) {
	// for subjects in weekday,
	for (var subj in savework[weekday]) {
		var element = document. getElementById("sched_" + subj.substring(0, 3)); 
		if (typeof(element) == 'undefined' || element == null) { 
		console.log("No element for " + "sched_" + subj.substring(0, 3)) // Exists. }
	} else {
		// if all are 1, set subj done; chk subj box done
		if (savework[weekday][subj].reduce((a, b) => a + b, 0) == savework[weekday][subj].length && savework[weekday][subj].length > 0) {
			document.getElementById("sched_" + subj.substring(0, 3)).src = './Done.png'
		} else {
			document.getElementById("sched_" + subj.substring(0, 3)).src = './Todo.png'
		}
	}
	}
}

function SelectExtra(rowId, indicatorId, subjnum) {
	// set all other subjects to yellow background
	extras = ["Leftover Work", "Fun-Dos"]
	for (const row of document.getElementById("tableSubjects").rows) {
		row.style = 'height:100%;'
	}
	for (const row of document.getElementById("tableExtra").rows) {
		row.style = 'height:100%;user-drag: none;-webkit-user-drag: none;cursor:pointer'
	}

	// set this one to orange background
	document.getElementById(rowId).style = 'height:100%;background-color: orange;border-color:orange;'

	loadExtraTable(extras[subjnum])
}

function SelectSubject(rowId, indicatorId, subjnum) {
	// set all other subjects to yellow background

	for (const row of document.getElementById("tableSubjects").rows) {
		row.style = 'height:100%;'
	}
	for (const row of document.getElementById("tableExtra").rows) {
		row.style = 'height:100%;user-drag: none;-webkit-user-drag: none;cursor:pointer'
	}

	// set this one to orange background
	document.getElementById(rowId).style = 'height:100%;background-color: orange;border-color:orange;'
	document.getElementById("curSubject").innerHTML = schedule[dayWeek[window.currentDate.getDay()]][subjnum]
	loadSubjTable(dayWeek[window.currentDate.getDay()], subjnum)
}

var chktube = 0


function makePoem(weekday) {
	return poem = ['<p style="font-family:Candara, \'Comic Sans MS\';line-height: 1.5;text-align:center;font-size:120%">' + window.poemText + '</p><br/><p>Here is today\'s work for our poem of the week:<br/>' + window.poemInst[weekday] + '</p>']
}


function loadSubjTable(weekday, subjnum) {
	preface1 = '<tr style="width:100%;height:100%;"><td style="width:10%"><input type="image" ';
	preface2 = ' alt="[_]" src="./Todo.png"  done="0" style="user-drag: none;-webkit-user-drag: none;cursor:pointer" /></td><td style="width:90%">';
	closing = '</td></tr>'

	if (window.chktube == 1) {
		window.hideYTActivated = false;
	}
	window.chktube = 0

	taskarray = [];

	if (schedule[weekday][subjnum] == "Poem of the Week") {
		taskarray = makePoem(weekday)
		taskarray=taskarray.concat(getManual(weekday, schedule[weekday][subjnum]))
	}
	
	if (schedule[weekday][subjnum] == "Small Group" || schedule[weekday][subjnum] == "Class Meeting") {
		if (schedule[weekday][subjnum] == "Class Meeting") {
			setTime = '12:00 pm'
			setLink = 'https://'+'us'+'0'+'4'+'web'+'.'+'z'+'o'+'o'+'m'+'.'+'us'+'/'+'j'+'/'+window.settle[1]
		} else {
			setTime = window.smallGroupMeetingTime
			setLink = 'https://'+'us'+'0'+'4'+'web'+'.'+'z'+'o'+'o'+'m'+'.'+'us'+'/'+'j'+'/'+window.settle[0]
		}
		taskarray = [makeSet(schedule[weekday][subjnum], setTime, setLink)]
	}
	
	if (schedule[weekday][subjnum].indexOf("Tass")>-1) {
		taskarray = ['<p>At the time for your meeting with ' + window.helpLinkSign[0] + ', <a href="' + window.helpLinkSign[1] + '" target="_blank">click here to join the Google Meet</a>.<br/><br/>Forgot your meeting time? <a href="' + window.helpLinkSign[2] + '" target="_blank">Check the SignUpGenius schedule here.</a></p>'];
	}


	if (taskarray.length == 0) {
		taskarray = getManual(weekday, schedule[weekday][subjnum])
	}

	if (taskarray.length == 0 && window.assignment[weekday].hasOwnProperty(schedule[weekday][subjnum]) && window.assignment[weekday][schedule[weekday][subjnum]].length>0) {
		taskarray=taskarray.concat(window.assignment[weekday][schedule[weekday][subjnum]])
	}
	
	if (typeof window.concatend !== 'undefined' && window.concatend.hasOwnProperty(weekday) && window.concatend[weekday].hasOwnProperty(schedule[weekday][subjnum]) && window.concatend[weekday][schedule[weekday][subjnum]].length>0) {
		taskarray=taskarray.concat(window.concatend[weekday][schedule[weekday][subjnum]])
	}

	if (taskarray.length == 0) {
		taskarray = ["No tasks for this activity! :)"]
	}


	if (savework[weekday][schedule[weekday][subjnum]] == null || savework[weekday][schedule[weekday][subjnum]].length < taskarray.length) {
		savework[weekday][schedule[weekday][subjnum]] = Array(taskarray.length).fill(0);
	}

	tasktable = ""
	for (i = 0; i < taskarray.length; i++) {
		taskstatus = 0
		taskimage = "Todo"
		if (savework[weekday][schedule[weekday][subjnum]][i] == 1) {
			taskstatus = 1
			taskimage = "Done"

		}

		if (weekday != "Monday" && schedule[weekday][subjnum] == "Poem of the Week" && i == 1) {
			tasktable += preface1 + 'id="tasktodo_' + i + '" onclick="ToggleDone(\'tasktodo_' + i + '\',' + i + ',\'' + weekday + '\',' + subjnum + ')"  ' + ' alt="[_]" src="images/Done.png"  done="1"/></td><td style="width:90%">' + taskarray[i] + closing
			savework[weekday][schedule[weekday][subjnum]][taskarray.length - 1] = 1
		} else {
			tasktable += preface1 + 'id="tasktodo_' + i + '" onclick="ToggleDone(\'tasktodo_' + i + '\',' + i + ',\'' + weekday + '\',' + subjnum + ')"  ' + ' alt="[_]" src="images/' + taskimage + '.png"  done="' + taskstatus + '"/></td><td style="width:90%">' + taskarray[i] + closing
		}
	}



	document.getElementById("instructionsTable").innerHTML = tasktable
	document.getElementById("scrollme").scrollTop = 0;



var inputs = document.getElementsByTagName('iframe');

for(var i = 0; i < inputs.length; i++) {

//resizeIFrameToFitContent( inputs[i] )
}

	if (window.chktube == 1) {

		coverUtube()
	}
}

function loadExtraTable(extraType) {
	window.youtubeVideoGone = true
	document.getElementById("curSubject").innerHTML = extraType
	if (extraType == "Leftover Work") {
		document.getElementById("instructionsTable").innerHTML = '<p>Mom is still working on this one! :)</p>'
	} else {
		document.getElementById("instructionsTable").innerHTML = '<a href="' + window.settle[2] + '?authuser=' + window.email + '" target="_blank">Click here to check out all the Fun-Dos!</a>'
	}
}


var poemInst = {
	"Monday": "<ul><li>Read poem while pointing to each word</li><li>Discuss what it means and visualize it</li><li>Echo each word one at a time</li><li>Echo each line at a time</li><li>Read the poem entirely again</li></ul><br/> Watch the video below to get started:",
	"Tuesday": "<ul><li>Read poem while pointing to each word</li><li>Come up with movements that match the words</li><li>Sing/Recite and do movements while reading the poem again</li></ul><br/> Review the video below if you need to:",
	"Wednesday": "<ul><li>Read poem while pointing to each word</li><li>Ask student to either:  <li>point to each trick word</li><li>find a word with 1 syllable or 2 syllables</li><li>find words that rhyme</li><li>find fair CVC words</li></ul></li><li>Sing/Recite and do the movements</li></ul><br/> Review the video below if you need to:",
	"Thursday": "<ul><li>Read poem while pointing to each word</li><li>Sing or read the poem using different voices. Our favorites include:  rock star, opera singer, baby, animal sound, whisper, robot, no words, hum, etc.</li></ul><br/> Review the video below if you need to:",
	"Friday": "<ul><li>Read poem while pointing to each word</li><li>Visualize images of the poem</li><li>Draw an illustration that matches the words</li></ul><br/> Review the video below if you need to:"
}

const dayends = ["st", "nd", "rd"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var current_datetime = new Date()
var currentDay = Math.max(Math.min(current_datetime.getDay() - 1, 4), 0) // reset day to range 0-4 where 0 means Monday, 4 means Friday
correctFactor = current_datetime.getDay() - currentDay
var baseDay = new Date(new Date().setDate(new Date().getDate() - currentDay - correctFactor + 1)) // The Monday of the week
var refreshDay = new Date(new Date().setDate(new Date().getDate() - currentDay - correctFactor)) // The Sunday of the week

var currentDate = new Date(baseDay.getTime()); // Revised attempt to get current date
currentDate.setDate(baseDay.getDate() + currentDay);



function zerofill(number, length) {
	var result = number.toString();
	var pad = length - result.length;

	while (pad > 0) {
		result = '0' + result;
		pad--;
	}

	return result;
}

function Navupdate() {
	if (window.currentDay > 0) {
		document.getElementById("Navleft").style.display = 'inline-block';
	} else {
		document.getElementById("Navleft").style.display = 'none';
	}
	if (window.currentDay < 4) {
		document.getElementById("Navright").style.display = 'inline-block';
	} else {
		document.getElementById("Navright").style.display = 'none';
	}

    window.currentDate = new Date(baseDay.getTime()); // Revised attempt to get current date
    window.currentDate.setDate(baseDay.getDate() + currentDay);

	if (window.currentDate.getDate() < 4 || (window.currentDate.getDate() > 20 && window.currentDate.getDate() % 10 < 4 && window.currentDate.getDate() % 10 != 0)) {
		dayEnd = dayends[(window.currentDate.getDate() % 10) - 1];
	} else {
		dayEnd = 'th';
	}



	document.getElementById("dayname").innerHTML = dayWeek[window.currentDate.getDay()] + ", <nobr>" + months[window.currentDate.getMonth()] + " " + window.currentDate.getDate() + dayEnd + "</nobr>";

	myinner = ""
	for (i = 0; i < window.schedule[dayWeek[window.currentDate.getDay()]].length; i++) {
		myinner = myinner + "<tr style='height:100%;cursor:pointer;' id='row_" + zerofill(i, 2) + "'  onclick='SelectSubject(\"row_" + zerofill(i, 2) + "\",\"sched_" + window.schedule[dayWeek[window.currentDate.getDay()]][i].substring(0, 3) + "\"," + i + ")'><td style='height:100%;text-align:right;cursor:pointer;'><img src='images/Todo.png' alt='[_]' style='height:40%;user-drag: none;-webkit-user-drag: none;cursor:pointer;' id='sched_" + window.schedule[dayWeek[window.currentDate.getDay()]][i].substring(0, 3) + "'></td><td style='cursor:pointer;'>" + window.schedule[dayWeek[window.currentDate.getDay()]][i] + "</td></tr>"
	}
	myinner = myinner + "</td></tr>";

	document.getElementById("tableSubjects").innerHTML = myinner;
	ToggleStatus(dayWeek[window.currentDate.getDay()])
	SelectSubject("row_00", "sched_" + window.schedule[dayWeek[window.currentDate.getDay()]][0].substring(0, 3), 0)
	calcHeight = Math.max(650,140+document.getElementById("tableSubjects").offsetHeight + document.getElementById("tableExtra").offsetHeight)
	document.getElementById('tableHolder').setAttribute("style","background-color:#FFFF00;height:"+calcHeight+"px");
	document.getElementById('tableHolder').style.height=calcHeight+"px";
	document.getElementById('scrollme').setAttribute("style","overflow-y: scroll;height:"+(calcHeight-86)+"px");
	document.getElementById('scrollme').style.height=(calcHeight-86)+"px";
}

function Navleft() {
	if (window.currentDay > 0) {
		window.currentDay -= 1;
	}
	Navupdate()
}



function Annleft(ann) {
	if (window.currentAnn[ann] > 0) {
		window.currentAnn[ann] -= 1;
	}
	Annupdate()
}

function Annright(ann) {
	if (window.currentAnn[ann] < window.messages[window.announcers[ann]].length - 1) {
		window.currentAnn[ann] += 1;
	}
	Annupdate()
}


function Annupdate() {
	for (ann in announcers) {
		if (window.currentAnn[ann]!=null) {
			document.getElementById("anndiv" + ann).class="announce"
			document.getElementById("anndiv" + ann).innerHTML = window.messages[announcers[ann]][window.currentAnn[ann]]
	
			if (window.currentAnn[ann] >= (window.messages[window.announcers[ann]].length - 1)) {
				document.getElementById("Annright" + ann).style = "line-height:2;width:10%;vertical-align:middle;visibility: hidden;"
			} else {
				document.getElementById("Annright" + ann).style = "line-height:2;width:10%;vertical-align:middle;"
			}
	
			if (window.currentAnn[ann] < 1) {
				document.getElementById("Annleft" + ann).style = "line-height:2;width:10%;vertical-align:middle;visibility: hidden;"
			} else {
				document.getElementById("Annleft" + ann).style = "line-height:2;width:10%;vertical-align:middle;"
			}
		}
	}
}

function Navright() {
	if (window.currentDay < 4) {
		window.currentDay += 1;
	}
	Navupdate()
}

function PlayClip(clip2play) {}



function newthisweek(day, topicid) {
	dayname = ""
	month = ""
	day = ""
	work = ""
	return thisweek = {
		"dayname": dayname,
		"month": month,
		"day": day,
		"topicid": topicid,
		"work": work
	}
}