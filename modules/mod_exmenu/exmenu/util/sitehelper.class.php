<?php
/**
* @version $Id: sitehelper.class.php 508 2011-02-23 01:38:58Z  $
* @author Daniel Ecer
* @package exmenu
* @copyright (C) 2005-2011 Daniel Ecer (de.siteof.de)
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
*/

// no direct access
if (!defined('EXTENDED_MENU_HOME')) {
	die('Restricted access');
}


class de_siteof_exmenu_SiteHelper {

	// Hold an instance of the class
    private static $instance;

	var $_joomla15 = FALSE;
	var $_joomla16 = FALSE;
	var $_absolutePath = FALSE;
	var $_rootUri = FALSE;
	var $_siteTemplate = FALSE;
	var $_currentMenuId = FALSE;

	private function __construct() {
		if (function_exists('jimport')) {
			$version = new JVersion();
			$application = JFactory::getApplication();
			$this->_joomla15 = TRUE;
			$this->_joomla16 = ($version->RELEASE >= '1.6');
			$this->_absolutePath = JPATH_SITE;
			$this->_rootUri = JURI::root();
			$this->_siteTemplate = ''.$application->getTemplate();
			$this->_currentMenuId = JRequest::getInt('Itemid');
		} else {
			$this->_absolutePath = $GLOBALS['mosConfig_absolute_path'];
			$this->_rootUri = $GLOBALS['mosConfig_live_site'];
			if ($this->_rootUri != '') {
				$this->_rootUri .= '/';
			}
			$this->_siteTemplate = $GLOBALS['cur_template'];
			$this->_currentMenuId = $GLOBALS['Itemid'];
		}
	}

	private function de_siteof_exmenu_SiteHelper() {
		$this->__construct();
	}

	/**
     * Returns new or existing Singleton instance
     * @return Singleton
     */
    final public static function getInstance() {
    	if (!isset(self::$instance)) {
            $c = __CLASS__;
            self::$instance = new $c;
        }

        return self::$instance;
    }


	function isJoomla15() {
		return $this->_joomla15;
	}


	function isJoomla16() {
		return $this->_joomla16;
	}


	function getAbsolutePath($name = '') {
		$path = $this->_absolutePath;
		if ($name != '') {
			$path = $path.'/'.$name;
		}
		return $path;
	}


	function getUri($name = FALSE) {
		$uri = $this->_rootUri;
		if ($name != '') {
			$uri = $uri.$name;
		}
		return $uri;
	}


	function getSiteTemplateName() {
		return $this->_siteTemplate;
	}


	function getSiteTemplateUri($name = FALSE) {
		$uri = $this->getUri('templates/'.$this->_siteTemplate);
		if ($name != '') {
			$uri = $uri.'/'.$name;
		}
		return $uri;
	}


	function getCurrentMenuId() {
		return $this->_currentMenuId;
	}

}


?>