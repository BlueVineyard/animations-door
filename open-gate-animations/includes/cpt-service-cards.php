<?php
/**
 * Custom Post Type: Service Cards
 * Allows users to add/edit/remove service cards dynamically
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Service Cards Custom Post Type
 */
function oga_register_service_cards_cpt() {
    $labels = array(
        'name'                  => _x('Service Cards', 'Post Type General Name', 'open-gate-animations'),
        'singular_name'         => _x('Service Card', 'Post Type Singular Name', 'open-gate-animations'),
        'menu_name'             => __('Service Cards', 'open-gate-animations'),
        'name_admin_bar'        => __('Service Card', 'open-gate-animations'),
        'archives'              => __('Service Archives', 'open-gate-animations'),
        'attributes'            => __('Service Attributes', 'open-gate-animations'),
        'parent_item_colon'     => __('Parent Service:', 'open-gate-animations'),
        'all_items'             => __('All Services', 'open-gate-animations'),
        'add_new_item'          => __('Add New Service', 'open-gate-animations'),
        'add_new'               => __('Add New', 'open-gate-animations'),
        'new_item'              => __('New Service', 'open-gate-animations'),
        'edit_item'             => __('Edit Service', 'open-gate-animations'),
        'update_item'           => __('Update Service', 'open-gate-animations'),
        'view_item'             => __('View Service', 'open-gate-animations'),
        'view_items'            => __('View Services', 'open-gate-animations'),
        'search_items'          => __('Search Service', 'open-gate-animations'),
        'not_found'             => __('Not found', 'open-gate-animations'),
        'not_found_in_trash'    => __('Not found in Trash', 'open-gate-animations'),
        'featured_image'        => __('Service Image', 'open-gate-animations'),
        'set_featured_image'    => __('Set service image', 'open-gate-animations'),
        'remove_featured_image' => __('Remove service image', 'open-gate-animations'),
        'use_featured_image'    => __('Use as service image', 'open-gate-animations'),
    );

    $args = array(
        'label'                 => __('Service Card', 'open-gate-animations'),
        'description'           => __('Service cards for the services animation', 'open-gate-animations'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'thumbnail', 'page-attributes'),
        'hierarchical'          => false,
        'public'                => false,
        'show_ui'               => true,
        'show_in_menu'          => 'oga-animations',
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-slides',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => false,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => false,
        'capability_type'       => 'post',
        'show_in_rest'          => false,
    );

    register_post_type('oga_service_card', $args);
}
add_action('init', 'oga_register_service_cards_cpt', 0);

/**
 * Add custom meta boxes for service cards
 */
function oga_service_card_meta_boxes() {
    add_meta_box(
        'oga_service_card_details',
        __('Service Card Details', 'open-gate-animations'),
        'oga_service_card_details_callback',
        'oga_service_card',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'oga_service_card_meta_boxes');

/**
 * Meta box callback function
 */
function oga_service_card_details_callback($post) {
    // Add nonce for security
    wp_nonce_field('oga_service_card_meta_box', 'oga_service_card_meta_box_nonce');

    // Retrieve existing values
    $service_number = get_post_meta($post->ID, '_oga_service_number', true);
    $service_description = get_post_meta($post->ID, '_oga_service_description', true);

    ?>
    <table class="form-table">
        <tr>
            <th>
                <label for="oga_service_number"><?php _e('Service Number', 'open-gate-animations'); ?></label>
            </th>
            <td>
                <input type="text" id="oga_service_number" name="oga_service_number" 
                       value="<?php echo esc_attr($service_number); ?>" 
                       placeholder="01" 
                       style="width: 100px;">
                <p class="description"><?php _e('Display number (e.g., 01, 02, 03)', 'open-gate-animations'); ?></p>
            </td>
        </tr>
        <tr>
            <th>
                <label for="oga_service_description"><?php _e('Short Description', 'open-gate-animations'); ?></label>
            </th>
            <td>
                <textarea id="oga_service_description" name="oga_service_description" 
                          rows="3" style="width: 100%;"><?php echo esc_textarea($service_description); ?></textarea>
                <p class="description"><?php _e('Brief description of the service (1-2 sentences)', 'open-gate-animations'); ?></p>
            </td>
        </tr>
    </table>
    <p><strong><?php _e('Note:', 'open-gate-animations'); ?></strong> 
       <?php _e('Set the service title above, and upload a featured image for the service card.', 'open-gate-animations'); ?>
    </p>
    <p><strong><?php _e('Order:', 'open-gate-animations'); ?></strong> 
       <?php _e('Use the "Order" field in the "Page Attributes" box to control the display order.', 'open-gate-animations'); ?>
    </p>
    <?php
}

/**
 * Save meta box data
 */
function oga_save_service_card_meta_box($post_id) {
    // Check if nonce is set
    if (!isset($_POST['oga_service_card_meta_box_nonce'])) {
        return;
    }

    // Verify nonce
    if (!wp_verify_nonce($_POST['oga_service_card_meta_box_nonce'], 'oga_service_card_meta_box')) {
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

    // Save service number
    if (isset($_POST['oga_service_number'])) {
        update_post_meta($post_id, '_oga_service_number', sanitize_text_field($_POST['oga_service_number']));
    }

    // Save service description
    if (isset($_POST['oga_service_description'])) {
        update_post_meta($post_id, '_oga_service_description', sanitize_textarea_field($_POST['oga_service_description']));
    }
}
add_action('save_post', 'oga_save_service_card_meta_box');

/**
 * Add custom columns to service cards list
 */
function oga_service_card_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['featured_image'] = __('Image', 'open-gate-animations');
    $new_columns['title'] = $columns['title'];
    $new_columns['service_number'] = __('Number', 'open-gate-animations');
    $new_columns['order'] = __('Order', 'open-gate-animations');
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_oga_service_card_posts_columns', 'oga_service_card_columns');

/**
 * Populate custom columns
 */
function oga_service_card_custom_column($column, $post_id) {
    switch ($column) {
        case 'featured_image':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, array(50, 50));
            } else {
                echo '—';
            }
            break;
        case 'service_number':
            $number = get_post_meta($post_id, '_oga_service_number', true);
            echo $number ? esc_html($number) : '—';
            break;
        case 'order':
            $order = get_post_field('menu_order', $post_id);
            echo esc_html($order);
            break;
    }
}
add_action('manage_oga_service_card_posts_custom_column', 'oga_service_card_custom_column', 10, 2);

/**
 * Make columns sortable
 */
function oga_service_card_sortable_columns($columns) {
    $columns['order'] = 'menu_order';
    $columns['service_number'] = 'service_number';
    return $columns;
}
add_filter('manage_edit-oga_service_card_sortable_columns', 'oga_service_card_sortable_columns');

/**
 * Get all service cards for display
 */
function oga_get_service_cards() {
    $args = array(
        'post_type'      => 'oga_service_card',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
        'post_status'    => 'publish',
    );

    $query = new WP_Query($args);
    $services = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();

            $services[] = array(
                'title'       => get_the_title(),
                'number'      => get_post_meta($post_id, '_oga_service_number', true),
                'description' => get_post_meta($post_id, '_oga_service_description', true),
                'image'       => get_the_post_thumbnail_url($post_id, 'large'),
            );
        }
        wp_reset_postdata();
    }

    return $services;
}
