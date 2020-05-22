
var courseId = ""
var CLIENT_ID = ""
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.topics.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.announcements.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/classroom.rosters.readonly";


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log("Get client ...")
       CLIENT_ID = xhttp.responseText;
       var gapiConfig={
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES};
    }
};
xhttp.open("GET", "https://kinderclassroom.org/data/getclient.inc.php", false);
xhttp.send();			



var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// VARIABLES TO STORE CLASS INFO
var schooldays = []
var coursework = []
var topics = []
var announcements = []
var announcers = []
var messages = {}

function getCreatorName(userId) {
    return gapi.client.classroom.courses.teachers.get({
      "courseId": "73525520690",
      "userId": userId //"111907588932606819470"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                //console.log("Response", response);
                //console.log(response.result.profile.name.fullName);
                window.annName[userId] = response.result.profile.name.familyName; //fullName;
              },
              function(err) { console.error("Execute error", err); });
  };
//  gapi.load("client:auth2", function() {
//    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//  });
  
function getAnnouncements() {
	console.log("courseId = " + window.courseId)
	return gapi.client.classroom.courses.announcements.list({
			"courseId": window.courseId,
			"pageSize": 20
		})
		.then(function(response) {

				window.announcements = response.result.announcements
				creators = []
				msg2rm=[];
				for (i = 0; i < window.announcements.length; i++) {


						var msgdate = new Date(window.announcements[i].updateTime)
	
						var chkdate = new Date(new Date().setDate(new Date().getDate() - 7))
						if (msgdate > chkdate) {
							creators.push(window.announcements[i].creatorUserId)
						} else {
							msg2rm.push(i)
						}
				}

					

					/*for (var i = msg2rm.length - 1; i >= 0; i--) {
						console.log("About to remove: "+window.announcements[i])
						window.announcements = window.announcements.slice(0,i).concat(window.announcements.slice(i+1))
					}*/

				window.announcers = creators.filter((item, i, ar) => ar.indexOf(item) === i);


				for (ann in announcers) {

					window.messages[announcers[ann]] = []
					getCreatorName(announcers[ann]);	
				}
			},
			function(err) {
				console.error("Execute error", err);
			})
		.then(function() {
			},
			function(err) {
				console.error("Execute error", err);
			});
}

function loadAnnounces2() {
					if (window.annsloaded == 0) {

					for (msg in window.announcements) {

						var msgdate = new Date(window.announcements[msg].updateTime)
	
						var chkdate = new Date(new Date().setDate(new Date().getDate() - 7))
						if (msgdate > chkdate) {
							if (window.announcements[msg].materials != null && window.announcements[msg].materials.length > 0) {
								window.messages[window.announcements[msg].creatorUserId].push('<b>' + window.teacherTitle + " " + window.annName[window.announcements[msg].creatorUserId] + ':</b><br/><p>' + window.announcements[msg].text + '<br/>(Click below for more details)<br/><a href="' + window.announcements[msg].alternateLink + '" target="_blank">' + dayWeek[msgdate.getDay()] + ", " + months[msgdate.getMonth()] + " " + msgdate.getDate() + '</a></p>')
							} else {
								window.messages[window.announcements[msg].creatorUserId].push('<b>' + window.teacherTitle + " " + window.annName[window.announcements[msg].creatorUserId] + ':</b><br/><p>' + window.announcements[msg].text + '<br/><a href="' + window.announcements[msg].alternateLink + '" target="_blank">' + dayWeek[msgdate.getDay()] + ", " + months[msgdate.getMonth()] + " " + msgdate.getDate() + '</a></p>')
							}
						} 
					}



					document.getElementById("dispann").innerHTML = document.getElementById("dispann").innerHTML.substr(0, document.getElementById("dispann").innerHTML.length - 6)

					for (ann in announcers) {
						window.currentAnn.push(0)
						document.getElementById("dispann").innerHTML = document.getElementById("dispann").innerHTML + '<input type="image" id="Annleft' + ann + '" alt="<" src="images/Navleft.png" onclick="Annleft(' + ann + ')" style="line-height:2;width:10%;vertical-align:middle;display:inline-block;"/><image src="images/Smiley' + ann + '.png"  style="line-height:3;width:15%;vertical-align:bottom;display:inline-block;"/><div id="anndiv' + ann + '"  class="announce" style="width:65%;display:inline-block;"></div><input type="image" id="Annright' + ann + '" alt=">" src="images/Navright.png" onclick="Annright(' + ann + ')" style="line-height:2;width:10%;vertical-align:middle;display:inline-block;"/><br/>'
					}

					document.getElementById("dispann").innerHTML = document.getElementById("dispann").innerHTML + '</div>'

					window.annsloaded = 1
					Annupdate()
				}

}

function getCourseWork() {
	getSchoolDays()
	subjlist = ["ELA", "Math", "Science", "SEL", "Social Studies", "Maker Space", "STEAM"]
	return gapi.client.classroom.courses.courseWork.list({
			"courseId": window.courseId,
			"pageSize": 100
		})
		.then(function(response) {
				window.coursework = response.result.courseWork
				window.coursepage = response.result.nextPageToken
				for (i = 0; i < window.coursework.length; i++) {
					if (window.coursework[i].topicId != null && window.topicsById[window.coursework[i].topicId] != null) {
						taskday = window.topicsById[window.coursework[i].topicId].dayname.substr(0, window.topicsById[window.coursework[i].topicId].dayname.indexOf(","));
						subj = "Unknown"
						if (window.coursework[i].title.indexOf("Math") > -1) {
							// Math
							subj = "Math";
						} else if (window.coursework[i].title.indexOf("ELA") > -1) {
							subj = "ELA";
						} else {
							for (s in subjlist) {
								if (window.coursework[i].title.indexOf(subjlist[s]) > -1) {
									subj = subjlist[s];
								}
							}
						}
						taskURL = window.coursework[i].alternateLink;
						window.assignment[taskday][subj] = ['<h4><a href="'+taskURL+'" target="_blank">'+window.coursework[i].title+'</a></h4><br/><p>'+window.coursework[i].description+'</p>']
						for (k=0; k<window.coursework[i].materials.length; k++) {
							chkmat = 0
							if (window.coursework[i].materials[k].hasOwnProperty("driveFile")) {
								if(window.coursework[i].materials[k]["driveFile"]["shareMode"]=="STUDENT_COPY") {
										window.assignment[taskday][subj].push(makeWorkPreview("Here is a preview of the assignment file " + window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"] + ". To access your personal copy for working on and turning in, click here and look in the upper right corner of the window:",taskURL,"https://drive.google.com/file/d/"+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].substring(1+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].indexOf("="))))								
										//window.assignment[taskday][subj].push(['<br/><a href="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"]+'" target="_blank"><img src="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["thumbnailUrl"]+'" alt="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"]+'"></a>'])
								} else {
									if (window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].substring(window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].length-4,window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].length)==".ppt") {
										//window.assignment[taskday][subj].push(makeWorksheet(window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"],"https://docs.google.com/presentation/d/"+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].substring(1+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].indexOf("="))+"/edit#slide=id.p"))
										window.assignment[taskday][subj].push(makePPT(window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"],window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"]))
									} else if (window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].substring(window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].length-4,window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].length)!=".mp4" && window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].substring(window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].length-4,window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"].length)!="webm") {
										window.assignment[taskday][subj].push(makeWorksheet(window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"],"https://drive.google.com/file/d/"+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].substring(1+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].indexOf("="))))
										//window.assignment[taskday][subj].push(['<br/><a href="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"]+'" target="_blank"><img src="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["thumbnailUrl"]+'" alt="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"]+'"></a>'])
									} else {
										window.assignment[taskday][subj].push(['<br/><a href="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"]+'" target="_blank"><img src="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["thumbnailUrl"]+'" alt="'+window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"]+'" style="width:100%"></a>'])
									}								
								}
								
								chkmat+=1
							}
							if (window.coursework[i].materials[k].hasOwnProperty("youtubeVideo")) {
								window.assignment[taskday][subj].push([makeYouTube(window.coursework[i].materials[k]["youtubeVideo"]["id"])]);
								chkmat+=1
							}
							if (window.coursework[i].materials[k].hasOwnProperty("link")) {
								if (window.coursework[i].materials[k]["link"]["title"].substring(window.coursework[i].materials[k]["link"]["title"].length-20,window.coursework[i].materials[k]["link"]["title"].length)==".ppt - Google Slides") {
									//window.assignment[taskday][subj].push(makeWorksheet(window.coursework[i].materials[k]["driveFile"]["driveFile"]["title"],"https://docs.google.com/presentation/d/"+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].substring(1+window.coursework[i].materials[k]["driveFile"]["driveFile"]["alternateLink"].indexOf("="))+"/edit#slide=id.p"))
									window.assignment[taskday][subj].push(makePPT(window.coursework[i].materials[k]["link"]["title"],window.coursework[i].materials[k]["link"]["thumbnailUrl"],window.coursework[i].materials[k]["link"]["url"]))
								} else {
								window.assignment[taskday][subj].push(makeWorksheet(window.coursework[i].materials[k]["link"]["title"],window.coursework[i].materials[k]["link"]["url"]))
								//window.assignment[taskday][subj].push(['<br/><a href="'+window.coursework[i].materials[k]["link"]["url"]+'" target="_blank"><img src="'+window.coursework[i].materials[k]["link"]["thumbnailUrl"]+'" alt="'+window.coursework[i].materials[k]["link"]["title"]+'" /></a>'])
								}								
								chkmat+=1
  							}
							if (window.coursework[i].materials[k].hasOwnProperty("form")) { 
								window.assignment[taskday][subj].push(['<br/><a href="'+window.coursework[i].materials[k]["form"]["thumbnailUrl"]+'" target="_blank"><img src="'+window.coursework[i].materials[k]["form"]["thumbnailUrl"]+'" alt="'+window.coursework[i].materials[k]["form"]["title"]+'" ></a>'])
								chkmat+=1
							}
							if (chkmat==0) {
								console.log("No materials attached for this task! title = "+ window.coursework[i].title)							
							}
						}
					} 
				}
			},
			function(err) {
				console.error("Execute error", err);
			});
}

function filterCourseWork(topicId) {

	var mywork = window.coursework.filter(a => a.topicId == topicId);
	return mywork
}

function getSchoolDays() {

	return gapi.client.classroom.courses.topics.list({
			"courseId": window.courseId,
			"pageSize": 100
		})
		.then(function(response) {
				window.topics = response.result.topic;
				if (window.topics.length > 0) {
					idx = 0
					for (i = 0; i < window.topics.length; i++) {
						var topic = window.topics[i];

						const regex = /([a-zA-Z]+), ([a-zA-Z]+) ([0-9]+)([a-z]+)/;
						const found = topic.name.match(regex);
						if (found != null) {
							window.topicsById[topic.topicId] = {
								"month": found[2],
								"day": found[3],
								"dayname": topic.name
							}
							window.schooldays[idx] = {
									dayname: topic.name,
									month: found[2],
									day: found[3],
									topicid: topic.topicId,
								}
						}
					}
				} else {
					console.log("No topics found")
				}
			},
			function(err) {
				console.error("Execute error", err);
			});
}

function loadWork() {
	getCourseWork()
	getAnnouncements()
}

 function onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    function onFailure(error) {
      console.log(error);
    }


/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
	gapi.load('client:auth2', loadAndInitGAPI);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */


function loadAndInitGAPI() { //initClient() {
	gapi.client.init({
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function() {
			// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get(),gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile());
		authorizeButton.onclick = handleAuthClick;
		signoutButton.onclick = handleSignoutClick;		
		
	}, function(error) {
		//appendPre(JSON.stringify(error, null, 2));
		console.log(JSON.stringify(error, null, 2));
	});//.then(updateSigninStatus).then(getClassName);
	//setTimeout(gapi.client.init(gapiConfig), 1);
}

function updateSigninStatus(isSignedIn,profile) {
	console.log("isSignedIn = ", isSignedIn)
	if (isSignedIn) {
		authorizeButton.style.display = 'none';
		signoutButton.style.display =  'block';
		getClassName(); //getClassName(); //list.topics();
  window.fname = profile.getGivenName();
  window.email = profile.getEmail();

	} else {
		authorizeButton.style.display =  'block';
		signoutButton.style.display = 'none';
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn().then(function () {
  var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
  window.fname = profile.getGivenName();
  window.email = profile.getEmail();
	}
	)

}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}


/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */

function getClassName() {
	course2id="";
	Navupdate()
	gapi.client.classroom.courses.list({
		pageSize: 10
	}).then(function(response) {
		var courses = response.result.courses;

		if (courses.length > 0) {
			for (i = 0; i < courses.length; i++) {
				var course = courses[i];
				document.getElementById("classname").innerHTML = course.name
				document.getElementById("classdesc").innerHTML = "Room " + course.room + ": " + window.fname
				console.log(course.name + " Room " + course.room)
				window.courseId = course.id
				
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
				    if (this.readyState == 4 && this.status == 200) {
				       // Typical action to be performed when the document is ready:
				       var result = JSON.parse(xhttp.responseText);
				       window.settle = result[0].split(";");
				       window.helpLinkSign = result[1].split(";");
				       //window.manual = JSON.parse(result[1]);
				    }
				};
				xhttp.open("GET", "data/setfoot.inc.php?id="+course.id, false);//true);
				xhttp.send();	
				
				var xhttpB = new XMLHttpRequest();
				xhttpB.onreadystatechange = function() {
					//console.log("Here goes nothing: "+this.readyState+", this.status="+this.status)
				    if (this.readyState == 4 && this.status == 200) {
				       // Typical action to be performed when the document is ready:
						var result = JSON.parse(xhttpB.responseText);
						//console.log("Got records ... " + result[0])
						//console.log("Waaaa: " + result[1]);
						window.manual = JSON.parse(result[1]);
				
						//window.manual = result[1];
				    } else {
						var result = xhttpB.responseText;
						//console.log("Otra records ... " + window.manual)
					}
				};
				xhttpB.open("GET", "https://kinderclassroom.org/data/getdata.inc.php?id="+course.id, false);
				xhttpB.send();	
				//console.log("The subject data is = "+window.manual)						
			}
			loadWork()
		} else {
			document.getElementById("classname").innerHTML = "My Class"
			console.log("No courses found")
		}
	});
}