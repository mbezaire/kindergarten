var maxsubj = 0;
var currentDaySched = 0;
const dayWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function saveSchedule() {
	var table = document.getElementById("editsched")
	window.smallGroupMeetingTime = document.getElementById("SmallTime").value;
	localStorage.setItem('customschedule', JSON.stringify(window.customschedule));
	localStorage.setItem('smallGroupMeetingTime', JSON.stringify(window.smallGroupMeetingTime));


	var savework = {
		"Monday": [],
		"Tuesday": [],
		"Wednesday": [],
		"Thursday": [],
		"Friday": []
	}
	for (var day in savework) {
		for (var s in window.customschedule[day]) {
			savework[day][window.customschedule[day][s]] = [];
		}
	}
	localStorage.setItem('classprogress', JSON.stringify(savework));
	console.log("reached this point")
	window.close();
}

function resetSchedule() {
	window.customschedule = JSON.parse(localStorage.getItem('scheduleBase'));
	subjectAdd()
}

function revertSchedule() {
	window.customschedule = JSON.parse(localStorage.getItem('customschedule'));
	window.smallGroupMeetingTime = JSON.parse(localStorage.getItem('smallGroupMeetingTime'));
	subjectAdd()
}

// Load subjects in <table>
function subjectAdd() {
	// First check if a <tbody> tag exists, add one if not
	if ($("#editsched tbody").length == 0) {
		$("#editsched").append("<tbody></tbody>");
	}
	rowid = 0
	rownum = rowid + 1
	$("#editsched tbody").empty()

	for (subj in window.customschedule[dayWeek[window.currentDaySched + 1]]) {
		rowstuff = makerow(rowid, rownum, window.customschedule[dayWeek[window.currentDaySched + 1]][subj], "20 minutes")
			// Append product to the table
		$("#editsched tbody").append("<tr id='row_" + rowid + "'>" + rowstuff + "</tr>");

		rowid += 1
		rownum = rowid + 1
	}
	refreshRows()
	return rowid - 1
}

function makerow(rowid, rownum, subject, duration) {
	orderstr = "<button type='button' " +
		"onclick='NavSubj(this,-1);' " +
		"class='btnnav' " +
		"data-id='" + rowid + "'>" + "^" +
		"</button>" +
		"<p style='vertical-align:middle;' data-id='" + rowid + "'>" + rownum + "</p>" +
		"<button type='button' " +
		"onclick='NavSubj(this,1);' " +
		"class='btnnav' " +
		"data-id='" + rowid + "'>" + "v" +
		"</button>";

	var ret =
		"<td style='text-align:center'>" +
		orderstr +
		"</td>" +
		"<td style='font-size:larger;vertical-align:middle'>" + subject + "</td>" +
		"<td style='font-size:larger;vertical-align:middle'>" + duration + "</td>" +
		"<td style='font-size:larger;vertical-align:middle;text-align:center'>" +
		"<button type='button' " +
		"onclick='activityAdd(this);' " +
		"class='btnadd' " +
		"data-subject='" + subject + "' " +
		"data-id='" + rowid + "'>" + "+" +
		"</button>" +
		"</td>" +
		"<td style='font-size:larger;vertical-align:middle;text-align:center'>" +
		"<button type='button' " +
		"onclick='activityDelete(this);' " +
		"class='btndel' " +
		"data-subject='" + subject + "' " +
		"data-id='" + rowid + "'>" + "x" +
		"</button>" +
		"</td>"
	return ret
}

function refreshRows() {
	var table = document.getElementById("editsched")

	window.customschedule[dayWeek[window.currentDaySched + 1]] = []
	for (var rownum = 1, row; row = table.rows[rownum]; rownum++) {
		rowid = rownum - 1
		row.id = 'row_' + rowid
		for (var ch = 0, child; child = row.cells[0].childNodes[ch]; ch++) {
			child.dataset.id = rowid;
		}
		if (rownum == 1) {
			row.cells[0].childNodes[0].disabled = true;
			row.cells[0].childNodes[2].disabled = false;
		} else if (rownum == table.rows.length - 1) {
			row.cells[0].childNodes[0].disabled = false;
			row.cells[0].childNodes[2].disabled = true;
		} else {
			row.cells[0].childNodes[0].disabled = false;
			row.cells[0].childNodes[2].disabled = false;
		}
		row.cells[0].childNodes[1].innerHTML = rownum;
		row.cells[3].firstChild.dataset.id = rowid;
		row.cells[4].firstChild.dataset.id = rowid;
		window.customschedule[dayWeek[window.currentDaySched + 1]].push(row.cells[1].innerHTML)
	}
}

function updateSmallTime() {
	window.smallGroupMeetingTime = document.getElementById("SmallTime").value;
}

function NavSubj(th, pos) {
	if (pos == -1) { // Move up
		var row = th.parentNode.parentNode,
			sibling = row.previousElementSibling,
			parent = row.parentNode;
		parent.insertBefore(row, sibling);
	} else { // Move down
		var row = th.parentNode.parentNode,
			sibling = row.nextElementSibling,
			parent = row.parentNode;
		parent.insertBefore(row, sibling.nextElementSibling);
	}
	refreshRows()
}

function activityAdd(th) {
	window.th = th
	$("#dialog").dialog("open");
}


function activityDelete(th) {
	var answer = window.confirm("Are you sure you want to delete activity '" + th.dataset.subject + "'?")
	if (answer) {
		el2rm = document.getElementById("row_" + th.dataset.id)
		el2rm.parentNode.removeChild(el2rm);
		refreshRows()
	}
}

function Navupdateset() {
	if (window.currentDaySched > 0) {
		document.getElementById("Navleftsched").style.display = 'inline-block';
	} else {
		document.getElementById("Navleftsched").style.display = 'none';
	}
	if (window.currentDaySched < 4) {
		document.getElementById("Navrightsched").style.display = 'inline-block';
	} else {
		document.getElementById("Navrightsched").style.display = 'none';
	}

	document.getElementById("schedDayname").innerHTML = dayWeek[window.currentDaySched + 1];

	subjectAdd()
}


function NavloadToday() {
	var href = window.location.href;
	var reg = new RegExp( '[?&]day=([^&#]*)', 'i' );
	var string = reg.exec(href);
	console.log(string)

	window.currentDaySched = parseInt(string[1], 10); //https://kinderclassroom.org/edit-schedule.html
	window.history.pushState({}, document.title, "/" + "edit-schedule.html");
	Navupdateset()
}

function Navleftset() {
	if (window.currentDaySched > 0) {
		window.currentDaySched -= 1;
	}
	Navupdateset()
}

function Navrightset() {
	if (window.currentDaySched < 4) {
		window.currentDaySched += 1;
	}
	Navupdateset()
}


$(document).ready(function() {
	window.customschedule = JSON.parse(localStorage.getItem('customschedule'));
	window.smallGroupMeetingTime = JSON.parse(localStorage.getItem('smallGroupMeetingTime'));

	subjectAdd();
	Navupdateset()
	refreshRows()
	document.getElementById("SmallTime").value = window.smallGroupMeetingTime;

	NavloadToday();
});