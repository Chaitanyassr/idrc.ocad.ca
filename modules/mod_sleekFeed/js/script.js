/* Configuration: */
var $j = jQuery.noConflict();

function showTab(key)
{
	var obj = tabs[key];
	if(!obj) return false;
	
	var stage = $j('#tabContent');
	
	/* Forming the query: */
	var query = "select * from feed where url='"+obj.feed+"' LIMIT 5";
	
	/* Forming the URL to YQL: */
	var url = "http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(query)+"&format=json&callback=?";
	
	$j.getJSON(url,function(data){

		stage.empty();

		/* item exists in RSS and entry in ATOM feeds: */
		$j.each(data.query.results.item || data.query.results.entry,function(){
			try{
				/* Trying to call the user provided function, "this" the rest of the feed data: */
				stage.append(obj['function'](this));
				
			}
			catch(e){
				/* Notifying users if there are any problems with their handler functions: */
				var f_name =obj['function'].toString().match(/function\s+(\w+)\(/i);
				if(f_name) f_name = f_name[1];
				
				stage.append('<div>There is a problem with your '+f_name+ ' function</div>');
				return false;
			}
		})
	});
	
	$j('#activeTab').text(key);
}

function showDropDown()
{
	if(totalTabs<2) return false;
	
	if($j('#feedWidget .dropDownList').length)
	{
		/* If the drop down is already shown, hide it: */
		$j('.dropDownList').slideUp('fast',function(){ $j(this).remove(); })
		return false;
	}
	
	var activeTab = $j('#activeTab');
	
	var offsetTop = (activeTab.offset().top - $j('#feedWidget').offset().top )+activeTab.outerHeight() - 5;
	
	/* Creating the drop down div on the fly: */
	var dropDown = $j('<div>').addClass('dropDownList').css({

			'top'	: offsetTop,
			'width'	: activeTab.width()
	
	}).hide().appendTo('#feedWidget')
	
	$j.each(tabs,function(j){
		/* Populating the div with the tabs that are not currently shown: */
		if(j==activeTab.text()) return true;
		
			$j('<div>').text(j).appendTo(dropDown);
	})
	
	dropDown.slideDown('fast');
}

function twitter(item)
{
	/* Formats the tweets, by turning hashtags, mentions an URLS into proper hyperlinks: */
	return $j('<div>').html(
			formatString(item.description || item.title)+
			' <a href="'+(item.link || item.origLink)+'" target="_blank">[tweet]</a>'
	);
}

function rss(item)
{
	return $j('<div>').html(
			formatString(item.title.content || item.title)+
			' <a href="'+(item.origLink || item.link[0].href || item.link)+'" target="_blank">[read]</a>'
	);
}

function formatString(str)
{
	/* twitter function/ */
	str = str.replace(/<[^>]+>/ig,'');
	str=' '+str;
	str = str.replace(/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?)/gm,'<a href="$1" target="_blank">$1</a>');
	str = str.replace(/([^\w])\@([\w\-]+)/gm,'$1@<a href="http://twitter.com/$2" target="_blank">$2</a>');
	str = str.replace(/([^\w])\#([\w\-]+)/gm,'$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
	return str;
}