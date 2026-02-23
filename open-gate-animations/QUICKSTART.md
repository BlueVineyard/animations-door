# Quick Start Guide - Open Gate Animations

Get your animations up and running in 5 minutes!

## 📦 Installation (2 minutes)

### Step 1: Upload Plugin
```bash
# Copy the entire folder to your WordPress installation
cp -r open-gate-animations /path/to/wordpress/wp-content/plugins/
```

### Step 2: Activate
1. Log in to WordPress Admin
2. Go to **Plugins** → **Installed Plugins**
3. Find "Open Gate Animations"
4. Click **Activate**

✅ Done! The plugin is now active.

## 🎬 Add Your First Animation (1 minute)

### Create a New Page
1. Go to **Pages** → **Add New**
2. Title: "Home Animation Demo"
3. Switch to **Text/HTML** editor
4. Paste this shortcode:
   ```
   [oga_home_animation]
   ```
5. **Publish** the page

### View Your Animation
1. Click **View Page**
2. You'll see the door opening animation!
3. Try scrolling down/up or using arrow keys

## 🎨 Try All 4 Animations (2 minutes)

Create 4 pages, one for each animation:

### Page 1: Home Animation
```
[oga_home_animation title="WELCOME" highlight="TO OUR STUDIO" cta="GET STARTED"]
```

### Page 2: About Spread
```
[oga_about_spread title="ABOUT US" description="We create stunning visual experiences"]
```

### Page 3: Services Cards
```
[oga_services_cards]
```

### Page 4: Approach Timeline
```
[oga_approach_timeline]
```

## 🖼️ Add Your Own Images

### For About Spread (easiest)
Use WordPress Media Library:
```
[oga_about_spread 
  image1="https://yoursite.com/wp-content/uploads/2024/01/image1.jpg"
  image2="https://yoursite.com/wp-content/uploads/2024/01/image2.jpg"
  image3="https://yoursite.com/wp-content/uploads/2024/01/image3.jpg"]
```

### For Services & Timeline
1. Upload images to: `open-gate-animations/assets/images/`
2. Name them correctly:
   - Services: `service-corporate.jpg`, `service-agency.jpg`, etc.
   - Timeline: `approach-discover.jpg`, `approach-create.jpg`, etc.

## ⚙️ Customize Content

### Edit Home Animation Text
```
[oga_home_animation 
  title="YOUR TITLE" 
  highlight="YOUR HIGHLIGHT" 
  cta="YOUR BUTTON"]
```

### Edit Services/Timeline
1. Open file: `open-gate-animations/templates/services-cards.php`
2. Find the `$services` array (around line 3)
3. Edit titles, descriptions, etc.
4. Save and refresh!

## 💡 Pro Tips

### Best Page Template
Use **Full Width** template for animations:
1. Edit page
2. Look for **Page Attributes** → **Template**
3. Select "Full Width" or "No Sidebar"

### Remove Page Title
Add this to your theme's CSS:
```css
.page-id-123 .entry-title {
    display: none;
}
```
(Replace 123 with your page ID)

### Test on Mobile
Animations work great on mobile!
- Swipe up/down for navigation
- Scroll to reveal cards
- Touch-friendly interactions

## 🆘 Troubleshooting

### Animation Not Showing?
1. Check the page source - is the shortcode still visible?
   - If yes: Plugin not activated
   - If no: Check browser console for errors

2. Clear cache:
   - Browser cache (Ctrl+Shift+R)
   - WordPress cache plugin
   - CDN cache

3. Check for JavaScript errors:
   - Right-click → Inspect
   - Go to Console tab
   - Look for red error messages

### Images Not Displaying?
1. Check file path in code
2. Verify images exist in correct folder
3. Check file permissions (should be readable)

### Styling Issues?
1. Try different theme
2. Test in incognito mode
3. Check for CSS conflicts in dev tools

## 📚 Next Steps

- Read **USAGE.md** for detailed examples
- Check **INSTALLATION.md** for advanced setup
- See **CHANGELOG.md** for version history
- Browse **demo.html** for preview

## 🎯 Common Use Cases

### Landing Page
```
Page Template: Full Width
Content: [oga_home_animation]
Result: Impressive full-screen intro
```

### About Page
```
Page Template: Full Width  
Content: [oga_about_spread]
Result: Beautiful image showcase
```

### Services Page
```
Page Template: Full Width
Content: [oga_services_cards]
Result: Interactive card reveal
```

### Process/How It Works
```
Page Template: Full Width
Content: [oga_approach_timeline]
Result: Scroll-based timeline
```

## ✨ Make It Yours

### Change Colors
Edit `assets/css/animations.css` or add to your theme:
```css
/* Timeline gold color */
.oga-timeline-fill { background-color: #your-color; }

/* Button hover */
.oga-home-animation button:hover { background-color: #your-color; }
```

### Adjust Speeds
Edit JavaScript files in `assets/js/`:
```javascript
// In home-animation.js, line 8
const ANIMATION_DURATION = 2200; // Change this number (in ms)
```

### Custom Text
Most text is customizable via shortcode attributes - see USAGE.md

## 🚀 You're Ready!

You now have 4 amazing scroll-based animations on your WordPress site!

**Need more help?**
- Full documentation: See other .md files
- Demo preview: Open demo.html in browser
- Support: Visit https://opengatecreative.com

---

**Happy Animating! 🎉**
