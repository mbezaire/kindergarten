
function seeMsgs() {
if (window.msgsShow==0) {
	window.msgsShow=1;
	document.getElementById("dispann").style.display="inline-block";
} else {
	window.msgsShow=0;
	document.getElementById("dispann").style.display="none";
}
}

function setTheme() {
	console.log("setTheme")
	window.open('setTheme.html', '_blank');
}

function getHelp() {
	window.open('help.html', '_blank');
}