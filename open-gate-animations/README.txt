=== Open Gate Animations ===
Contributors: Open Gate Creative
Tags: animations, scroll, effects, creative, portfolio
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Custom scroll-based animations for Open Gate Creative Films - includes home animation, about spread, services cards, and approach timeline.

== Description ==

Open Gate Animations is a WordPress plugin that provides four stunning scroll-based animations originally developed for Open Gate Creative Films. These animations use vanilla JavaScript with requestAnimationFrame for smooth 60fps performance.

**Features:**

* **Home Animation** - Full-screen door animation with wheel/keyboard/touch navigation
* **About Spread** - Scroll-driven image spread animation with diagonal positioning
* **Services Cards** - Sequential card reveal with stacking effect
* **Approach Timeline** - Timeline animation showing business phases with scroll progress

All animations are:
* High-performance (using requestAnimationFrame)
* Mobile-friendly (touch gestures supported)
* Customizable via shortcode attributes
* No external dependencies

== Installation ==

1. Upload the `open-gate-animations` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Use shortcodes to add animations to your pages

== Usage ==

**Home Animation**
```
[oga_home_animation title="CRAFTING" highlight="VISUAL STORIES" subtitle="Your subtitle here" cta="START A PROJECT"]
```

**About Spread**
```
[oga_about_spread title="ABOUT US" description="Your description" cta="LEARN MORE" image1="url" image2="url" image3="url"]
```

**Services Cards**
```
[oga_services_cards]
```

**Approach Timeline**
```
[oga_approach_timeline]
```

== Customization ==

You can customize the animations by:
1. Editing the template files in `/templates/`
2. Modifying the JavaScript files in `/assets/js/`
3. Adjusting styles in `/assets/css/animations.css`

== Frequently Asked Questions ==

= Do I need any additional plugins? =

No, Open Gate Animations is a standalone plugin with no dependencies.

= Are the animations mobile-friendly? =

Yes, all animations support touch gestures and are responsive.

= Can I customize the content? =

Yes, you can use shortcode attributes to customize text content and images.

= How do I add custom images? =

Upload your images to WordPress Media Library and use the image URLs in shortcode attributes.

== Screenshots ==

1. Home Animation - Door opening effect
2. About Spread - Image spread animation
3. Services Cards - Stacking cards reveal
4. Approach Timeline - Progress timeline

== Changelog ==

= 1.0.0 =
* Initial release
* Home Animation with door effect
* About Spread with image positioning
* Services Cards with stacking animation
* Approach Timeline with scroll progress

== Upgrade Notice ==

= 1.0.0 =
Initial release of Open Gate Animations.

== Technical Details ==

**Animation Techniques:**
* Vanilla JavaScript (no jQuery required)
* requestAnimationFrame for smooth 60fps
* CSS transforms for GPU acceleration
* Easing functions (cubic-bezier)
* Scroll progress tracking

**Performance:**
* Lightweight (no heavy libraries)
* Optimized for mobile devices
* Efficient event handling
* Minimal DOM manipulation

== Support ==

For support, please visit https://opengatecreative.com

== Credits ==

Developed by Open Gate Creative
Original Next.js implementation converted to WordPress plugin
