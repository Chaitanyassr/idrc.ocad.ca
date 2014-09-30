<?php
/**
 * @package		WDS Twitter Widget
 * @copyright	Web Design Services. All rights reserved. All rights reserved.
 * @license		GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html
 */

// no direct access
defined('_JEXEC') or die;

// Include the helper file
require_once dirname(__FILE__).'/helper.php';

// if cURL is disabled, then extension cannot work
if(!is_callable('curl_init')){
	$data = false;
	$curlDisabled = true;
}
else {
	$model = new modWdstwitterwidgetHelper();
	$model->addStyles($params);
	$data = $model->getData($params);
}

if($data) {
	require JModuleHelper::getLayoutPath('mod_wdstwitterwidget', $params->get('layout', 'default'));
}
else {
	require JModuleHelper::getLayoutPath('mod_wdstwitterwidget', 'error/error');
}
