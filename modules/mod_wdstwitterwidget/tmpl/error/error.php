<?php
	/**
	* @package		WDS Twitter Widget
	* @copyright	Web Design Services. All rights reserved. All rights reserved.
	* @license		GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html
	*/

	// no direct access
	defined('_JEXEC') or die;
?>

<div id="wds">
<?php if(isset($curlDisabled)): ?>
Your PHP doesn't have cURL extension enabled. Please contact your host and ask them to enable it.
<?php else: ?>
It seems that module parameters haven't been configured properly. Please make sure that you are using a valid twitter username, and
that you have inserted the correct keys. Detailed instructions are written in the module settings page.
<?php endif; ?>
</div>
