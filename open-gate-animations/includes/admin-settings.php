<?php
/**
 * Admin Settings Page
 * Provides settings for Home Animation and About Animation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add admin menu
 */
function oga_add_admin_menu() {
    // Main menu page
    add_menu_page(
        __('Animation Settings', 'open-gate-animations'),
        __('Animations', 'open-gate-animations'),
        'manage_options',
        'oga-animations',
        'oga_settings_page',
        'dashicons-format-video',
        30
    );

    // Settings submenu
    add_submenu_page(
        'oga-animations',
        __('Settings', 'open-gate-animations'),
        __('Settings', 'open-gate-animations'),
        'manage_options',
        'oga-animations',
        'oga_settings_page'
    );
}
add_action('admin_menu', 'oga_add_admin_menu');

/**
 * Register settings
 */
function oga_register_settings() {
    // Home Animation Settings
    register_setting('oga_home_settings', 'oga_home_title');
    register_setting('oga_home_settings', 'oga_home_highlight');
    register_setting('oga_home_settings', 'oga_home_subtitle');
    register_setting('oga_home_settings', 'oga_home_cta');

    // About Animation Settings
    register_setting('oga_about_settings', 'oga_about_title');
    register_setting('oga_about_settings', 'oga_about_description');
    register_setting('oga_about_settings', 'oga_about_cta');
    register_setting('oga_about_settings', 'oga_about_image_1');
    register_setting('oga_about_settings', 'oga_about_image_2');
    register_setting('oga_about_settings', 'oga_about_image_3');
}
add_action('admin_init', 'oga_register_settings');

/**
 * Enqueue admin scripts
 */
function oga_admin_enqueue_scripts($hook) {
    if ($hook !== 'toplevel_page_oga-animations') {
        return;
    }

    wp_enqueue_media();
    wp_enqueue_script('oga-admin-script', OGA_PLUGIN_URL . 'assets/js/admin-settings.js', array('jquery'), OGA_VERSION, true);
    wp_enqueue_style('oga-admin-style', OGA_PLUGIN_URL . 'assets/css/admin-settings.css', array(), OGA_VERSION);
}
add_action('admin_enqueue_scripts', 'oga_admin_enqueue_scripts');

/**
 * Settings page HTML
 */
function oga_settings_page() {
    // Check user capabilities
    if (!current_user_can('manage_options')) {
        return;
    }

    // Get current tab
    $active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'home';

    // Show success message if settings saved
    if (isset($_GET['settings-updated'])) {
        add_settings_error('oga_messages', 'oga_message', __('Settings Saved', 'open-gate-animations'), 'updated');
    }

    settings_errors('oga_messages');
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

        <h2 class="nav-tab-wrapper">
            <a href="?page=oga-animations&tab=home" class="nav-tab <?php echo $active_tab === 'home' ? 'nav-tab-active' : ''; ?>">
                <?php _e('Home Animation', 'open-gate-animations'); ?>
            </a>
            <a href="?page=oga-animations&tab=about" class="nav-tab <?php echo $active_tab === 'about' ? 'nav-tab-active' : ''; ?>">
                <?php _e('About Animation', 'open-gate-animations'); ?>
            </a>
        </h2>

        <form action="options.php" method="post">
            <?php
            if ($active_tab === 'home') {
                settings_fields('oga_home_settings');
                oga_home_settings_section();
            } else {
                settings_fields('oga_about_settings');
                oga_about_settings_section();
            }
            submit_button(__('Save Settings', 'open-gate-animations'));
            ?>
        </form>
    </div>
    <?php
}

/**
 * Home Animation Settings Section
 */
function oga_home_settings_section() {
    $title = get_option('oga_home_title', 'CRAFTING');
    $highlight = get_option('oga_home_highlight', 'VISUAL STORIES');
    $subtitle = get_option('oga_home_subtitle', 'That captivate, inspire, and drive results through compelling video production and creative direction.');
    $cta = get_option('oga_home_cta', 'START A PROJECT');
    ?>
    <div class="oga-settings-section">
        <h2><?php _e('Home Animation Settings', 'open-gate-animations'); ?></h2>
        <p><?php _e('Configure default values for the home animation. These can be overridden using shortcode attributes.', 'open-gate-animations'); ?></p>

        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="oga_home_title"><?php _e('Main Title', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <input type="text" id="oga_home_title" name="oga_home_title" 
                           value="<?php echo esc_attr($title); ?>" 
                           class="regular-text">
                    <p class="description"><?php _e('Main title text (e.g., "CRAFTING")', 'open-gate-animations'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="oga_home_highlight"><?php _e('Highlight Text', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <input type="text" id="oga_home_highlight" name="oga_home_highlight" 
                           value="<?php echo esc_attr($highlight); ?>" 
                           class="regular-text">
                    <p class="description"><?php _e('Highlighted phrase (2 words, e.g., "VISUAL STORIES")', 'open-gate-animations'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="oga_home_subtitle"><?php _e('Subtitle', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <textarea id="oga_home_subtitle" name="oga_home_subtitle" 
                              rows="3" class="large-text"><?php echo esc_textarea($subtitle); ?></textarea>
                    <p class="description"><?php _e('Subtitle text below the main title', 'open-gate-animations'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="oga_home_cta"><?php _e('Call-to-Action Button', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <input type="text" id="oga_home_cta" name="oga_home_cta" 
                           value="<?php echo esc_attr($cta); ?>" 
                           class="regular-text">
                    <p class="description"><?php _e('Button text (e.g., "START A PROJECT")', 'open-gate-animations'); ?></p>
                </td>
            </tr>
        </table>

        <div class="oga-shortcode-example">
            <h3><?php _e('Shortcode Usage', 'open-gate-animations'); ?></h3>
            <code>[oga_home_animation]</code>
            <p><?php _e('Or override settings:', 'open-gate-animations'); ?></p>
            <code>[oga_home_animation title="YOUR TITLE" highlight="YOUR HIGHLIGHT" cta="YOUR CTA"]</code>
        </div>
    </div>
    <?php
}

/**
 * About Animation Settings Section
 */
function oga_about_settings_section() {
    $title = get_option('oga_about_title', 'ABOUT US');
    $description = get_option('oga_about_description', 'We are a creative film production company specializing in visual storytelling.');
    $cta = get_option('oga_about_cta', 'LEARN MORE');
    $image1 = get_option('oga_about_image_1', '');
    $image2 = get_option('oga_about_image_2', '');
    $image3 = get_option('oga_about_image_3', '');
    ?>
    <div class="oga-settings-section">
        <h2><?php _e('About Animation Settings', 'open-gate-animations'); ?></h2>
        <p><?php _e('Configure default values for the about spread animation. These can be overridden using shortcode attributes.', 'open-gate-animations'); ?></p>

        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="oga_about_title"><?php _e('Title', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <input type="text" id="oga_about_title" name="oga_about_title" 
                           value="<?php echo esc_attr($title); ?>" 
                           class="regular-text">
                    <p class="description"><?php _e('Section title (e.g., "ABOUT US")', 'open-gate-animations'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="oga_about_description"><?php _e('Description', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <textarea id="oga_about_description" name="oga_about_description" 
                              rows="4" class="large-text"><?php echo esc_textarea($description); ?></textarea>
                    <p class="description"><?php _e('Description text for the about section', 'open-gate-animations'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="oga_about_cta"><?php _e('Call-to-Action Button', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <input type="text" id="oga_about_cta" name="oga_about_cta" 
                           value="<?php echo esc_attr($cta); ?>" 
                           class="regular-text">
                    <p class="description"><?php _e('Button text (e.g., "LEARN MORE")', 'open-gate-animations'); ?></p>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label><?php _e('Image 1 (Left)', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <div class="oga-image-upload">
                        <input type="hidden" id="oga_about_image_1" name="oga_about_image_1" 
                               value="<?php echo esc_attr($image1); ?>">
                        <img src="<?php echo esc_url($image1); ?>" class="oga-preview-image" 
                             style="max-width: 200px; height: auto; <?php echo $image1 ? '' : 'display:none;'; ?>">
                        <div>
                            <button type="button" class="button oga-upload-image-button" data-target="oga_about_image_1">
                                <?php _e('Upload Image', 'open-gate-animations'); ?>
                            </button>
                            <button type="button" class="button oga-remove-image-button" data-target="oga_about_image_1" 
                                    style="<?php echo $image1 ? '' : 'display:none;'; ?>">
                                <?php _e('Remove', 'open-gate-animations'); ?>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label><?php _e('Image 2 (Center)', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <div class="oga-image-upload">
                        <input type="hidden" id="oga_about_image_2" name="oga_about_image_2" 
                               value="<?php echo esc_attr($image2); ?>">
                        <img src="<?php echo esc_url($image2); ?>" class="oga-preview-image" 
                             style="max-width: 200px; height: auto; <?php echo $image2 ? '' : 'display:none;'; ?>">
                        <div>
                            <button type="button" class="button oga-upload-image-button" data-target="oga_about_image_2">
                                <?php _e('Upload Image', 'open-gate-animations'); ?>
                            </button>
                            <button type="button" class="button oga-remove-image-button" data-target="oga_about_image_2" 
                                    style="<?php echo $image2 ? '' : 'display:none;'; ?>">
                                <?php _e('Remove', 'open-gate-animations'); ?>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label><?php _e('Image 3 (Right)', 'open-gate-animations'); ?></label>
                </th>
                <td>
                    <div class="oga-image-upload">
                        <input type="hidden" id="oga_about_image_3" name="oga_about_image_3" 
                               value="<?php echo esc_attr($image3); ?>">
                        <img src="<?php echo esc_url($image3); ?>" class="oga-preview-image" 
                             style="max-width: 200px; height: auto; <?php echo $image3 ? '' : 'display:none;'; ?>">
                        <div>
                            <button type="button" class="button oga-upload-image-button" data-target="oga_about_image_3">
                                <?php _e('Upload Image', 'open-gate-animations'); ?>
                            </button>
                            <button type="button" class="button oga-remove-image-button" data-target="oga_about_image_3" 
                                    style="<?php echo $image3 ? '' : 'display:none;'; ?>">
                                <?php _e('Remove', 'open-gate-animations'); ?>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </table>

        <div class="oga-shortcode-example">
            <h3><?php _e('Shortcode Usage', 'open-gate-animations'); ?></h3>
            <code>[oga_about_spread]</code>
            <p><?php _e('Or override settings:', 'open-gate-animations'); ?></p>
            <code>[oga_about_spread title="YOUR TITLE" description="YOUR DESCRIPTION"]</code>
        </div>
    </div>
    <?php
}
