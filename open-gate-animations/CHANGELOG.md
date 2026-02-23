# Changelog

All notable changes to the Open Gate Animations WordPress plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
