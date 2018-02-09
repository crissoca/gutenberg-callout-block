<?php
/**
 * Plugin Name: Gutenberg callout block
 * Plugin URI: https://github.com/ptasker
 * Description: Gutenberg callout black - a way to make a left or right aligned image and text region
 * Author: Peter Tasker
 * Author URI: http://petetasker.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
