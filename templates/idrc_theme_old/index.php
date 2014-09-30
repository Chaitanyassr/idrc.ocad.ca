<?php
/**
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters. All rights reserved.
 * @license		GNU/GPL, see LICENSE.php
 * Joomla! is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 * See COPYRIGHT.php for copyright notices and details.
 */

// No direct access.
defined('_JEXEC') or die;

// check modules
/*$showRightColumn	= ($this->countModules('position-3') or $this->countModules('position-6') or $this->countModules('position-8'));
$showbottom        = ($this->countModules('position-9') or $this->countModules('position-10') or $this->countModules('position-11'));
$showleft            = ($this->countModules('position-4') or $this->countModules('position-7') or $this->countModules('position-5'));

if ($showRightColumn==0 and $showleft==0) {
	$showno = 0;
}*/
JHTML::_('behavior.framework', true); 

// get params
$logo               = $this->params->get('logo');
$app             	= JFactory::getApplication();
$templateparams    	= $app->getTemplate(true)->params; 
$menu = JSite::getMenu();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>" >
<head>
	<jdoc:include type="head" />
	<?php $this->setTitle($app->getCfg('sitename')); ?>	
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />
	<?php if ($this->direction == 'rtl') : ?>
		<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/idrc_theme/css/template_rtl.css" type="text/css" />                
	<?php endif; ?>

	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/idrc_theme/css/fss/css/fss-reset.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/idrc_theme/css/fss/css/fss-layout.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/idrc_theme/css/template.css" type="text/css" />

<?php if ($this->countModules('right-top') || $this->countModules('right-bottom')) {
	echo "<style type='text/css'>#middle-col { margin-right: 270px; }</style>";
} ?>
<link href="css/template.css" rel="stylesheet" type="text/css" />
<link href="css/fss/css/fss-layout.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-17057267-7']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</head>

<body>
<div id="all" class="fl-container-flex90">
	<div class="fl-offScreen-hidden">
		<ul>
			<li><a href="#to-menu">Skip to Menu</a></li> 
			<li><a href="#to-content">Skip to Content</a></li>  
			<li><a href="#to-search">Skip to Search</a></li> 
		</ul>
	</div>
	<div id="header">
		<jdoc:include type="modules" name="header-top" />
		<div>
			<a href="http://idrc.ocad.ca"><img src="<?php echo $this->baseurl ?>/templates/idrc_theme/images/idilogo_blue.png" alt="IDRC Logo" class="fl-force-left" /></a>
			<div class="fl-force-left">
				<h1><a href="http://idrc.ocad.ca"><?php echo htmlspecialchars($app->getCfg('sitename'));?></a></h1>				
				<h2 class="tagline"><a href="http://ocad.ca">OCAD University</a></h2>
			</div>
		</div>
		<jdoc:include type="modules" name="header-bottom" />
	</div>
	
	<div id="main" class="fl-col-mixed-250 clearfix fl-push">
		<div id="left-col" class="fl-col-fixed fl-force-left">
			<a name="to-menu"></a>
			<jdoc:include type="modules" name="left-top" style="xhtml" />
			
			<div class="search-mod">
				<a name="to-search"></a>
				<jdoc:include type="modules" name="left-bottom" style="xhtml" />
			</div>					
		</div>	
		<div id="right-col" class="fl-col-fixed fl-force-right">
			<jdoc:include type="modules" name="right-top" style="xhtml" />
			<jdoc:include type="modules" name="right-bottom" style="xhtml" />			
		</div>
		
		<div id="middle-col" class="fl-col-flex">
			<?php if ($this->getBuffer('message')) : ?>
				<!-- <div class="error">
					<h2><?php echo JText::_('JNOTICE'); ?></h2>
					<jdoc:include type="message" />
				</div> -->
			<?php endif; ?>		
			<jdoc:include type="modules" name="middle-top" style="xhtml" />
			<jdoc:include type="modules" name="breadcrumbs" />
			<a name="to-content"></a>
			<jdoc:include type="component" style="xhtml" />						
			
			<?php if (JRequest::getVar('view') == 'featured'): ?>
			<div class="fl-col-flex2 home-feeds">
				<h2>Project Updates</h2>
				<div class="fl-col">
					<jdoc:include type="modules" name="middle-left" style="xhtml" />
				</div>		
				<div class="fl-col">
					<jdoc:include type="modules" name="middle-right" style="xhtml" />
				</div>	
			</div>
			<?php endif; ?>
			
			<jdoc:include type="modules" name="middle-bottom" style="xhtml" />			
		</div>		
	</div>

	<div id="footer">
		<jdoc:include type="modules" name="footer" />
		&copy; IDRC 2012. Creative Commons 3.0 Attribution.<br />
		In remembrance of <a href="index.php/about-the-idrc/staff-pages/359-in-remembrance-of-jon-kameoka">Jon Kameoka</a>.
	</div>			
	
</div>	
<jdoc:include type="modules" name="debug" />

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-22200857-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>
