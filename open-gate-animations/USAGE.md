# Open Gate Animations - Usage Examples

This document provides detailed examples of how to use each animation shortcode in the WordPress plugin.

## Table of Contents
1. [Home Animation](#home-animation)
2. [About Spread](#about-spread)
3. [Services Cards](#services-cards)
4. [Approach Timeline](#approach-timeline)
5. [Full Page Examples](#full-page-examples)

---

## Home Animation

### Basic Usage
```
[oga_home_animation]
```

### With All Attributes
```
[oga_home_animation 
  title="CRAFTING" 
  highlight="VISUAL STORIES" 
  subtitle="That captivate, inspire, and drive results through compelling video production and creative direction." 
  cta="START A PROJECT"]
```

### Attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `title` | "CRAFTING" | Main title text (appears in section 1) |
| `highlight` | "VISUAL STORIES" | Two-word highlight (split across subtitle row) |
| `subtitle` | "That captivate..." | Subtitle text (not currently displayed in template) |
| `cta` | "START A PROJECT" | Call-to-action button text |

### Features
- Full-screen door opening animation
- Wheel scroll navigation (scroll down/up)
- Keyboard navigation (Arrow keys, PageUp/PageDown, Space)
- Touch gesture support (swipe up/down)
- 2.2 second smooth animation
- Progress dots indicator

### User Interactions
- **Scroll Down** or **Arrow Down** or **Space**: Transition to section 2
- **Scroll Up** or **Arrow Up** or **PageUp**: Transition back to section 1

---

## About Spread

### Basic Usage
```
[oga_about_spread]
```

### With Custom Images
```
[oga_about_spread 
  title="ABOUT US" 
  description="We are a creative film production company specializing in visual storytelling that brings brands to life." 
  cta="LEARN MORE"
  image1="https://yourdomain.com/wp-content/uploads/2024/01/about-team.jpg"
  image2="https://yourdomain.com/wp-content/uploads/2024/01/about-studio.jpg"
  image3="https://yourdomain.com/wp-content/uploads/2024/01/about-work.jpg"]
```

### Attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `title` | "ABOUT US" | Section title |
| `description` | "We are a creative..." | Description text |
| `cta` | "LEARN MORE" | Button text |
| `image1` | Plugin default | URL for left image |
| `image2` | Plugin default | URL for center image |
| `image3` | Plugin default | URL for right image |

### Features
- Scroll-driven image spread effect
- 3 images start clustered, spread diagonally on scroll
- 250% viewport height for smooth scroll progression
- Description fades in during scroll
- Responsive layout

### Image Recommendations
- **Size**: 400x600px (portrait orientation)
- **Format**: JPG or PNG
- **File size**: < 200KB each for best performance

---

## Services Cards

### Basic Usage
```
[oga_services_cards]
```

**Note:** This animation uses predefined service data in the template. To customize:
1. Edit `templates/services-cards.php`
2. Modify the `$services` array

### Template Customization

Edit the `$services` array in `templates/services-cards.php`:

```php
$services = array(
    array(
        'title' => "YOUR SERVICE\nTITLE",
        'number' => '01',
        'image' => OGA_PLUGIN_URL . 'assets/images/your-image.jpg',
        'description' => 'Your service description here.',
    ),
    // Add more services...
);
```

### Features
- Sequential card reveal animation
- Stacking effect (cards stack on top of each other)
- Wheel scroll to reveal/hide cards
- Touch gesture support
- 800ms animation per card
- Cards shrink in width as they stack
- Auto-scroll enabled after all cards revealed

### User Interactions
- **Scroll Down**: Reveal next card
- **Scroll Up**: Hide previous card
- **After All Cards**: Scroll continues to next section

### Card Image Recommendations
- **Size**: 800x600px (landscape)
- **Format**: JPG
- **File size**: < 300KB each

---

## Approach Timeline

### Basic Usage
```
[oga_approach_timeline]
```

**Note:** This animation uses predefined timeline steps. To customize:
1. Edit `templates/approach-timeline.php`
2. Modify the `$steps` array

### Template Customization

Edit the `$steps` array in `templates/approach-timeline.php`:

```php
$steps = array(
    array(
        'title' => 'STEP NAME',
        'boldPart' => 'BOLD TEXT PORTION ',
        'description' => 'REGULAR TEXT PORTION.',
        'image' => OGA_PLUGIN_URL . 'assets/images/step-image.jpg',
    ),
    // Add 3-5 steps total
);
```

### Features
- Scroll-driven timeline with progress indicator
- 400% viewport height (4 full screens)
- Gold color (#C8A24E) for active states
- Image cards fade in/out based on scroll
- Descriptions highlight as you scroll
- 3-column layout: Images | Timeline | Descriptions
- Sticky container stays in view while scrolling

### Timeline Image Recommendations
- **Size**: 600x800px (portrait, fill available space)
- **Format**: JPG
- **File size**: < 400KB each
- **Count**: Match number of timeline steps (typically 4)

---

## Full Page Examples

### Landing Page with Home Animation

Create a new WordPress page with this content:

```
[oga_home_animation title="WELCOME" highlight="TO OUR STUDIO" cta="EXPLORE NOW"]
```

Set page template to **Full Width** for best results.

### About Page Layout

Create a page with:

```
[oga_about_spread 
  title="WHO WE ARE" 
  description="We're a team of passionate creatives dedicated to bringing your vision to life through stunning visual storytelling and innovative design solutions." 
  cta="GET IN TOUCH"
  image1="/wp-content/uploads/team-photo.jpg"
  image2="/wp-content/uploads/studio-photo.jpg"
  image3="/wp-content/uploads/work-photo.jpg"]
```

### Services Page

```
[oga_services_cards]
```

Remember to upload your service images to:
- `open-gate-animations/assets/images/service-corporate.jpg`
- `open-gate-animations/assets/images/service-agency.jpg`
- `open-gate-animations/assets/images/service-social.jpg`
- `open-gate-animations/assets/images/service-animation.jpg`

### Approach/Process Page

```
[oga_approach_timeline]
```

Upload timeline images to:
- `open-gate-animations/assets/images/approach-discover.jpg`
- `open-gate-animations/assets/images/approach-create.jpg`
- `open-gate-animations/assets/images/approach-refine.jpg`
- `open-gate-animations/assets/images/approach-deliver.jpg`

---

## Tips & Best Practices

### Performance
1. Optimize all images before uploading
2. Use JPG for photos, PNG for graphics with transparency
3. Enable lazy loading for better initial load times
4. Test on mobile devices for smooth performance

### Styling
1. Use full-width page templates for best visual impact
2. Remove page titles and sidebars for cleaner look
3. Consider adding CSS to hide WordPress admin bar on animation pages
4. Test in different browsers for consistent appearance

### Content
1. Keep text concise and impactful
2. Use high-quality images that align with your brand
3. Test scroll interactions on various devices
4. Ensure sufficient color contrast for readability

### Troubleshooting
1. If animations don't work, check browser console for errors
2. Clear cache after making changes
3. Test in incognito/private mode to rule out caching issues
4. Verify image paths are correct and files exist

---

## Advanced Customization

### Custom CSS

Add custom styles to your theme's `style.css` or through Customizer:

```css
/* Customize button hover effects */
.oga-home-animation button:hover {
    background-color: #your-color !important;
}

/* Change animation colors */
.oga-approach-timeline .oga-timeline-fill {
    background-color: #your-brand-color !important;
}

/* Adjust text sizes */
.oga-about-spread h1 {
    font-size: 4rem !important;
}
```

### JavaScript Hooks

Each animation initializes on `DOMContentLoaded`. Access animation instances via:

```javascript
// Example: Custom event after animation completes
document.addEventListener('DOMContentLoaded', function() {
    // Your custom code here
});
```

---

## Need Help?

For additional support:
- Check the README.txt file
- Review INSTALLATION.md for setup instructions
- Visit the plugin GitHub repository
- Contact Open Gate Creative at https://opengatecreative.com
