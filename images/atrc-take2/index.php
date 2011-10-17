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
	<link href="<?php echo $mosConfig_live_site.'/templates/'.$mainframe->getTemplate().'/css/iehacks.css'; ?>" rel="stylesheet" />
<![endif]-->

</head>

<body id="body-bg">

<div id="accessibility">
	<a href="#to-content">Skip to Content</a>
</div>

<div id="container">
	<div id="banner">&nbsp;</div>

	<h1 id="title"><a href="index.php" title="Adaptive Technology Resource Centre, University of Toronto">Adaptive Technology Resource Centre</a>
	<span id="subtitle"><a href="http://www.fis.utoronto.ca"><img src="/fis_logo.gif" border="0" style="vertical-align:bottom" alt="Faculty of Information logo" height="18" width="14"/>Faculty of Information</a>
	<a href="http://www.utoronto.ca">University of Toronto</a></span></h1>

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

			<div id="path"><?php mosPathWay(); ?></div>

			<?php mosMainBody(); ?>
			<?php mosLoadModules ( 'user7' ); ?>
		</div>
		<div style="clear:both;"></div>
	</div>

	<div id="footer">&copy; <acronym title="Adaptive Technology Resource Centre">ATRC</acronym> <?php echo date('Y'); ?>. All Rights Reserved.</div>
</div>


</body>
</html>