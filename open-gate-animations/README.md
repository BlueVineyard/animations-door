# Open Gate Animations - WordPress Plugin

A complete WordPress plugin that provides 4 stunning scroll-based animations with dynamic content management.

## 🎬 Overview

This plugin brings high-performance, scroll-based animations to WordPress with zero dependencies. All animations use vanilla JavaScript with `requestAnimationFrame` for smooth 60fps performance.

**NEW in v1.1.0:** Dynamic content management with Custom Post Types and Settings Pages!

## ✨ Features

### 4 Complete Animations

1. **Home Animation** - Door opening effect with section navigation
2. **About Spread** - Diagonal image spread on scroll
3. **Services Cards** - Sequential card reveal with stacking
4. **Approach Timeline** - Progress timeline with scroll tracking

### Dynamic Content Management (NEW!)

- 🎛️ **Settings Page** - Configure Home & About animations from WordPress admin
- 📝 **Custom Post Types** - Add/edit/remove Service Cards and Approach Steps
- 🖼️ **Media Library Integration** - Upload and manage images easily
- ⚙️ **Flexible Configuration** - Override settings with shortcode attributes
- 🔄 **Backward Compatible** - Works with or without dynamic content

### Technical Highlights

- ✅ **Zero Dependencies** - No jQuery, no animation libraries
- ✅ **High Performance** - Uses requestAnimationFrame for 60fps
- ✅ **Mobile Friendly** - Touch gestures and responsive design
- ✅ **GPU Accelerated** - CSS transforms for smooth rendering
- ✅ **Easy Integration** - Simple WordPress shortcodes
- ✅ **Fully Customizable** - Templates, styles, and scripts

## 📦 Plugin Structure

```
open-gate-animations/
├── open-gate-animations.php    # Main plugin file
├── README.md                   # This file
├── DYNAMIC-FEATURES.md         # Dynamic features guide (NEW!)
├── README.txt                  # WordPress plugin readme
├── INSTALLATION.md             # Installation instructions
├── USAGE.md                    # Usage examples
├── CHANGELOG.md                # Version history
├── demo.html                   # Demo preview page
├── assets/
│   ├── css/
│   │   ├── animations.css      # Main stylesheet
│   │   └── admin-settings.css  # Admin styles (NEW!)
│   ├── js/
│   │   ├── home-animation.js
│   │   ├── about-spread.js
│   │   ├── services-cards.js
│   │   ├── approach-timeline.js
│   │   └── admin-settings.js   # Admin JavaScript (NEW!)
│   └── images/                 # Place your images here
├── includes/                   # PHP helpers
│   ├── cpt-service-cards.php   # Service Cards CPT (NEW!)
│   ├── cpt-approach-steps.php  # Approach Steps CPT (NEW!)
│   └── admin-settings.php      # Settings page (NEW!)
└── templates/
    ├── home-animation.php
    ├── about-spread.php
    ├── services-cards.php
    └── approach-timeline.php
```

## 🚀 Quick Start

### Installation

1. Copy the entire `open-gate-animations` folder to:
   ```
   /wp-content/plugins/
   ```

2. Activate the plugin in WordPress admin:
   ```
   Plugins → Installed Plugins → Activate "Open Gate Animations"
   ```

3. Configure dynamic content (NEW in v1.1.0):
   ```
   Animations → Settings (configure defaults)
   Animations → Service Cards (add services)
   Animations → Approach Steps (add timeline steps)
   ```

4. Add shortcodes to your pages:
   ```
   [oga_home_animation]
   [oga_about_spread]
   [oga_services_cards]
   [oga_approach_timeline]
   ```

### Quick Examples

**Home Animation:**
```
[oga_home_animation title="WELCOME" highlight="TO OUR STUDIO" cta="EXPLORE"]
```

**About Spread:**
```
[oga_about_spread 
  title="ABOUT US" 
  description="Your story here"
  image1="/path/to/image1.jpg"
  image2="/path/to/image2.jpg"
  image3="/path/to/image3.jpg"]
```

## 🎛️ Dynamic Content Management (v1.1.0)

### Settings Page

Configure default values for animations from **Animations → Settings**:

**Home Animation Tab:**
- Main Title
- Highlight Text
- Subtitle
- Call-to-Action Button

**About Animation Tab:**
- Title
- Description
- Call-to-Action Button
- 3 Images (with media library upload)

### Custom Post Types

**Service Cards** (`Animations → Service Cards`)
- Add unlimited service cards
- Custom fields: Number, Description
- Featured image support
- Drag & drop ordering

**Approach Steps** (`Animations → Approach Steps`)
- Add unlimited timeline steps
- Custom fields: Bold Part, Description
- Featured image support
- Drag & drop ordering

**Benefits:**
- No code editing required
- Easy for clients to manage
- Unlimited cards/steps (not limited to 4)
- Visual media library integration

See **[DYNAMIC-FEATURES.md](DYNAMIC-FEATURES.md)** for complete guide.

## 📚 Documentation

- **[DYNAMIC-FEATURES.md](DYNAMIC-FEATURES.md)** - Dynamic content guide (NEW!)
- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation guide
- **[USAGE.md](USAGE.md)** - Complete usage examples and customization
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates
- **[demo.html](demo.html)** - Preview page with all animations

## 🎨 Animations Overview

### 1. Home Animation
Full-screen door opening effect with smooth transitions.

**Features:**
- Wheel/keyboard/touch navigation
- 2-section layout with animations
- Progress dots indicator
- 2.2s smooth transitions

**Shortcode:** `[oga_home_animation]`

### 2. About Spread
Images start clustered and spread diagonally on scroll.

**Features:**
- 3-image spread effect
- Scroll-driven animation
- Description fade-in
- Customizable images

**Shortcode:** `[oga_about_spread]`

### 3. Services Cards
Cards reveal sequentially and stack on top of each other.

**Features:**
- 4 customizable service cards
- Stacking animation effect
- Width shrinking on stack
- Scroll to reveal/hide

**Shortcode:** `[oga_services_cards]`

### 4. Approach Timeline
Vertical timeline with scroll-based progress tracking.

**Features:**
- 4-step timeline
- Gold progress indicator
- Image cards with descriptions
- Auto-highlight on scroll

**Shortcode:** `[oga_approach_timeline]`

## 🛠️ Customization

### Edit Content

**For Home & About animations:**
Use shortcode attributes (see USAGE.md)

**For Services & Timeline:**
Edit the PHP template files in `/templates/` directory

### Custom Styling

Add custom CSS to your theme or use WordPress Customizer:

```css
/* Example: Change timeline color */
.oga-timeline-fill {
    background-color: #your-color !important;
}
```

### Custom Images

Upload images to `/assets/images/` directory:

**Services Cards:**
- `service-corporate.jpg`
- `service-agency.jpg`
- `service-social.jpg`
- `service-animation.jpg`

**Timeline:**
- `approach-discover.jpg`
- `approach-create.jpg`
- `approach-refine.jpg`
- `approach-deliver.jpg`

## 💻 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## 📋 Requirements

- WordPress 5.0 or higher
- PHP 7.0 or higher
- No additional plugins required

## 🔧 Troubleshooting

**Animations not working?**
1. Verify plugin is activated
2. Check browser console for errors
3. Clear browser cache
4. Test in incognito/private mode

**Images not displaying?**
1. Check image paths in templates
2. Verify images exist in `/assets/images/`
3. Check file permissions

**Styling issues?**
1. Check for theme CSS conflicts
2. Use browser dev tools to inspect
3. Add `!important` to custom CSS if needed

## 🤝 Contributing

This plugin was converted from the animations-door Next.js repository. 

**Original animations:** React/Next.js with TypeScript  
**Plugin version:** Vanilla JavaScript for WordPress

## 📄 License

GPL v2 or later - https://www.gnu.org/licenses/gpl-2.0.html

## 👥 Credits

- **Original Design:** Open Gate Creative Films
- **Next.js Implementation:** animations-door repository
- **WordPress Conversion:** GitHub Copilot
- **Animation Technique:** requestAnimationFrame + CSS transforms

## 📞 Support

For support and questions:
- Website: https://opengatecreative.com
- Repository: BlueVineyard/animations-door

## 🎯 What's Next?

Planned features for future versions:
- Admin settings page
- Gutenberg blocks
- Animation speed controls
- Color scheme options
- WordPress Customizer integration

---

**Version:** 1.0.0  
**Last Updated:** February 23, 2024  
**Status:** ✅ Production Ready
