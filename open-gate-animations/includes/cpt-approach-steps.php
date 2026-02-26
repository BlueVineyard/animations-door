<?php
/**
 * Custom Post Type: Approach Steps
 * Allows users to add/edit/remove timeline steps dynamically
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Approach Steps Custom Post Type
 */
function oga_register_approach_steps_cpt() {
    $labels = array(
        'name'                  => _x('Approach Steps', 'Post Type General Name', 'open-gate-animations'),
        'singular_name'         => _x('Approach Step', 'Post Type Singular Name', 'open-gate-animations'),
        'menu_name'             => __('Approach Steps', 'open-gate-animations'),
        'name_admin_bar'        => __('Approach Step', 'open-gate-animations'),
        'archives'              => __('Approach Archives', 'open-gate-animations'),
        'attributes'            => __('Approach Attributes', 'open-gate-animations'),
        'parent_item_colon'     => __('Parent Step:', 'open-gate-animations'),
        'all_items'             => __('All Steps', 'open-gate-animations'),
        'add_new_item'          => __('Add New Step', 'open-gate-animations'),
        'add_new'               => __('Add New', 'open-gate-animations'),
        'new_item'              => __('New Step', 'open-gate-animations'),
        'edit_item'             => __('Edit Step', 'open-gate-animations'),
        'update_item'           => __('Update Step', 'open-gate-animations'),
        'view_item'             => __('View Step', 'open-gate-animations'),
        'view_items'            => __('View Steps', 'open-gate-animations'),
        'search_items'          => __('Search Step', 'open-gate-animations'),
        'not_found'             => __('Not found', 'open-gate-animations'),
        'not_found_in_trash'    => __('Not found in Trash', 'open-gate-animations'),
        'featured_image'        => __('Step Image', 'open-gate-animations'),
        'set_featured_image'    => __('Set step image', 'open-gate-animations'),
        'remove_featured_image' => __('Remove step image', 'open-gate-animations'),
        'use_featured_image'    => __('Use as step image', 'open-gate-animations'),
    );

    $args = array(
        'label'                 => __('Approach Step', 'open-gate-animations'),
        'description'           => __('Timeline steps for the approach animation', 'open-gate-animations'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'thumbnail', 'page-attributes'),
        'hierarchical'          => false,
        'public'                => false,
        'show_ui'               => true,
        'show_in_menu'          => 'oga-animations',
        'menu_position'         => 21,
        'menu_icon'             => 'dashicons-analytics',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => false,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => false,
        'capability_type'       => 'post',
        'show_in_rest'          => false,
    );

    register_post_type('oga_approach_step', $args);
}
add_action('init', 'oga_register_approach_steps_cpt', 0);

/**
 * Add custom meta boxes for approach steps
 */
function oga_approach_step_meta_boxes() {
    add_meta_box(
        'oga_approach_step_details',
        __('Approach Step Details', 'open-gate-animations'),
        'oga_approach_step_details_callback',
        'oga_approach_step',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'oga_approach_step_meta_boxes');

/**
 * Meta box callback function
 */
function oga_approach_step_details_callback($post) {
    // Add nonce for security
    wp_nonce_field('oga_approach_step_meta_box', 'oga_approach_step_meta_box_nonce');

    // Retrieve existing values
    $bold_part = get_post_meta($post->ID, '_oga_step_bold_part', true);
    $description = get_post_meta($post->ID, '_oga_step_description', true);

    ?>
    <table class="form-table">
        <tr>
            <th>
                <label for="oga_step_bold_part"><?php _e('Bold Text Part', 'open-gate-animations'); ?></label>
            </th>
            <td>
                <textarea id="oga_step_bold_part" name="oga_step_bold_part" 
                          rows="3" style="width: 100%;"><?php echo esc_textarea($bold_part); ?></textarea>
                <p class="description"><?php _e('The first part of the description (will be bold and uppercase)', 'open-gate-animations'); ?></p>
            </td>
        </tr>
        <tr>
            <th>
                <label for="oga_step_description"><?php _e('Regular Text Part', 'open-gate-animations'); ?></label>
            </th>
            <td>
                <textarea id="oga_step_description" name="oga_step_description" 
                          rows="2" style="width: 100%;"><?php echo esc_textarea($description); ?></textarea>
                <p class="description"><?php _e('The continuation of the description (regular weight, uppercase)', 'open-gate-animations'); ?></p>
            </td>
        </tr>
    </table>
    <p><strong><?php _e('Note:', 'open-gate-animations'); ?></strong> 
       <?php _e('Set the step title (e.g., "DISCOVER", "CREATE") above, and upload a featured image for the timeline step.', 'open-gate-animations'); ?>
    </p>
    <p><strong><?php _e('Order:', 'open-gate-animations'); ?></strong> 
       <?php _e('Use the "Order" field in the "Page Attributes" box to control the display order.', 'open-gate-animations'); ?>
    </p>
    <?php
}

/**
 * Save meta box data
 */
function oga_save_approach_step_meta_box($post_id) {
    // Check if nonce is set
    if (!isset($_POST['oga_approach_step_meta_box_nonce'])) {
        return;
    }

    // Verify nonce
    if (!wp_verify_nonce($_POST['oga_approach_step_meta_box_nonce'], 'oga_approach_step_meta_box')) {
        return;
    }

    // Check if this is an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check user permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Save bold part
    if (isset($_POST['oga_step_bold_part'])) {
        update_post_meta($post_id, '_oga_step_bold_part', sanitize_textarea_field($_POST['oga_step_bold_part']));
    }

    // Save description
    if (isset($_POST['oga_step_description'])) {
        update_post_meta($post_id, '_oga_step_description', sanitize_textarea_field($_POST['oga_step_description']));
    }
}
add_action('save_post', 'oga_save_approach_step_meta_box');

/**
 * Add custom columns to approach steps list
 */
function oga_approach_step_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['featured_image'] = __('Image', 'open-gate-animations');
    $new_columns['title'] = $columns['title'];
    $new_columns['order'] = __('Order', 'open-gate-animations');
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_oga_approach_step_posts_columns', 'oga_approach_step_columns');

/**
 * Populate custom columns
 */
function oga_approach_step_custom_column($column, $post_id) {
    switch ($column) {
        case 'featured_image':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, array(50, 50));
            } else {
                echo '—';
            }
            break;
        case 'order':
            $order = get_post_field('menu_order', $post_id);
            echo esc_html($order);
            break;
    }
}
add_action('manage_oga_approach_step_posts_custom_column', 'oga_approach_step_custom_column', 10, 2);

/**
 * Make columns sortable
 */
function oga_approach_step_sortable_columns($columns) {
    $columns['order'] = 'menu_order';
    return $columns;
}
add_filter('manage_edit-oga_approach_step_sortable_columns', 'oga_approach_step_sortable_columns');

/**
 * Get all approach steps for display
 */
function oga_get_approach_steps() {
    $args = array(
        'post_type'      => 'oga_approach_step',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
        'post_status'    => 'publish',
    );

    $query = new WP_Query($args);
    $steps = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();

            $steps[] = array(
                'title'       => get_the_title(),
                'boldPart'    => get_post_meta($post_id, '_oga_step_bold_part', true),
                'description' => get_post_meta($post_id, '_oga_step_description', true),
                'image'       => get_the_post_thumbnail_url($post_id, 'large'),
            );
        }
        wp_reset_postdata();
    }

    return $steps;
}
