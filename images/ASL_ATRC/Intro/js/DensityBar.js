// JavaScript Document

// @width = width of density bar in pixels
function DensityBar() {
	this.Build = Build;
	this.ShowActive = ShowActive;
	this.ClearCells = ClearCells;
	this.createHref = createHref;
	this.addEmptyCell=addEmptyCell; // Workaround to insert &nbsp element inside empty table cell
	this.LinkColour="#0000FF";
	this.ActiveColour="#FF0000"; //current-blue - JR
	this.innerwidth=245;         //                                                 //changed by JR
	this.imagepath="images/"; // Path where images for density bar are located
}

function Build(numlinks) {
	tblbody=document.createElement("tbody");
	newrow=document.createElement("tr"); // Create table row
	
	// First add a graphic to the left end of the bar////////////
	newcell=document.createElement("td");
	newcell.setAttribute("width", "24px");                                 //changed by JR
	newimg=new Image();
	newimg.setAttribute("src", this.imagepath + "density-left.gif");
	newimg.setAttribute("border", 0);
	newcell.appendChild(newimg);
	newrow.appendChild(newcell);
	///////////////////////////////////////////////
	movieEndTime = ASLMovObj.endTime;
	
	for (i=0; i<numlinks; i++) {
		//Create gray buffer cell///////////////////////////////////////////////////////
		if (i==0)
			position=Math.round((linkObjectArray[i].stime/movieEndTime)*this.innerwidth) +"px" // we are at the first link
		else {
			// Must be sure we account for the width taken up by previous link
			position=Math.round(((linkObjectArray[i].stime-linkObjectArray[i-1].etime)/movieEndTime)*this.innerwidth)+"px"
		}		
		if (position != "0px") {
			newcell=document.createElement("td");    // Create table col
			newcell.setAttribute("width", position); // StartTime!
			newrow.appendChild(newcell);
			
			//Create coloured density indicator/////////////////////////////////////////////
			duration=Math.round(((linkObjectArray[i].etime-linkObjectArray[i].stime)/movieEndTime)*this.innerwidth)+"px"		
			durcell=document.createElement("td"); // Create table cell
			durcell.setAttribute("width", duration); // width representative of link duration
			durcell.setAttribute("id", "link"+i);
			/////////////////
			durcell.className="durCell";
			////////////////
			// If NS or other Gecko browser, insert a nbsp element inside empty cell
			// So that it is rendered properly
			if (BrowserIsNS) {
				this.addEmptyCell(newcell);
				this.addEmptyCell(durcell);
				durcell.setAttribute("onClick", "javascript:ShowClip(" + i + ")");
				// Change the cursor                                                //changed by JR
				durcell.setAttribute("style", "cursor: pointer;");
				newrow.appendChild(durcell);
			} else { // IE
				barlink=document.createElement("a");
				barlink.setAttribute("href", "javascript:ShowClip(" + i + ")");
				// Change the cursor for mouseover to 'hand'
				durcell.onmouseover=durcell.style.cursor='hand';
				barlink.appendChild(durcell);
				newrow.appendChild(barlink);
			}
		}
	}
	endspace=document.createElement("td");
	enddur=Math.round(((movieEndTime-linkObjectArray[numlinks-1].etime)/movieEndTime)*this.innerwidth)+"px"
	if (enddur != "0px"){
		endspace.setAttribute("width", enddur); // Fill up the rest of the table that is not necessary.
		newrow.appendChild(endspace);	
		if (BrowserIsNS) 
			this.addEmptyCell(endspace);
	}
	// Add buffer space graphic between end of bar and buttons//////////////changed by JR
	buffercell=document.createElement("td");
	buffercell.setAttribute("width", "55px");                                 
	bufferimg=new Image();
	bufferimg.setAttribute("src", this.imagepath + "density-right.png");
	bufferimg.setAttribute("border", 0);
	bufferimg.setAttribute("width", 55);
	buffercell.appendChild(bufferimg);
	newrow.appendChild(buffercell);	
	tblbody.appendChild(newrow)
	document.getElementById("tblDensity").appendChild(tblbody);
}

function ClearCells() {
	for (var i=0; i<linkObjectArray.length; i++) {
		if (i==0) 
			position=Math.round((linkObjectArray[i].stime/movieEndTime)*this.innerwidth) +"px" // we are at the first link
		else {
			// Must be sure we account for the width taken up by previous link
			position=Math.round(((linkObjectArray[i].stime-linkObjectArray[i-1].etime)/movieEndTime)*this.innerwidth)+"px"
		}
		if (position != "0px") {
			curCell = document.getElementById("link"+i);
			if (BrowserIsNS) 
				curCell.setAttribute("style", "background-color:" + this.LinkColour);
			else 
				curCell.style.backgroundColor=this.LinkColour;
		}
	}
}
function ShowActive(current) {
	currentCell = document.getElementById("link"+current);
	this.ClearCells();
		if (BrowserIsNS) 
			currentCell.setAttribute("style", "background-color:"+this.ActiveColour);
		else 
			currentCell.style.backgroundColor=this.ActiveColour;
}

function addEmptyCell(cell) {
//html markup must have an empty td (only containing &nbsp) and id=nbsp
	if (BrowserIsNS) {
		emptyCell = document.createTextNode("\u00A0"); // get tag with nbsp element
		cell.appendChild(emptyCell);
	}
}

function createHref(innerElement, hrefString) {
	newLink=document.createElement("a");
	newLink.setAttribute("href", hrefString);
	newLink.appendChild(innerElement);
	return newLink;
}