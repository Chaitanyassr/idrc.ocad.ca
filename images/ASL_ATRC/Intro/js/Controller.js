// JavaScript Document
// Custom Controller

// width in pixels

var width;
var markerObj;

function Controller(cWidth) {
width=cWidth;
markerObj = ElementSetup("marker","relative",0);
StartPolling();
}

function StartPolling() {
	setInterval(function(){PollPosition();},100);
}

// position: percent time in movie
function MoveToPosition(currentPosition) {
	markerObj.left = currentPosition;
}

// gets the current position, (in context of endTime and step.)
function PollPosition() {
// get current position
currentTime = ASLMovObj.GetCurTime();
currentRatio = currentTime/movieEndTime;  // movieEndTime - set in the main method
currentPosition = currentRatio*width;
MoveToPosition(currentPosition);
}

function ElementSetup(id,position,leftpos) {
Obj = document.getElementById(id).style;
Obj.position = position;
Obj.left = leftpos;
return Obj;
}