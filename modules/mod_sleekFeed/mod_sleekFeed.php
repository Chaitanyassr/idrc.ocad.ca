<?php
/**
/**
*Author: Vipin Sahu
*Mail: sahu.vipin@gmail.com
*URL:www.webkul.com
**/

defined('_JEXEC') or die('Restricted access');


//params
$subject0	= trim( $params->get( 'subject0' ) );
$subject1	= trim( $params->get( 'subject1' ) );
$subject2	= trim( $params->get( 'subject2' ) );
$subject3	= trim( $params->get( 'subject3' ) );
$subject4	= trim( $params->get( 'subject4' ) );
$subject5	= trim( $params->get( 'subject5' ) );

$linksub0	= trim( $params->get( 'linksub0' ) );
$linksub1	= trim( $params->get( 'linksub1' ) );
$linksub2	= trim( $params->get( 'linksub2' ) );
$linksub3	= trim( $params->get( 'linksub3' ) );
$linksub4	= trim( $params->get( 'linksub4' ) );
$linksub5	= trim( $params->get( 'linksub5' ) );

$modwidth	= trim( $params->get( 'modwidth' ) );
$bgcolor	= trim( $params->get( 'bgcolor' ) );
$defaultab = $params->get( 'defaultab',$subject1 );
$jqueryload = $params->get( 'jqueryload' );
?>

<style type="text/css">
#feedWidget{
			width:<?php echo $modwidth."px" ;?>;
			background:<?php echo $bgcolor ;?>;
		   }
</style>
<?php if($jqueryload=="Yes"){ ?>
<script type="text/javascript" src="modules/mod_sleekFeed/js/jquery.js"></script>
<?php } ?>
<script type="text/javascript" src="modules/mod_sleekFeed/js/script.js"></script>
<link rel="stylesheet" type="text/css" href="modules/mod_sleekFeed/styles.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript"> var $j = jQuery.noConflict();

</script>

<script type="text/javascript">
var tabs = {
	"<?php echo $subject0; ?>" : {
		"feed"		: "<?php echo $linksub0 ; ?>",
		"function"	: rss
	},
	
	"<?php echo $subject1; ?>": {
		"feed"		: "<?php echo  $linksub1 ;?> ",
		"function"	: rss
	},
	
	"<?php echo $subject2; ?>": {
		"feed"		: "<?php echo  $linksub2 ;?>",
		"function"	: rss
	},
	
	"<?php echo $subject3; ?>" : {
		"feed"		: "<?php echo  $linksub3 ;?>",
		"function"	: rss
	},
	
	"<?php echo $subject4; ?>" : {
		"feed"		: "<?php echo  $linksub4 ;?>",
		"function"	: rss
	},
	
	"<?php echo $subject5; ?>" : {
		"feed"		: "<?php echo  $linksub5 ;?>",
		"function"	: rss
	}
}

var totalTabs;
$j(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */
	
	/* Counting the tabs */
	totalTabs=0;
	$j.each(tabs,function(){totalTabs++;})
	

	$j('#feedWidget').show().mouseleave(function(){
		
		/* If the cursor left the widet, hide the drop down list: */
		$j('.dropDownList').remove();
		$j('#activeTab').removeClass('hover');

	}).mouseenter(function(){
		
		if(totalTabs>1) $j('#activeTab').addClass('hover');
		
	});

	$j('#activeTab').click(showDropDown);

	/* Using the live method to bind an event, because the .dropDownList does not exist yet: */
	$j('.dropDownList div').live('click',function(){
		
		/* Calling the showDropDown function, when the drop down is already shown, will hide it: */
		showDropDown();
		showTab($j(this).text());
	});
	
	
	/* Showing one of the tabs on load: */
	showTab('<?php echo $$defaultab; ?>');
	
});
</script>
<title>head</title><div id="feedWidget">
	<div id="activeTab">
    	<!-- The name of the current tab is inserted here -->
    </div>
    
    <div class="line"></div>
    
    <div id="tabContent">
    	<!-- The feed items are inserted here -->
    </div>
</div>
