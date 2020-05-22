window.scheduleBase.Monday = ["Morning Meeting", "Poem of the Week", "ELA", "Math", "Science", "Art"]
window.scheduleBase.Tuesday = ["Morning Meeting", "Poem of the Week", "ELA", "Math", "SEL", "Small Group", "P.E."]
window.scheduleBase.Wednesday = ["Morning Meeting", "Poem of the Week", "ELA", "Math", "Social Studies", "Website Wednesday", "Music"]
window.scheduleBase.Thursday = ["Morning Meeting", "Poem of the Week", "ELA", "Math", "Science", "Class Meeting", "P.E."]
window.scheduleBase.Friday = ["Morning Meeting", "Poem of the Week", "ELA", "Math", "STEAM", "Music"]

localStorage.setItem('scheduleBase', JSON.stringify(window.scheduleBase));

function configure() {
	window.open('https://kinderclassroom.org/edit-schedule.html?day='+window.currentDay, '_blank');
}

eachday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
console.log("Loading in user progress ...")
window.customschedule = JSON.parse(localStorage.getItem('customschedule'));
window.smallGroupMeetingTime = JSON.parse(localStorage.getItem('smallGroupMeetingTime'));
if (window.customschedule === null) {
	window.smallGroupMeetingTime = '2:00 pm';
	window.customschedule = {}

	for (var d in eachday) {
		window.customschedule[eachday[d]] = [...scheduleBase[eachday[d]]];
		i = window.customschedule[eachday[d]].indexOf("ELA")
		if (eachday[d]==="Thursday") {
			// Add recess
			window.customschedule[eachday[d]] = window.customschedule[eachday[d]].slice(0, i + 4).concat("Recess", window.customschedule[eachday[d]].slice(i + 4))

		} else {
			// Add lunch & recess
			window.customschedule[eachday[d]] = window.customschedule[eachday[d]].slice(0, i + 3).concat("Lunch", "Recess", window.customschedule[eachday[d]].slice(i + 3))
		}
			// Add snack
		window.customschedule[eachday[d]] = window.customschedule[eachday[d]].slice(0, i + 1).concat("Snack", window.customschedule[eachday[d]].slice(i + 1))
	}
	localStorage.setItem('customschedule', JSON.stringify(window.customschedule));

} else if (window.updateflag==1) {
	for (var d in eachday) {
		for (var s in scheduleBase[eachday[d]]) {
			if (window.customschedule[eachday[d]].indexOf(scheduleBase[eachday[d]][s]) < 0) {
				window.customschedule[eachday[d]].push(scheduleBase[eachday[d]][s])
			}
		}
	}
	localStorage.setItem('customschedule', JSON.stringify(window.customschedule));
}

if (window.smallGroupMeetingTime === null) {
	console.log("Didn't have small time saved!")
	window.smallGroupMeetingTime = '2:00 pm';
	localStorage.setItem('smallGroupMeetingTime', JSON.stringify(window.smallGroupMeetingTime));
}

window.schedule = JSON.parse(localStorage.getItem('customschedule'));

var savework = JSON.parse(localStorage.getItem('classprogress'));
var lastCheckDate = JSON.parse(localStorage.getItem('lastCheckDate'));

if (savework === null || lastCheckDate === null || lastCheckDate < window.refreshDay) {
	console.log("No work saved for this week yet")
	var savework = {
		"Monday": [],
		"Tuesday": [],
		"Wednesday": [],
		"Thursday": [],
		"Friday": []
	}
	savework.Monday = {
		"Morning Meeting": [],
		"Poem of the Week": [],
		"ELA": [],
		"Math": [],
		"Science": [],
		"Art": []
	}
	savework.Tuesday = {
		"Morning Meeting": [],
		"Poem of the Week": [],
		"ELA": [],
		"Math": [],
		"SEL": [],
		"Small Group": [],
		"P.E.": []
	}
	savework.Wednesday = {
		"Morning Meeting": [],
		"Poem of the Week": [],
		"ELA": [],
		"Math": [],
		"Social Studies": [],
		"Website Wednesday": [],
		"Music": []
	}
	savework.Thursday = {
		"Morning Meeting": [],
		"Poem of the Week": [],
		"ELA": [],
		"Math": [],
		"Science": [],
		"Class Meeting": [],
		"P.E.": []
	}
	savework.Friday = {
		"Morning Meeting": [],
		"Poem of the Week": [],
		"ELA": [],
		"Math": [],
		"STEAM": [],
		"Music": []
	}

}