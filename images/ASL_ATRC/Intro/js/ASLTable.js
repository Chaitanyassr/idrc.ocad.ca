// JavaScript Document
/* 
ASL TABLE
Contains all functions directly related to the appearance of the ASL SignLink Table
*/

function ASLTable()
{
	this.columnLength;
	this.posHasChanged = true;
	this.Scroll = Scroll

	this.BuildTable = BuildTable;
	this.ShowBorder = ShowBorder;
	this.ClearBorder = ClearBorder;
	this.GetCurrentRow = GetCurrentRow;
	this.AddRows = AddRows;
	this.ScrollToView = ScrollToView;
	this.SetColumnLength = SetColumnLength;
	this.GetColumnLength = GetColumnLength;
	this.LinkEffects = LinkEffects;
	this.PositionChanged = PositionChanged;
	this.hiliteImage = hiliteImage;
	this.ResetImage = ResetImage;
	
	// preload images
	this.buttonpath="images/";
	this.lastActiveImage; // keeps a reference to the last active image! (link button)
	this.hiliteActive; // boolean to see if there is a hilited image (button)
}

// Initially builds the table
function BuildTable(numlinks)
{
	// launch addRows
	this.AddRows(numlinks);
	this.ClearBorder();
}

// Show the border around the active thumbnail
function ShowBorder(toShow)
{
	// alert("My pic id is: " + linkObjectArray[toShow].pic.getAttribute("id"));
	if (BrowserIsNS) {
		linkObjectArray[toShow].pic.setAttribute("style", "border-style: solid; border-width: 4; border-color: #FF0000");  //current-blue JR
	}
	else {
		linkObjectArray[toShow].pic.style.borderWidth="4px";
		linkObjectArray[toShow].pic.style.borderColor="#FF0000";  //current-blue JR
	}
}

// Clear the border on all thumbnails
function ClearBorder()
{
	for (var i=0; i<linkObjectArray.length; i++) {
		if (BrowserIsNS) {
			linkObjectArray[i].pic.setAttribute("style", "border-style: solid; border-width: 4; border-color: black");
			}
		else {
			linkObjectArray[i].pic.style.borderWidth="4px";
			linkObjectArray[i].pic.style.borderColor="black";
			}
	}
}

// For multi column row configuration, get the current row with the active thumbnail
function GetCurrentRow(curLink)
{
	// Timing may not be synchronized, allowing for the curlink to be too high
	if (curLink < linkObjectArray.length)
		return Math.floor(curLink/this.columnLength);  // Find out which row this link index belongs
}

// Add rows to the asl table
function AddRows(numlinks)
{
var newrow; // row
var newtd;  // table data
var newtxt; // table text
var newimg;
var imgLink; // anchor for image
var txtLink; // anchor for text
var thumbCount=0;  // counter for the thumbnails.  Incremented for each signicon created
numRows=Math.ceil(numlinks/this.columnLength);
numCols=this.columnLength;

	for(var i=0;i<numRows;i++) 
	{ 
		newrow=document.createElement("tr"); // Create table row
		newrow.setAttribute("vAlign", "top");  // ensure that row contents are vertically aligned to the top
		newrow.setAttribute("id", "tableRow_" + i);
		newanchor=document.createElement("a"); // create anchor
		newanchor.setAttribute("name", "tableRow_" + i);
		newrow.appendChild(newanchor);
		//document.getElementById("txtDebug").innerHTML="thumbCount: " + thumbCount;
		for (var j=0; j< numCols; j++) {
			if (thumbCount < numlinks) {
				imgLink=document.createElement("a");  // movie link for the signicon
				imgLink.setAttribute("href", "javascript:ShowClip(" + thumbCount + ")");
				// imgLink.setAttribute("border", "1");

				// imgLink.setAttribute("href", "javascript:ShowClip(" + thumbCount + ")"); // set the behaviour for the mouseclick
				// * imgLink.setAttribute("href", "javascript:showClip(document.clip," + thumbCount + ")"); // set the behaviour for the mouseclick
				// imgLink.setAttribute("target", "_blank");
				// Set the image object
				newimg=linkObjectArray[thumbCount].pic;
				newimg.setAttribute("alt", "play link "+linkObjectArray[thumbCount].desc);
				imgLink.appendChild(newimg);  // add image inside of href
				
				// create the play button
				btnPlay=new Image(93,20)
				btnPlay.setAttribute("src", this.buttonpath + "bluelink.gif");
				btnPlay.setAttribute("id", "linkImg"+thumbCount);
				// hiliteImage is a global method.  @param:(imageToReplace, newImage)
				btnPlay.onmouseover = function() { hiliteImage(this, redlink)};
				btnPlay.onmouseout = function() { hiliteImage(this, bluelink)};
				btnPlay.setAttribute("alt", linkObjectArray[thumbCount].desc);  // create alt description of link for accessibility
				btnPlay.setAttribute("border", "0");
				//btnPlay.setAttribute("border", "0");  //NO BORDER AROUND ICON
				btnLink=document.createElement("a");
				btnLink.setAttribute("href", linkObjectArray[thumbCount].location);
				// btnLink.setAttribute("href", linkObjectArray[thumbCount].location); // set the behaviour for the mouseclick
				btnLink.appendChild(btnPlay);

				// Check if this link has extended content
				extended=false;
				if ((linkObjectArray[thumbCount].extraSTime && linkObjectArray[thumbCount].extraETime)!=0) {
					extended=true;
					// alert("we got one!");
				}
				
				// extended stuff rem'd by JR
		
				// create anchor element for the txt link which points to the hyperlink
				txtLink=document.createElement("a");
				txtLink.setAttribute("href", linkObjectArray[thumbCount].location); // set the behaviour for the mouseclick on text
				
				if (linkObjectArray[thumbCount].newwin == "Y") {
					txtLink.setAttribute("target", "_blank");
					btnLink.setAttribute("target", "_blank");
				}
				// Create the text label)
				newtxt=document.createTextNode(" " + linkObjectArray[thumbCount].desc); // create textnode
				
				// Create table data
				newtd=document.createElement("td");
				//newtd.setAttribute("width", "105")
	
				//if (linkObjectArray[thumbCount].desc == "") // Center buttons if no text label
					newtd.setAttribute("align", "center");
								
				newtd.appendChild(imgLink);  // add href node to table data
				breakline=document.createElement("BR");
				newtd.appendChild(breakline); // Breakline to ensure that text goes south of image
				// add play button
				newtd.appendChild(btnLink);
				breakline=document.createElement("BR");
				newtd.appendChild(breakline); 
				
				// add extended link button if required
				if (extended==true)
					newtd.appendChild(btnExtendedLink);
				
				txtLink.appendChild(newtxt);  // add text to link
				//newtd.appendChild(document.createElement("BR"));
				//newtd.appendChild(txtLink); // add label to table data
				newtd.appendChild(txtLink); // add label to table data
				newtd.setAttribute("id","image_"+thumbCount); 
				thumbCount++; // increment count for thumbs
				newrow.appendChild(newtd); // add the table data	
			}
		}
		document.getElementById("table_body").appendChild(newrow); // add the row to the table
	} 
	// alert("finished building table")
}

// Scroll the active thumbnail into view
function ScrollToView(_anchor)
{
	if (this.posHasChanged==true) {
		_anchor.scrollIntoView(true);
		this.posHasChanged=false;
	}
}

// ******bnew features to be tested
function Scroll(direction)
{
	if (direction=="forward")
		scrollBy(70, 0);
	else
		scrollBy(-70, 0);
}

function SetColumnLength(numCols)
{
	this.columnLength = numCols;
}

function GetColumnLength()
{
	return this.columnLength;
}

function PositionChanged(result)
{
	this.posHasChanged = result;
}

// Activate link effects
function LinkEffects(currentlink)
{
	this.posHasChanged=true;
	this.ScrollToView(linkObjectArray[currentlink].pic);
	DBar.ShowActive(currentlink);
	// this.ScrollToView("tableRow_" + this.GetCurrentRow(currentlink)); // Scroll to currentRow
	this.ClearBorder();
	this.ShowBorder(currentlink);
	// keep a pointer to last auto hilited image (button), so we can programmatically reset it later
	this.ResetImage();
	this.lastActiveImage = document.getElementById("linkImg" + currentlink);
	this.hiliteImage(document.getElementById("linkImg" + currentlink), redlink)
	this.hiliteActive = true; // reset the flag to see if there is an image hilited by the timer
}

function hiliteImage(img, newimage) {		
	img.src = newimage
}

function ResetImage() {
	if (this.hiliteActive) {// if image is currently hilited
		this.lastActiveImage.src = bluelink;
		this.hiliteActive = false;
	}
}