<?php
	/**
	* @package		WDS Twitter Widget
	* @copyright	Web Design Services. All rights reserved. All rights reserved.
	* @license		GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html
	*/

	// no direct access
	defined('_JEXEC') or die;

	require_once dirname(__FILE__).'/lib/twitteroauth/twitteroauth.php';
	require_once dirname(__FILE__).'/lib/twitter-text/Autolink.php';
	require_once dirname(__FILE__).'/lib/twitter-text/Extractor.php';
	require_once dirname(__FILE__).'/lib/twitter-text/HitHighlighter.php';
 if(!class_exists('modWdstwitterwidgetHelper',false)) {
	class modWdstwitterwidgetHelper
	{
		private $data;
		private $cacheFile;

		public function __construct() {
			$this->cacheFile = dirname(__FILE__) . '/cache';
		}

		public function getData($params) {
			$twitterConnection = new TwitterOAuth(
				trim($params->get('consumer_key', '')), // Consumer Key
				trim($params->get('consumer_secret', '')), // Consumer secret
				trim($params->get('access_token', '')), // Access token
				trim($params->get('access_secret', ''))	// Access token secret
			);

			if($params->get('type', 1)) {
				$twitterData = $twitterConnection->get(
					'statuses/user_timeline',
					array(
						'screen_name' => trim($params->get('username', 'twitter')),
						'count' => trim($params->get('count', 5)),
					)
				);
			}
			else {
				$twitterData = $twitterConnection->get(
					'search/tweets',
					array(
						'q' => trim($params->get('query', '')),
						'count' => trim($params->get('count', 5)),
					)
				);
				if(!isset($twitterData->errors))
					$twitterData = $twitterData->statuses;
			}

			// if there are no errors
			if(!isset($twitterData->errors)) {
				$tweets = array();
					if(!isset($twitterData->errors)) {
				foreach($twitterData as $tweet) {
					$tweetDetails = new stdClass();
					$tweetDetails->text = Twitter_Autolink::create($tweet->text)->setNoFollow(false)->addLinks();
					$tweetDetails->time = $this->getTime($tweet->created_at);
					$tweetDetails->id = $tweet->id_str;
					$tweetDetails->screenName = $tweet->user->screen_name;
					$tweetDetails->displayName = $tweet->user->name;
					$tweetDetails->profileImage = $tweet->user->profile_image_url_https;

					$tweets[] = $tweetDetails;
				}
				}
				$data = new stdClass();
				$data->tweets = $tweets;

				$this->data = $data;
				$this->setCache();

				return $data;
			}
			else {
				return $this->getCache();
			}
		}
		
		public function addStyles($params) {
			$styles = '';
			$border = $params->get('border_color', '#ccc');
			$styles .= '#wds-tweets a {color: ' . $params->get('link_color', '#0084B4') . '}';
			$styles .= '#wds-container {background-color: ' . $params->get('bgd_color', '#fff') . '}';
			$styles .= '#wds-header {border-bottom-color: ' . $border . '}';
			$styles .= '#wds-container {border-color: ' . $border . '}';
			$styles .= '.wds-copyright {border-top-color: ' . $border . '}';
			$styles .= '.wds-tweet-container {border-bottom-color: ' . $border . '}';
			$styles .= '#wds {color: ' . $params->get('text_color', '#333') . '}';
			$styles .= 'a .wds-display-name {color: ' . $params->get('header_link_color', '#333') . '}';
			$styles .= 'a .wds-screen-name {color: ' . $params->get('header_sub_color', '#666') . '}';
			$styles .= 'a:hover .wds-screen-name {color: ' . $params->get('header_sub_hover_color', '#999') . '}';
			$styles .= '#wds-header, #wds-header a {color: ' . $params->get('search_title_color', '#333') . '}';
			if($params->get('width', '')) {
				$styles .= '#wds-container {width: ' . intval($params->get('width', '')) . 'px;}';
			}
			if($params->get('height', '')) {
				$styles .= '#wds {height: ' . intval($params->get('height', '')) . 'px; overflow: auto;}';
			}
			
			$doc = JFactory::getDocument();
			$doc->addStyleSheet(JURI::base() . 'modules/mod_wdstwitterwidget/css/wdstwitterwidget.css');
			$doc->addStyleDeclaration($styles);

		}

		private function setCache() {
			JFile::write($this->cacheFile, serialize($this->data));
		}

		private function getCache() {
			if(file_exists($this->cacheFile)) {
				$cache = JFile::read($this->cacheFile);
				if($cache !== false)
					return unserialize(JFile::read($this->cacheFile));
			}
			return false;
		}

		// parse time in a twitter style
		private function getTime($date)
		{
			$timediff = time() - strtotime($date);
			if($timediff < 60)
				return $timediff . 's';
			else if($timediff < 3600)
				return intval(date('i', $timediff)) . 'm';
			else if($timediff < 86400)
				return round($timediff/60/60) . 'h';
			else
				return JHTML::_('date', $date, 'M d');
		}
	}
}