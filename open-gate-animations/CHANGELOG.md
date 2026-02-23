# Changelog

All notable changes to the Open Gate Animations WordPress plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-02-23

### Added - Dynamic Content Management
- **Settings Page** with tabbed interface
  - Home Animation settings tab (title, highlight, subtitle, CTA)
  - About Animation settings tab (title, description, CTA, 3 images)
  - WordPress Options API integration
  - Media library integration for image uploads
  - JavaScript-powered image uploader
  
- **Custom Post Type: Service Cards**
  - Add/edit/remove service cards via WordPress admin
  - Custom meta boxes for service number and description
  - Featured image support
  - Menu order for sorting
  - Admin columns showing thumbnails, numbers, and order
  - Sortable columns
  - Helper function: `oga_get_service_cards()`
  
- **Custom Post Type: Approach Steps**
  - Add/edit/remove timeline steps via WordPress admin
  - Custom meta boxes for bold part and description
  - Featured image support
  - Menu order for sorting
  - Admin columns showing thumbnails and order
  - Sortable columns
  - Helper function: `oga_get_approach_steps()`

### Changed
- Updated shortcodes to use settings as defaults
  - `[oga_home_animation]` now pulls from settings page
  - `[oga_about_spread]` now pulls from settings page
  - Shortcode attributes still override settings (backward compatible)
  
- Templates now query Custom Post Types
  - `services-cards.php` queries Service Cards CPT
  - `approach-timeline.php` queries Approach Steps CPT
  - Both fall back to hardcoded defaults if no CPT entries exist
  
- Updated plugin version from 1.0.0 to 1.1.0
- Added new include files to main plugin file

### Files Added
- `includes/cpt-service-cards.php` - Service Cards CPT registration
- `includes/cpt-approach-steps.php` - Approach Steps CPT registration
- `includes/admin-settings.php` - Settings page with tabs
- `assets/js/admin-settings.js` - Admin JavaScript for image uploads
- `assets/css/admin-settings.css` - Admin styling
- `DYNAMIC-FEATURES.md` - Complete guide for dynamic features

### Technical Details
- Implements WordPress Custom Post Types API
- Uses WordPress Options API for settings
- Nonce verification for security
- Proper data sanitization and escaping
- Backward compatible with version 1.0.0
- No breaking changes

### Migration Notes
- Existing installations will continue to work with default/hardcoded values
- Users can optionally migrate to dynamic content management
- Settings page provides defaults that can be overridden
- CPT entries only used if they exist (fallback to defaults)

## [1.0.0] - 2024-02-23

### Added
- Initial release of Open Gate Animations WordPress plugin
- Home Animation component with door opening effect
  - Wheel scroll navigation
  - Keyboard navigation support
  - Touch gesture support
  - Shortcode: `[oga_home_animation]`
  
- About Spread component with image spread animation
  - Scroll-driven diagonal image spread
  - Customizable images via shortcode attributes
  - Shortcode: `[oga_about_spread]`
  
- Services Cards component with sequential reveal
  - Stacking card animation
  - Touch and scroll support
  - 4 customizable service cards
  - Shortcode: `[oga_services_cards]`
  
- Approach Timeline component with progress tracking
  - 4-step timeline with scroll progress
  - Gold highlight color for active steps
  - Image cards with descriptions
  - Shortcode: `[oga_approach_timeline]`

### Technical Details
- Converted from Next.js/React to vanilla JavaScript
- Uses requestAnimationFrame for 60fps animations
- No external dependencies (no jQuery)
- Mobile-responsive design
- GPU-accelerated CSS transforms
- Comprehensive documentation

### Files Included
- Main plugin file: `open-gate-animations.php`
- JavaScript animations (4 files in `/assets/js/`)
- CSS stylesheet: `/assets/css/animations.css`
- PHP templates (4 files in `/templates/`)
- Documentation:
  - `README.txt` - WordPress plugin readme
  - `INSTALLATION.md` - Installation guide
  - `USAGE.md` - Usage examples and customization
  - `CHANGELOG.md` - This file
  - `demo.html` - Demo page

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

---

## [Unreleased]

### Planned Features
- Admin settings page for global customization
- Gutenberg blocks for each animation
- Additional animation variations
- Animation speed controls
- Color scheme customization options
- WordPress customizer integration
- Animation preview in admin
- More shortcode attributes for fine-tuned control

### Known Issues
- None reported

---

## Version History

- **1.0.0** (2024-02-23) - Initial release

---

## Upgrade Guide

### From Development to 1.0.0
First public release - no upgrade needed.

---

## Support

For issues, questions, or contributions:
- GitHub: BlueVineyard/animations-door
- Website: https://opengatecreative.com

---

## Credits

- Original Next.js implementation: Open Gate Creative
- WordPress conversion: Copilot
- Animation techniques: requestAnimationFrame, CSS transforms
- Easing functions: Cubic bezier curves

---

## License

GPL v2 or later
https://www.gnu.org/licenses/gpl-2.0.html
