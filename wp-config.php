<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'idrc_wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'whatupyo');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '^a&iSV#K+g]*|`QEyO2^/x`neb2x:9xU8oKgj1MjN6q9b@o(a.J7$b1)D:Xw^s/H');
define('SECURE_AUTH_KEY',  'GV6)/RzNxZ/UCkcMPk2e[p_rJ<b8VwX; ]!G^Z%< (|_;tn(L*|%<oriL he<xuK');
define('LOGGED_IN_KEY',    'G|0kNo3LO9qD1|4H:`2_V `j-;,!-,BJR/FQBItu?YT>!tVR^6i:TQ+&-!$0;V9Z');
define('NONCE_KEY',        'abP=VpRyoTgONh=TX7#8/h?YZjm>^`@K01/MC{`tW<_<roDI:,#0pJ(=7S/{#L:>');
define('AUTH_SALT',        'tU=+kV&;O40ROH|y>Y&T8!7&-YI%#-ecC.!cbl{q.c,Tmbz%>|EWJ3a#!ycpzn<5');
define('SECURE_AUTH_SALT', 'YXTz5|(+4P </-JN!=+FKT<Pe}:p~!KfyF+_x3t7T<40t:vHyA(fd4l=U0/,9F!4');
define('LOGGED_IN_SALT',   'u|:kZb1pf@{}e)%2Ceeo5?UE#9^BMTx]8x7|qQ4GGEzsJ3nwB<gd-)tor,fy]JKE');
define('NONCE_SALT',       '( kR_ZriLIjdeLg?,F1x-% +=0sMo%P<`5+:5?Ea=v}]@Ks.y)`iHM?k<ZGWR-[5');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
