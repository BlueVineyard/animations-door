<?php
/**
 * Plugin Name: Open Gate Animations
 * Plugin URI: https://opengatecreative.com
 * Description: Custom scroll-based animations for Open Gate Creative Films - includes home animation, about spread, services cards, and approach timeline.
 * Version: 1.0.0
 * Author: Open Gate Creative
 * Author URI: https://opengatecreative.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: open-gate-animations
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('OGA_VERSION', '1.1.0');
define('OGA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('OGA_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include CPT and admin files
require_once OGA_PLUGIN_DIR . 'includes/cpt-service-cards.php';
require_once OGA_PLUGIN_DIR . 'includes/cpt-approach-steps.php';
require_once OGA_PLUGIN_DIR . 'includes/admin-settings.php';

/**
 * Enqueue plugin styles and scripts
 */
function oga_enqueue_assets() {
    // Enqueue main CSS
    wp_enqueue_style(
        'oga-styles',
        OGA_PLUGIN_URL . 'assets/css/animations.css',
        array(),
        OGA_VERSION
    );
}
add_action('wp_enqueue_scripts', 'oga_enqueue_assets');

/**
 * Enqueue animation-specific scripts
 */
function oga_enqueue_animation_script($animation_name) {
    wp_enqueue_script(
        'oga-' . $animation_name,
        OGA_PLUGIN_URL . 'assets/js/' . $animation_name . '.js',
        array(),
        OGA_VERSION,
        true
    );
}

/**
 * Shortcode: [oga_home_animation]
 */
function oga_home_animation_shortcode($atts) {
    oga_enqueue_animation_script('home-animation');
    
    // Get saved settings as defaults
    $defaults = array(
        'title' => get_option('oga_home_title', 'CRAFTING'),
        'highlight' => get_option('oga_home_highlight', 'VISUAL STORIES'),
        'subtitle' => get_option('oga_home_subtitle', 'That captivate, inspire, and drive results through compelling video production and creative direction.'),
        'cta' => get_option('oga_home_cta', 'START A PROJECT'),
    );
    
    $atts = shortcode_atts($defaults, $atts);
    
    ob_start();
    include OGA_PLUGIN_DIR . 'templates/home-animation.php';
    return ob_get_clean();
}
add_shortcode('oga_home_animation', 'oga_home_animation_shortcode');

/**
 * Shortcode: [oga_about_spread]
 */
function oga_about_spread_shortcode($atts) {
    oga_enqueue_animation_script('about-spread');
    
    // Get saved settings as defaults
    $defaults = array(
        'title' => get_option('oga_about_title', 'ABOUT US'),
        'description' => get_option('oga_about_description', 'We are a creative film production company specializing in visual storytelling.'),
        'cta' => get_option('oga_about_cta', 'LEARN MORE'),
        'image1' => get_option('oga_about_image_1', OGA_PLUGIN_URL . 'assets/images/about-1.jpg'),
        'image2' => get_option('oga_about_image_2', OGA_PLUGIN_URL . 'assets/images/about-2.jpg'),
        'image3' => get_option('oga_about_image_3', OGA_PLUGIN_URL . 'assets/images/about-3.jpg'),
    );
    
    $atts = shortcode_atts($defaults, $atts);
    
    ob_start();
    include OGA_PLUGIN_DIR . 'templates/about-spread.php';
    return ob_get_clean();
}
add_shortcode('oga_about_spread', 'oga_about_spread_shortcode');

/**
 * Shortcode: [oga_services_cards]
 */
function oga_services_cards_shortcode($atts) {
    oga_enqueue_animation_script('services-cards');
    
    ob_start();
    include OGA_PLUGIN_DIR . 'templates/services-cards.php';
    return ob_get_clean();
}
add_shortcode('oga_services_cards', 'oga_services_cards_shortcode');

/**
 * Shortcode: [oga_approach_timeline]
 */
function oga_approach_timeline_shortcode($atts) {
    oga_enqueue_animation_script('approach-timeline');
    
    ob_start();
    include OGA_PLUGIN_DIR . 'templates/approach-timeline.php';
    return ob_get_clean();
}
add_shortcode('oga_approach_timeline', 'oga_approach_timeline_shortcode');
