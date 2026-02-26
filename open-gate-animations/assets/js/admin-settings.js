/**
 * Admin Settings JavaScript
 * Handles image upload functionality
 */

jQuery(document).ready(function($) {
    'use strict';

    // Image upload
    $('.oga-upload-image-button').on('click', function(e) {
        e.preventDefault();

        var button = $(this);
        var targetId = button.data('target');
        var imageUploader = wp.media({
            title: 'Select Image',
            button: {
                text: 'Use This Image'
            },
            multiple: false
        });

        imageUploader.on('select', function() {
            var attachment = imageUploader.state().get('selection').first().toJSON();
            var imageUrl = attachment.url;

            // Set the image URL in the hidden input
            $('#' + targetId).val(imageUrl);

            // Show preview image
            button.closest('.oga-image-upload').find('.oga-preview-image')
                .attr('src', imageUrl)
                .show();

            // Show remove button
            button.closest('.oga-image-upload').find('.oga-remove-image-button').show();
        });

        imageUploader.open();
    });

    // Remove image
    $('.oga-remove-image-button').on('click', function(e) {
        e.preventDefault();

        var button = $(this);
        var targetId = button.data('target');

        // Clear the hidden input
        $('#' + targetId).val('');

        // Hide preview image
        button.closest('.oga-image-upload').find('.oga-preview-image').hide();

        // Hide remove button
        button.hide();
    });
});
