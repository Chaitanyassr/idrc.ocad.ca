<?php defined( '_VALID_MOS' ) or die( 'Direct Access to this location is not allowed.' ); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php $iso = split( '=', _ISO );
echo '<?xml version="1.0" encoding="'. $iso[1] .'"?' .'>';
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; <?php echo _ISO; ?>" />
<?php mosShowHead(); 
if ( $my->id ) { initEditor(); } ?>
<link href="<?php echo $mosConfig_live_site.'/templates/'.$mainframe->getTemplate().'/css/template_css.css'; ?>" rel="stylesheet" type="text/css" />

<!--[if IE]>
	<link href="<?php echo $mosConfig_live_site.'/templates/'.$mainframe->getTemplate().'/css/ie8hacks.css'; ?>" rel="stylesheet" />
<![endif]-->

<!--[if IE 7]>
	<link href="<?php echo $mosConfig_live_site.'/templates/'.$mainframe->getTemplate().'/css/iehacks.css'; ?>" rel="stylesheet" />
<![endif]-->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>



</head>

<body id="body-bg">

<div id="accessibility">
	<a href="#to-content">Skip to Content</a>
</div>

<div id="container">
	<div id="banner">&nbsp;</div>

	<h1 id="title"><a href="index.php" title="Inclusive Design Research Centre">Inclusive Design Research Centre</a>
	<span id="subtitle">
	<a href="http://www.ocad.ca">OCAD University</a></span></h1>

	<div id="content">
		<div id="left-content">	
			<a name="menu"></a>
			<div id="nav-mid">
			<?php mosLoadModules ( 'left', -1 ); ?>		
			<div id="nav-bottom">&nbsp;</div>
			</div>
		</div>

		<div id="main-content">
			<a name="to-content"></a>
			
<div id="path">
<jdoc:include type="module" name="breadcrumbs" />
</div>

			
			<?php mosMainBody(); ?>
			<?php mosLoadModules ( 'user7' ); ?>
		</div>
		<div style="clear:both;"></div>
	</div>

	<div id="footer">&copy; <acronym title="Inclusive Design Research  Centre">IDRC</acronym> <?php echo date('Y'); ?>. All Rights Reserved.</div>
</div>

<jdoc:include type="modules" name="googleanalytics" style="raw" />
</body>
</html>