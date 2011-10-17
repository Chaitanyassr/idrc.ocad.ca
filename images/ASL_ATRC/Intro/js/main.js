// JavaScript Document

// Class Main

var ASLMovObj;
var ASLTblObj;
var XMLObj;
var DBar; // Density bar object.
var debug = false;
var movieEndTime;

var BrowserIsNS = false;
var linkObjectArray = new Array();  // Global
var narrativeObjectArray = new Array();

// preload images
var buttonpath="images/";
var bluelink = new Image(90,20);
var redlink = new Image(90,20);
bluelink = this.buttonpath + "bluelink.gif"
redlink = this.buttonpath + "redlink.gif"

// new - flag for rate of movie playback
var MovieIsSlow = false
//

function Initialize(movObject) {
	ASLMovObj = new ASLMovie(movObject);
	ASLTblObj = new ASLTable();
	XMLObj = new ASLXML();
}

function Run(xFile)
{
	// check for browser
	ASLMovObj.SetCurLink(0); // Initialize the current SignIcon to be the first
	linkObjectArray = new Array();

	// confirm browser supports needed features and load .xml file
	// verifySupport checks for browser ability to load XML and finds out if it is a
	// gecko based browser (NS).
	if (VerifySupport(xFile)) {
		if (BrowserIsNS) { // NS == Gecko/Mozilla
			
			// The async property set to false, means that the XML document (xDoc) must
			// be fully loaded before other operations can be performed.
			// If xDoc.async==undefined, then this browser does not support the async property
			if (XMLObj.xDoc.async==undefined || XMLObj.xDoc.async==true) { 
				XMLObj.xDoc.onload=CleanUp; // Force cleanup only after the document is ready
			} else {
				CleanUp(); // Since async has already been set to false
			}
				
			//Checks for the status of the QT plugin. Only proceeds after movie data loaded
			listener=setInterval("CheckQTStatus()",100);
		} else {
			listener=setInterval(function(){CheckQTStatus();},100);
		}
	}
}

// Verify that the client browser supports the loading of external
// XML data.  This function also checks to see if this is a Gecko
// based browser, since the DOM slightly differs from IE6.
function VerifySupport(xFile) {
	if (document.implementation && document.implementation.createDocument) {
		BrowserIsNS=true;
		XMLObj.CreateXMLFile();
	} else if (window.ActiveXObject) {
		// async property ensure thats the XML is loaded before any other operations are performed
		XMLObj.CreateXMLFile();
	} else {
		alert('Your browser doesn\'t support XML//nPlease upgrade your browser in order to view this page');
		return false
	}
	XMLObj.Populate(xFile)
	return true;
}

function CleanUp() {
	elems = XMLObj.GetElements("aslproject");
	XMLObj.CleanWhitespace(elems.item(0));
}

// Checks if the QT plugin has fully been loaded in client browser
function CheckQTStatus() {
	if (ASLMovObj.GetQTStatus()=="Complete") {
		clearInterval(listener);
		// Get the information about the video (timeunit and duration)
		setTimeout("LoadPage()", 500);
	}
}

// Parse the XML and create Javascript objects for better scriptability
function LoadPage() {
	// Time must be sent after video object is created
	eTime = GetETime();
	tScale = GetTScale();
	ASLMovObj.SetQTTimeData(tScale, eTime);
	CreateLinkObjects();
	CreateTranscriptObjects();
	ASLTblObj.SetColumnLength(CalcColumnLength());
	// Create table and insert signicon objects using DOM methods.
	// First gets the columnlength from the XML file.
	ASLTblObj.BuildTable(ASLMovObj.GetNumLinks());
	DBar = new DensityBar();
	DBar.Build(ASLMovObj.GetNumLinks());
	ASLMovObj.isRunning=false;
	setTimeout("ASLMovObj.PlayMe()", 1000);
	RefreshTable();
}

function CreateLinkObjects() {
		// Get the location of the pictures
		path = GetPicPath();
		// populate array with the link value (video time-linked locations)
		linkArray = new Array();
		
		linkArray = XMLObj.GetElements("signicon");	
		// Get number of hlink elements
		ASLMovObj.SetNumLinks(linkArray.length);
		
		numlinks = linkArray.length;
		// link object array with have the same length (each link = one object)
		for (i=0; i < numlinks; i++) {
			starttime = convertToTrueTimescale(parseInt(linkArray[i].childNodes.item(0).getAttribute("start")));
			endtime = convertToTrueTimescale(parseInt(linkArray[i].childNodes.item(0).getAttribute("end")));
			extraContent=linkArray[i].childNodes.item(1).getAttribute("enabled"); // Check if there is extra content
			// Check if Extra Content Exists
			if (extraContent=="Y") {
				extraSTime=convertToTrueTimescale(parseInt(linkArray[i].childNodes.item(1).getAttribute("start")));
				extraETime=convertToTrueTimescale(parseInt(linkArray[i].childNodes.item(1).getAttribute("end")));
			} else {
				extraSTime=0;
				extraETime=0;
			}
			//ignore item(2) = frameoverlay element
			linkloc = linkArray[i].childNodes.item(3).childNodes[0].nodeValue;
			
			newwin = linkArray[i].childNodes.item(4).getAttribute("newwindow");
			
			if (linkArray[i].childNodes.item(5).hasChildNodes())
				link_description = linkArray[i].childNodes.item(5).childNodes[0].nodeValue;
			else
				link_description = ""
				
			pic = linkArray[i].getAttribute("src");
			linkObjectArray[i] = new hLinkObject(starttime, endtime, linkloc, link_description, pic, path, extraSTime, extraETime, newwin);
		}
}

function CreateTranscriptObjects() {
	narrativeArray = XMLObj.GetElements("transcript");
	numNarrative = narrativeArray.length;

	for (i = 0; i < numNarrative; i++) {
		narElement = narrativeArray.item(i);
		msg = narElement.childNodes.item(0).nodeValue;
		narrativeObjectArray[i] = new narrativeObject(msg);
	}
	DisplayTranscript("Caption", narrativeObjectArray[0].msg);
}

//Display caption in the box if there is any, if not then make box invisible
function DisplayTranscript(tagID, message) 
{
	if (document.getElementById(tagID)) {// Does tag exist
		if (message != "") {
			document.getElementById(tagID).innerHTML = message;
			if (BrowserIsNS) {
				document.getElementById(tagID).setAttribute("style", "border-style: solid; border-width: thin; border-color: #999999;");
			} else {
				document.getElementById(tagID).style.borderStyle="solid";
				document.getElementById(tagID).style.borderWidth="thin";
				document.getElementById(tagID).style.borderColor="#999999";
			}
		}
	}
}

// Gets the path of the picture and returns it as a String
function GetPicPath() {
	linkPath = XMLObj.GetElements("signicons");
	return linkPath[0].getAttribute("path");
}

// Gets the number of columns users wishes to have for the signicons
function CalcColumnLength() {
	colLength = XMLObj.GetElements("aslproject");
	return colLength[0].getAttribute("cols");
}

// movTimer monitors the time of the video to synchronize it with the events on the webpage.
// This timer should only be on while the movie is in play mode.
// Necessary for updating the current link, the current row, and the highlighting of the icons.
function RefreshTable() {  // only while playing movie

	if (ASLMovObj.Running()) {
	
		curTime = ASLMovObj.GetCurTime();
		unformattedfloat = ConvertToSeconds(curTime);
		
		curlink = ASLMovObj.GetCurLink();
		columnLength = ASLTblObj.GetColumnLength();
		numlinks = ASLMovObj.GetNumLinks();
		
		var i=0;
		
		// The ability to scroll backwards
		if ((curlink)%(columnLength-1) == 0) // If the last item in the row is preceded by the next item below
				ASLTblObj.ScrollToView(linkObjectArray[curlink].pic);
		// curlink must not exceed the number of links
		if (curlink < numlinks) {
			// current movie time is less than the startime of the current sign icon, and we are not at the first signicon
			if ((curTime < linkObjectArray[curlink].stime) && (curlink > 0)) {
				ASLMovObj.UpdateCurlink(-1);
				ASLTblObj.PositionChanged(true);
			} else if ((curTime > linkObjectArray[curlink].stime) && (curlink == numlinks-1)) { // This is the last link
				if (curTime <= linkObjectArray[curlink].etime) {
					ASLTblObj.LinkEffects(curlink)
				} else {
					resetDisplay();
				}
			
				if (curTime>=ASLMovObj.endTime)
					ASLMovObj.isRunning=false;
			} else if ((curTime > linkObjectArray[curlink].stime) && (curTime < linkObjectArray[curlink].etime)) {
				 ASLTblObj.LinkEffects(curlink)
			// The current movie time is greater than the starttime of the current signicon but less than the starttime
			// of the next signicon
			}
			// linkObjectArray[curlink+1].stime NULL when only one link on page, which is why we must check first
			else if(curlink < (linkObjectArray.length-1)) { // To ensure we don't step outside of array bounds
				if (curTime > linkObjectArray[curlink+1].stime) { // If the current movie time is greater than the starttime
					ASLMovObj.UpdateCurlink(1); // Go forward a signicon (increment)
					ASLTblObj.PositionChanged(true);
				} else if (curTime > linkObjectArray[curlink].etime) {
					resetDisplay();
				// The current movie time is greater than the starttime of the current signicon but less than the starttime
				// of the next signicon
				}
			}
		}
	}
	setTimeout(function(){RefreshTable();}, 50);
}

function UpdateTimeDisplay(tagID, unformattedFloat) {
	document.forms[0].elements[tagID].value = Math.round(unformattedFloat*Math.pow(10,2))/Math.pow(10,2);
}

// Misc time functions
// Convert from timescale to seconds
// returns seconds as an integer
function ConvertToTimescale(seconds) {
	return seconds * ASLMovObj.timeScale;  // convert to seconds as integer
}

function ConvertToSeconds(timeunits) {
	return timeunits/ASLMovObj.timeScale;
}

function RestartMovie() {
	ASLTblObj.ClearBorder();
	DBar.ClearCells();
	ScrollToView("tableRow_" + 0);
	ASLMovObj.Restart();
}

// Show the ASL link description in the main video
// QTOBject=document.clip, num=link to play)
function ShowClip(num) {
	ASLMovObj.ShowPartial(num, false);
	ASLTblObj.LinkEffects(num)
	// display the current time of the video segment.
	curTime = ASLMovObj.GetCurTime();
}

function ShowExtended(num) {
	ASLMovObj.ShowPartial(num, true);
	ASLTblObj.ShowBorder(num);
	// display the current time of the video segment.
	curTime = ASLMovObj.GetCurTime();
}

function Stop() {
	ASLMovObj.StopMe();
}

function NextLink() {
	ASLMovObj.PlayNextLink();
}

function PrevLink() {
	ASLMovObj.PlayPrevLink();
}

function Rewind() {
	ASLMovObj.RewindMe();
}

function Play() {
	ASLMovObj.PlayMe();
}

function FastForward() {
	ASLMovObj.FastForwardMe();
}

// Create hyperlink object
function hLinkObject(stime, etime, location, desc, pic, path, extraSTime, extraETime, newwin) {
	this.stime = stime; // Starttime
	this.etime = etime; // Endtime
	this.location = location; // Set url location
	this.desc = desc; // text label for the object
	this.extraSTime=extraSTime; // extended link start time
	this.extraETime=extraETime; // extended link end time
	this.newwin = newwin;
	this.pic = new Image(); // Create a new Image object
	// Set the attributes for the image
	this.pic.setAttribute("src", path+pic);
	this.pic.setAttribute("id", pic); // give the image an id we can refer to later on
	this.pic.style.marginBottom ='5px';
	this.pic.style.borderWidth='4px';
}

function narrativeObject(msg) {
	this.msg = msg;
}

function roundToNPlaces(number, x) {
	x = (!x ? 2: x);
	return Math.round(number * Math.pow(10, x)) / Math.pow(10,x);
}

function GetETime() {
	movElement = XMLObj.GetElements("movie");
	value = parseInt(movElement[0].getAttribute("duration"));
	return value;
}

function GetTScale() {
	movElement = XMLObj.GetElements("movie");
	value = parseInt(movElement[0].getAttribute("timescale"));
	return value;
}

function convertToTrueTimescale(oldTime) {
	return (oldTime/ASLMovObj.origTimeScale)*600;
}

function resetDisplay() {
	ASLTblObj.ClearBorder();
	DBar.ClearCells();
	ASLTblObj.ResetImage();
}

// toggle speed between slow and normal
function ToggleSpeed() {
	
	if (MovieIsSlow == false) {
		ASLMovObj.SetMovieSpeed(0.5);
		MovieIsSlow = true;
	} else {
		ASLMovObj.SetMovieSpeed(1);
		MovieIsSlow = false;
	}
}

// change image for the slow mode button
var click = false;
function ExchangeImg(img1, img2)
{
	var imgs = document.images;
	var img;
	for (cnt = 0; cnt < imgs.length ; cnt++){
		if (imgs[cnt].name == "slow"){
			img = imgs[cnt];
			break;
		}
	}
	if (click) {
		 img.src = img1;
		 img.alt = "Slow mode off";
	} else {
		 img.src = img2;
		 img.alt = "Slow mode on";
	}
	click = !click
}