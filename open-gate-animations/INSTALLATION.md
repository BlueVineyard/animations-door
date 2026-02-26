# Open Gate Animations WordPress Plugin

A WordPress plugin that converts the Next.js animations from the animations-door repository into WordPress-compatible shortcodes.

## Overview

This plugin provides 4 stunning scroll-based animations:

1. **Home Animation** - Door opening effect with section navigation
2. **About Spread** - Image spread animation with scroll progress
3. **Services Cards** - Sequential card reveal with stacking
4. **Approach Timeline** - Timeline with scroll-based progression

## Installation

### Method 1: Manual Installation

1. Copy the entire `open-gate-animations` folder to your WordPress plugins directory:
   ```
   wp-content/plugins/open-gate-animations/
   ```

2. Log in to WordPress admin panel

3. Go to **Plugins** → **Installed Plugins**

4. Find "Open Gate Animations" and click **Activate**

### Method 2: ZIP Upload

1. Create a ZIP file of the `open-gate-animations` folder

2. In WordPress admin, go to **Plugins** → **Add New** → **Upload Plugin**

3. Choose the ZIP file and click **Install Now**

4. Click **Activate Plugin**

## Usage

### Using Shortcodes

Add animations to any page or post using shortcodes:

#### Home Animation
```
[oga_home_animation]
```

**With custom attributes:**
```
[oga_home_animation 
  title="CRAFTING" 
  highlight="VISUAL STORIES" 
  subtitle="Your custom subtitle here" 
  cta="START A PROJECT"]
```

#### About Spread
```
[oga_about_spread]
```

**With custom attributes:**
```
[oga_about_spread 
  title="ABOUT US" 
  description="Your company description" 
  cta="LEARN MORE"
  image1="https://yourdomain.com/wp-content/uploads/image1.jpg"
  image2="https://yourdomain.com/wp-content/uploads/image2.jpg"
  image3="https://yourdomain.com/wp-content/uploads/image3.jpg"]
```

#### Services Cards
```
[oga_services_cards]
```

Note: Service cards content is defined in the template. Edit `templates/services-cards.php` to customize.

#### Approach Timeline
```
[oga_approach_timeline]
```

Note: Timeline steps are defined in the template. Edit `templates/approach-timeline.php` to customize.

## Adding Custom Images

### For Services Cards

1. Upload 4 images to WordPress Media Library (one for each service)
2. Name them: 
   - `service-corporate.jpg`
   - `service-agency.jpg`
   - `service-social.jpg`
   - `service-animation.jpg`
3. Place them in: `open-gate-animations/assets/images/`

### For Approach Timeline

1. Upload 4 images to WordPress Media Library (one for each step)
2. Name them:
   - `approach-discover.jpg`
   - `approach-create.jpg`
   - `approach-refine.jpg`
   - `approach-deliver.jpg`
3. Place them in: `open-gate-animations/assets/images/`

### For About Spread

Use shortcode attributes to specify image URLs (see Usage section above).

## Customization

### Editing Content

- **Templates**: Edit PHP files in `/templates/` directory
- **Styles**: Modify `/assets/css/animations.css`
- **JavaScript**: Update files in `/assets/js/` directory

### Template Files

- `templates/home-animation.php` - Home animation HTML structure
- `templates/about-spread.php` - About spread HTML structure
- `templates/services-cards.php` - Services cards with data
- `templates/approach-timeline.php` - Timeline with steps data

### JavaScript Files

- `assets/js/home-animation.js` - Home animation logic
- `assets/js/about-spread.js` - About spread animation
- `assets/js/services-cards.js` - Cards stacking animation
- `assets/js/approach-timeline.js` - Timeline scroll tracking

## Technical Details

### Animation Features

- **Performance**: Uses `requestAnimationFrame` for 60fps animations
- **No Dependencies**: Pure vanilla JavaScript, no jQuery
- **Mobile Support**: Touch gestures supported
- **GPU Acceleration**: CSS transforms for smooth rendering

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Animations not working

1. Check that the plugin is activated
2. Clear browser cache
3. Check browser console for JavaScript errors
4. Ensure images are uploaded to correct directory

### Images not displaying

1. Verify image paths in template files
2. Check file permissions (images should be readable)
3. Upload images to `/assets/images/` directory

### Styling issues

1. Check for CSS conflicts with your theme
2. Try adding `!important` to custom CSS rules
3. Check browser developer tools for CSS errors

## File Structure

```
open-gate-animations/
├── open-gate-animations.php    # Main plugin file
├── README.txt                  # WordPress plugin readme
├── INSTALLATION.md             # This file
├── assets/
│   ├── css/
│   │   └── animations.css      # Main stylesheet
│   ├── js/
│   │   ├── home-animation.js
│   │   ├── about-spread.js
│   │   ├── services-cards.js
│   │   └── approach-timeline.js
│   └── images/                 # Place your images here
├── includes/                   # PHP helper files (future)
└── templates/
    ├── home-animation.php
    ├── about-spread.php
    ├── services-cards.php
    └── approach-timeline.php
```

## Version

Current version: 1.0.0

## License

GPL v2 or later

## Credits

Converted from Next.js animations by Open Gate Creative
Original implementation: animations-door repository
