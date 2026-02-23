# Dynamic Features Guide

This guide explains how to use the dynamic features added in version 1.1.0, including Custom Post Types and Settings Pages.

## Table of Contents

1. [Overview](#overview)
2. [Settings Page](#settings-page)
3. [Custom Post Types](#custom-post-types)
4. [Migration Guide](#migration-guide)

---

## Overview

Version 1.1.0 introduces dynamic content management:

- **Settings Page**: Manage default values for Home and About animations
- **Service Cards CPT**: Add/edit/remove service cards dynamically
- **Approach Steps CPT**: Add/edit/remove timeline steps dynamically
- **Backward Compatible**: Still works with hardcoded defaults if no data is added

---

## Settings Page

### Accessing Settings

1. Log in to WordPress Admin
2. Go to **Animations** → **Settings** in the left menu
3. You'll see two tabs: **Home Animation** and **About Animation**

### Home Animation Settings

Configure default values for the home animation shortcode:

**Fields:**
- **Main Title**: The primary title text (e.g., "CRAFTING")
- **Highlight Text**: Two-word phrase for the subtitle row (e.g., "VISUAL STORIES")
- **Subtitle**: Supporting text below the main content
- **Call-to-Action Button**: Button text (e.g., "START A PROJECT")

**Usage:**
```
[oga_home_animation]
```
Uses the settings page values.

**Override Settings:**
```
[oga_home_animation title="WELCOME" highlight="TO STUDIO" cta="GET STARTED"]
```
Shortcode attributes override settings page values.

### About Animation Settings

Configure default values for the about spread animation:

**Fields:**
- **Title**: Section title (e.g., "ABOUT US")
- **Description**: Main description text
- **Call-to-Action Button**: Button text (e.g., "LEARN MORE")
- **Image 1 (Left)**: First image for the spread animation
- **Image 2 (Center)**: Second image (center position)
- **Image 3 (Right)**: Third image for the spread animation

**Image Upload:**
1. Click **Upload Image** button
2. Select from Media Library or upload new
3. Click **Use This Image**
4. Click **Save Settings** to save

**Usage:**
```
[oga_about_spread]
```
Uses the settings page values.

**Override Settings:**
```
[oga_about_spread title="OUR STORY" description="Custom description here"]
```

---

## Custom Post Types

### Service Cards

Add and manage service cards that appear in the services animation.

#### Creating a Service Card

1. Go to **Animations** → **Service Cards** → **Add New**
2. **Title**: Enter the service name (e.g., "CORPORATE VIDEOS\nAND BRANDED FILMS")
   - Use `\n` for line breaks in the title
3. **Service Number**: Enter display number (e.g., "01", "02")
4. **Short Description**: Brief description (1-2 sentences)
5. **Featured Image**: Upload a service image
   - Click **Set featured image**
   - Upload or select image
   - Recommended size: 800x600px
6. **Order**: Set the display order in Page Attributes box
   - Lower numbers appear first
   - Example: 0, 10, 20, 30

#### Managing Service Cards

**View All Cards:**
- Go to **Animations** → **Service Cards** → **All Services**
- See thumbnail, title, number, and order
- Sort by clicking column headers

**Edit a Card:**
- Click the card title or hover and click **Edit**
- Update fields as needed
- Click **Update**

**Delete a Card:**
- Hover over the card and click **Trash**

**Reorder Cards:**
- Edit each card
- Change the **Order** value in Page Attributes
- Lower numbers display first

#### Shortcode Usage

```
[oga_services_cards]
```

The shortcode automatically pulls all published service cards in order.

**Fallback Behavior:**
If no service cards exist, displays default hardcoded services.

### Approach Steps

Add and manage timeline steps for the approach animation.

#### Creating an Approach Step

1. Go to **Animations** → **Approach Steps** → **Add New**
2. **Title**: Step name (e.g., "DISCOVER", "CREATE", "REFINE")
   - Use all caps for consistency
3. **Bold Text Part**: First part of description (will be bold)
   - Example: "WE DIVE DEEP INTO YOUR BRAND AND AUDIENCE, UNCOVER THE STORY WORTH "
4. **Regular Text Part**: Continuation of description
   - Example: "TELLING AND HELP YOU SHAPE YOUR VISION"
5. **Featured Image**: Upload a step image
   - Click **Set featured image**
   - Recommended size: 600x800px (portrait)
6. **Order**: Set display order
   - Example: 0, 10, 20, 30

#### Managing Approach Steps

**View All Steps:**
- Go to **Animations** → **Approach Steps** → **All Steps**

**Edit/Delete:**
- Same process as Service Cards

**Reorder:**
- Use the Order field in Page Attributes

#### Shortcode Usage

```
[oga_approach_timeline]
```

The shortcode automatically pulls all published steps in order.

**Fallback Behavior:**
If no steps exist, displays default hardcoded timeline.

---

## Migration Guide

### From Hardcoded to Dynamic Content

If you've been using the plugin with default content and want to migrate to dynamic management:

#### Step 1: Populate Service Cards

1. Go to **Animations** → **Service Cards**
2. Add each of your current services:
   - Service 1: Order 0
   - Service 2: Order 10
   - Service 3: Order 20
   - Service 4: Order 30
3. Upload images for each
4. Publish all cards

#### Step 2: Populate Approach Steps

1. Go to **Animations** → **Approach Steps**
2. Add each timeline step:
   - Step 1 (DISCOVER): Order 0
   - Step 2 (CREATE): Order 10
   - Step 3 (REFINE): Order 20
   - Step 4 (DELIVER): Order 30
3. Upload images for each
4. Publish all steps

#### Step 3: Configure Settings

1. Go to **Animations** → **Settings**
2. **Home Animation tab:**
   - Set your preferred default values
   - Click **Save Settings**
3. **About Animation tab:**
   - Set title, description, CTA
   - Upload your 3 images
   - Click **Save Settings**

#### Step 4: Test

1. View pages with shortcodes
2. Verify content appears correctly
3. Test that shortcode attributes still override settings

---

## Tips & Best Practices

### Service Cards

✅ **DO:**
- Use consistent numbering (01, 02, 03, 04)
- Upload high-quality images (800x600px)
- Keep descriptions concise (1-2 sentences)
- Use Order field for precise control (0, 10, 20, 30)

❌ **DON'T:**
- Don't use duplicate numbers
- Don't skip featured images
- Don't make descriptions too long

### Approach Steps

✅ **DO:**
- Use ALL CAPS for titles
- Split descriptions logically (bold part should be complete thought)
- Upload portrait images (600x800px)
- Keep order sequential

❌ **DON'T:**
- Don't mix uppercase/lowercase inconsistently
- Don't make bold part too long
- Don't use landscape images

### Settings Page

✅ **DO:**
- Set meaningful defaults
- Test images before saving
- Keep CTA text short (2-4 words)
- Save after each change

❌ **DON'T:**
- Don't leave required fields empty
- Don't use very large images (optimize first)
- Don't forget to click Save Settings

---

## Troubleshooting

### No Content Appears

**Problem:** Shortcode shows nothing or shows defaults

**Solutions:**
1. Check if CPT posts are published (not draft)
2. Verify Order values are set
3. Check for featured images
4. Check browser console for JavaScript errors

### Wrong Order

**Problem:** Cards/steps appear in wrong order

**Solutions:**
1. Edit each post
2. Set Order values with gaps (0, 10, 20, 30)
3. Lower numbers appear first
4. Refresh the page

### Images Not Showing

**Problem:** Featured images don't appear in animation

**Solutions:**
1. Verify image is set as "Featured Image"
2. Check image URL in post edit screen
3. Ensure image file exists on server
4. Try re-uploading image

### Settings Not Saving

**Problem:** Settings page changes don't persist

**Solutions:**
1. Check user has admin capabilities
2. Look for error messages after save
3. Verify nonces aren't expired (refresh page)
4. Check for plugin conflicts

---

## Advanced Usage

### Custom Queries

You can create custom queries for the CPTs:

```php
// Get specific service cards
$args = array(
    'post_type' => 'oga_service_card',
    'posts_per_page' => 3,
    'orderby' => 'menu_order',
    'order' => 'ASC',
);
$services = new WP_Query($args);
```

### Filters & Hooks

The plugin provides several hooks for customization:

```php
// Filter service cards before display
add_filter('oga_service_cards', 'my_custom_services', 10, 1);

// Filter approach steps
add_filter('oga_approach_steps', 'my_custom_steps', 10, 1);
```

### Programmatic Access

Get settings programmatically:

```php
// Get home animation settings
$title = get_option('oga_home_title', 'CRAFTING');
$highlight = get_option('oga_home_highlight', 'VISUAL STORIES');

// Get about animation settings
$about_title = get_option('oga_about_title', 'ABOUT US');
$image1 = get_option('oga_about_image_1', '');
```

---

## Version History

### Version 1.1.0
- Added Custom Post Types (Service Cards, Approach Steps)
- Added Settings Page with tabs
- Added image upload functionality
- Maintained backward compatibility
- All previous features still work

### Version 1.0.0
- Initial release with hardcoded content
- 4 shortcodes with attribute support
- Basic animations

---

## Need Help?

- Check the main README.md for general usage
- See INSTALLATION.md for setup instructions
- See QUICKSTART.md for 5-minute guide
- Visit plugin settings for inline documentation

---

**Updated:** February 23, 2024  
**Version:** 1.1.0  
**Plugin:** Open Gate Animations
