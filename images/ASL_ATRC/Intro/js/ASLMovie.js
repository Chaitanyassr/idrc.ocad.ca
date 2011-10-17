// JavaScript Document

/* Class ASLMovie
Interface to interact with Quicktime Video
*/

function ASLMovie(QTObject)
{
	// ASLMovie object methods.  Use instead of directly calling javascript QT interface
	this.PlayMe = PlayMe;
	this.StopMe = StopMe;
	this.Restart = Restart;
	this.RewindMe = RewindMe;
	this.FastForwardMe = FastForwardMe;
	this.JumpToPoint = JumpToPoint;
	this.SaveTime = SaveTime;
	this.ReturnToSaved = ReturnToSaved;
	this.SetHREF = SetHREF;
	this.GetCurTime = GetCurTime;
	this.GetEndTime = GetEndTime;
	this.SetCurLink = SetCurLink;
	this.GetCurLink = GetCurLink;
	this.SetEndTime = SetEndTime;
	this.SetNumLinks = SetNumLinks;
	this.GetNumLinks = GetNumLinks;
	this.GetTimeUnit = GetTimeUnit;
	this.GetQTStatus = GetQTStatus;
	this.SetQTTimeData = SetQTTimeData;
	this.UpdateCurlink = UpdateCurlink;
	this.ShowPartial = ShowPartial;
	this.Show = Show;
	this.PlayNextLink = PlayNextLink;
	this.PlayPrevLink = PlayPrevLink;
	this.Running = Running;

	this.SetMovieSpeed = SetMovieSpeed;
	
	// private variables
	this.QTObject = QTObject;
	this.isRunning = true;
	this.savedPoint;
	this.saved;
	this.curLink=0;
	this.numLinks;
	this.returnLinkIndex;
	this.timeScale;
	this.origTimeScale; // timescale for reference movie
	this.endTime;
	this.tempdex=0; // temporary index.
	// timeoutID used to reference an instance of setTimeout
	this.timeoutID;

	// new - stores the SetRate float that determines the playback speed
        // 0 = stop, 1 = normal
	this.CurrentRate=1;
	// new
}

function PlayMe()
{
	if (this.isRunning==false || this.isRunning==undefined) {
		this.StopMe();
		this.QTObject.SetRate(this.CurrentRate);
		// this.QTObject.Play();
		// This flag is used for the timer which monitors the point in the video
		// Only turn it off if the video is not in play mode.
		this.isRunning = true;
		// reset return flag
		this.saved = false;
		this.savedPoint = 0; // Reset the saved point to the beginning of the movie
		// Reset HREF for video
		// this.SetHREF("","");
	} else {
		this.StopMe();
	}
}

function StopMe()
{
	this.QTObject.Stop();
	this.isRunning = false;
}

function Restart()
{
	this.QTObject.Rewind();
	this.SetCurLink(0);
}

function RewindMe()
{
	this.isRunning=true;
	this.QTObject.SetRate(-1);
}

function FastForwardMe()
{
	this.isRunning=true;
	this.QTObject.SetRate(2);
}

// Jump to time in video
function JumpToPoint(stime)
{
	this.QTObject.SetTime(stime);
}

// Save the current time of the movie
function SaveTime()
{
	// if return point has not yet been saved
	if (this.saved==false) {
		this.savedPoint=this.QTObject.GetTime();
		this.returnLinkIndex=this.GetCurLink(); // save the current link position
		this.saved=true;
	}
	// else do nothing
}

// Return to the saved point in the movie
function ReturnToSaved()
{
	// Only jump to point if there is a real returnPoint.
	if (this.saved==true) {
		this.QTObject.SetTime(savedPoint);
		this.isRunning = true;
		this.PlayMe();
	}
}

// Set the href target for the quicktime link
function SetHREF(linkurl, target) {
	this.QTObject.SetHREF(linkurl);
	this.QTObject.SetTarget(target);
}

function GetCurTime() {
	return this.QTObject.GetTime();
}

// Get the duration of the video
function GetEndTime()
{
 	return this.endTime;
}

// Gets the unit of the timerate
function GetTimeUnit()
{
	return this.QTObject.GetTimeScale();
}

// Set the number of links in the video
function SetNumLinks(num)
{
	this.numLinks=num;
}

// Return the number of links in the movie
function GetNumLinks()
{
	return this.numLinks;
}

// Set the number of links in the movie
function SetCurLink(num)
{
	this.curLink = num;
}

// if s flag is set to true, a binary search will be used (use when movie is not in play)
// as javascript will not have the correct current link in memory
function GetCurLink(s)
{
	if (s!=true) // active search
		return this.curLink;
	else
		return _FindCurLink(0, linkObjectArray.length-1, this.GetCurTime()); 
}

// binary search
function _FindCurLink(first, last, key){
	// use binary search
   var pmid //previous mid
   while (first <= last) {
      mid = Math.round((first + last) / 2);
      if ((linkObjectArray[mid].etime >= key) && (linkObjectArray[mid].stime <= key)) // found it
         return mid;
      else if (linkObjectArray[mid].etime > key) {// search bottom half 
         last = mid - 1;
		 pmid = mid;
      } else if (linkObjectArray[mid].etime < key) {
         first = mid + 1;
		 pmid = mid;
	  }
   }
   return pmid;
}

function GetQTStatus()
{
	return this.QTObject.GetPluginStatus();
}

// Get the video timing information required
function SetQTTimeData(oldTScale, endD) {
	this.timeScale = this.GetTimeUnit();  // Get the timescale for the video
	this.origTimeScale = oldTScale;
	newscale = convertToTrueTimescale(endD); // Set the duration of the video to work with SMIL
	this.SetEndTime(newscale); 
}

function SetEndTime(dur) {
	this.endTime = dur
}

// Update the current link in the movie
function UpdateCurlink(num)
{
	// if num=-1, then it is effectively decrementing
	this.curLink=this.curLink+num;
}

// Show the ASL link description in the main video
// QTOBject=document.clip, num=link to play)
function ShowPartial(num, isExtended)
{
	if (this.timeoutID!="undefined") 
		clearTimeout(this.timeoutID); // Clear any previous timeout
	// Save the position before the jump
	this.SaveTime();
	this.SetCurLink(num);  //set the current link position
	// Set the global position cursor for the current link.
	// curLink=num;
	this.StopMe();
	
	if (isExtended) // is extendedLink
		start = linkObjectArray[num].extraSTime
	else
		start = linkObjectArray[num].stime
		
	// Set the HREF for the video to be consistent with the signicon
	// this.SetHREF(linkObjectArray[num].location, "_blank");
	// savePoint(movObject);
	// buffer=this.timeScale/20; //create 1/5 second buffer time.
	buffer=this.timeScale/5; //create 1/5 second buffer time.
	// Jump half second before the actual link time for easier viewing
	if ((start-buffer)>0)
		this.QTObject.SetTime(start-buffer);
	else  // we can't go back a second, because we are at the beginning of the video
		this.QTObject.SetTime(start);	

	// this.QTObject.Play();
	this.PlayMe();
	
	this.timeoutID=setTimeout("Stop()", ConvertToSeconds(linkObjectArray[num].etime-start+buffer)*1000);
}

// Show the ASL link description in the main video from beginning of link
// to end of video
// QTOBject=document.clip, num=link to play)
function Show(num)
{
	if (this.timeoutID!="undefined") 
		clearTimeout(this.timeoutID); // Clear any previous timeout
	// Save the position before the jump
	this.SaveTime();
	this.SetCurLink(num);  //set the current link position
	// Set the global position cursor for the current link.
	// curLink=num;
	this.StopMe();
	// Set the HREF for the video to be consistent with the signicon
	// this.SetHREF(linkObjectArray[num].location, "_blank");
	// savePoint(movObject);
	buffer=this.timeScale/20; //create buffer time.
	// Jump half second before the actual link time for easier viewing
	if ((linkObjectArray[num].stime-buffer)>0)
		this.QTObject.SetTime(linkObjectArray[num].stime-buffer);
	else  // we can't go back a second, because we are at the beginning of the video
		this.QTObject.SetTime(linkObjectArray[num].stime);	

	this.QTObject.Play();
	
	// this.timeoutID=setTimeout("Stop()", ConvertToSeconds(linkObjectArray[num].etime-linkObjectArray[num].stime)*1000);
}

// Jump to the next link in the video, with visual effects (highlighting icon and density bar)
function PlayNextLink() {
	this.StopMe(); // first stop the movie
	// Save the position before the jump
	this.SaveTime();
	// alert(this.GetCurLink(true));
	//this.curLink = this.GetCurLink(true)
	if (this.curLink < this.numLinks) {
		if (this.curLink == (this.numLinks-1))  { // we are on the last link
			this.JumpToPoint(linkObjectArray[this.curLink].stime+1);
			ASLTblObj.LinkEffects(this.curLink);
			DBar.ShowActive(this.curLink);
			this.curLink=0;
		} else {
			this.JumpToPoint(linkObjectArray[this.curLink++].stime+1, this.QTObject);
			ASLTblObj.LinkEffects(this.curLink-1); // Show ASLTable visual effects
			DBar.ShowActive(this.curLink-1);  // Show highlighted density bar
		}
	}
}

// Jump to the previous link in the video, with visual effects (highlighting icon and density bar)
function PlayPrevLink() {
	this.StopMe(); // first stop the movie
	// Save the position before the jump
	this.SaveTime();
	// alert("" + linkArray[0] + linkArray[1] + linkArray[2] + "length: " + numlinks + "curLink:" + curLink)
	this.curLink--; //decrement to previous.
	if (this.curLink >= 0) {
		this.JumpToPoint(linkObjectArray[this.curLink].stime+1, this.QTObject)
	}
	else {
		// Go to last link
		this.curLink = linkObjectArray.length-1;
		this.JumpToPoint(linkObjectArray[this.curLink].stime+1, this.QTObject);
	}
	ASLTblObj.LinkEffects(this.curLink);
	DBar.ShowActive(this.curLink);
}

// Method returns true if the movie is in regular play mode
function Running() {
	return (this.QTObject.GetRate()==1)
}

function SetMovieSpeed(rate) {
	this.StopMe();
	this.CurrentRate = rate;
	this.PlayMe();
}