// JavaScript Document

// Class ASLXML
/* contains all functions related to the XML file
*/

function ASLXML() 
{
this.notWhitespace = /\S/  //Regex to identify whitespace
this.xDoc;

this.CreateXMLFile = CreateXMLFile;
this.Populate = Populate;
this.CleanWhitespace = CleanWhitespace;
this.GetElements = GetElements;
}

function CreateXMLFile()
{
	if (BrowserIsNS==true) {
		this.xDoc = document.implementation.createDocument("", "", null);
	} else {
		this.xDoc = new ActiveXObject("Microsoft.XMLDOM");
		// async property ensure thats the XML is loaded before any other operations are performed
		this.xDoc.async=false;
	}
}

function Populate(file)
{
	this.xDoc.load(file);
}

// Returns an array of requested Elements by TagName
function GetElements(TagName)
{
	return this.xDoc.getElementsByTagName(TagName);
}

// WHITESPACE CODE 
// Mozilla/Gecko reads all spaces and page breaks as whitespace nodes.  The XML document must first be normalized
function CleanWhitespace(node) {
  for (var x = 0; x < node.childNodes.length; x++) {
    var childNode = node.childNodes[x];
    if ((childNode.nodeType == 3)&&(!this.notWhitespace.test(childNode.nodeValue))) {
	// that is, if it's a whitespace text node
      node.removeChild(node.childNodes[x]);
      x--;
    }
    if (childNode.nodeType == 1) {
	// elements can have text child nodes of their own
      this.CleanWhitespace(childNode);
    }
  }
}