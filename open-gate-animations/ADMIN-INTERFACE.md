# Admin Interface Guide

This guide shows you what to expect in the WordPress admin after installing version 1.1.0.

## 📊 Admin Menu Structure

After activating the plugin, you'll see a new menu item in WordPress admin:

```
WordPress Admin Sidebar:
├── Dashboard
├── Posts
├── Media
├── Pages
├── Comments
├── Animations ← NEW!
│   ├── Settings
│   ├── Service Cards
│   │   ├── All Services
│   │   └── Add New
│   └── Approach Steps
│       ├── All Steps
│       └── Add New
├── Plugins
└── Settings
```

---

## ⚙️ Settings Page

**Location:** Animations → Settings

### Home Animation Tab

The first tab you'll see when opening settings:

**Fields Available:**
1. **Main Title** - Text input
   - Default: "CRAFTING"
   - Example: "WELCOME", "CREATING", "BUILDING"

2. **Highlight Text** - Text input
   - Default: "VISUAL STORIES"
   - Must be 2 words that split across subtitle row
   - Example: "AMAZING CONTENT", "GREAT WORK"

3. **Subtitle** - Textarea (3 rows)
   - Default: "That captivate, inspire, and drive results..."
   - Supporting text for the animation

4. **Call-to-Action Button** - Text input
   - Default: "START A PROJECT"
   - Example: "GET STARTED", "CONTACT US", "LEARN MORE"

**Shortcode Example Box:**
Shows how to use the shortcode with current settings.

**Save Settings Button:**
Blue button at bottom - saves all fields.

### About Animation Tab

Click the "About Animation" tab to see these fields:

**Fields Available:**
1. **Title** - Text input
   - Default: "ABOUT US"
   - Example: "WHO WE ARE", "OUR STORY"

2. **Description** - Textarea (4 rows)
   - Default: "We are a creative film production company..."
   - Full description for the about section

3. **Call-to-Action Button** - Text input
   - Default: "LEARN MORE"
   - Example: "READ MORE", "GET IN TOUCH"

4. **Image 1 (Left)** - Image uploader
   - Shows current image preview if set
   - "Upload Image" button opens media library
   - "Remove" button clears the image

5. **Image 2 (Center)** - Image uploader
   - Same functionality as Image 1

6. **Image 3 (Right)** - Image uploader
   - Same functionality as Image 1

**Image Upload Process:**
1. Click "Upload Image" button
2. WordPress Media Library opens
3. Select existing image or upload new
4. Click "Use This Image"
5. Preview appears below button
6. Click "Save Settings" to save

---

## 📝 Service Cards

**Location:** Animations → Service Cards

### All Services List

**Columns Displayed:**
- ☑️ Checkbox (for bulk actions)
- 🖼️ **Image** - Thumbnail preview (50x50px)
- 📄 **Title** - Service name (click to edit)
- 🔢 **Number** - Display number (01, 02, 03, etc.)
- 📊 **Order** - Sort order value
- 📅 **Date** - Published date

**Features:**
- Click column headers to sort
- Hover over item to see Quick Edit, Trash
- Bulk actions available (trash, edit)
- Search box at top right

### Add New Service Card

**Fields Available:**

1. **Title** - Main field at top
   - Enter service name
   - Use `\n` for line breaks
   - Example: "CORPORATE VIDEOS\nAND BRANDED FILMS"

2. **Service Card Details** - Meta box
   - **Service Number** - Text input (e.g., "01", "02")
   - **Short Description** - Textarea (3 rows)
     - 1-2 sentences describing the service

3. **Featured Image** - Right sidebar
   - Click "Set featured image"
   - Upload or select from library
   - Recommended size: 800x600px landscape

4. **Page Attributes** - Right sidebar
   - **Order** - Number field
   - Lower numbers appear first
   - Use gaps (0, 10, 20, 30) for easy reordering

**Publish Box:**
- Save Draft
- Preview
- Status: Draft/Published
- Visibility: Public
- Publish button

---

## 📈 Approach Steps

**Location:** Animations → Approach Steps

### All Steps List

**Columns Displayed:**
- ☑️ Checkbox
- 🖼️ **Image** - Thumbnail preview
- 📄 **Title** - Step name (DISCOVER, CREATE, etc.)
- 📊 **Order** - Sort order
- 📅 **Date** - Published date

**Same features as Service Cards list**

### Add New Approach Step

**Fields Available:**

1. **Title** - Main field at top
   - Step name (e.g., "DISCOVER", "CREATE", "REFINE")
   - Use ALL CAPS for consistency

2. **Approach Step Details** - Meta box
   - **Bold Text Part** - Textarea (3 rows)
     - First part of description (will be bold)
     - Example: "WE DIVE DEEP INTO YOUR BRAND AND AUDIENCE, UNCOVER THE STORY WORTH "
   
   - **Regular Text Part** - Textarea (2 rows)
     - Continuation of description
     - Example: "TELLING AND HELP YOU SHAPE YOUR VISION"

3. **Featured Image** - Right sidebar
   - Recommended size: 600x800px portrait
   - Will appear in left column of timeline

4. **Page Attributes** - Right sidebar
   - **Order** - Number field for sorting

**Publish Box:**
- Same as Service Cards

---

## 💡 Admin Interface Tips

### Color Scheme
- Settings page uses standard WordPress blue theme
- Shortcode examples have blue left border
- Success messages are green
- Error messages are red

### Visual Indicators
- Required fields have asterisk (if any)
- Help text appears below fields in gray
- Hover states on buttons
- Image previews show thumbnails

### Responsive Admin
- All pages work on tablets
- Mobile-friendly (though desktop recommended)
- Touch-friendly buttons and inputs

### Common Actions

**To Reorder Items:**
1. Edit each item
2. Set Order field (0, 10, 20, 30)
3. Update each item
4. View list to verify order

**To Bulk Delete:**
1. Check items in list
2. Select "Move to Trash" from bulk actions
3. Click Apply

**To Change Featured Image:**
1. Edit item
2. In Featured Image box, click "Remove featured image"
3. Click "Set featured image"
4. Select new image
5. Update item

---

## 🎯 Quick Start Checklist

After installing v1.1.0:

**Day 1: Configure Settings**
- [ ] Go to Animations → Settings
- [ ] Set Home Animation values
- [ ] Set About Animation values
- [ ] Upload 3 images for About section
- [ ] Click Save Settings on each tab

**Day 2: Add Service Cards**
- [ ] Go to Animations → Service Cards → Add New
- [ ] Create 4 service cards (or more!)
- [ ] Set service number (01, 02, 03, 04)
- [ ] Add descriptions
- [ ] Upload featured images
- [ ] Set order (0, 10, 20, 30)
- [ ] Publish all cards

**Day 3: Add Approach Steps**
- [ ] Go to Animations → Approach Steps → Add New
- [ ] Create 4 timeline steps (or more!)
- [ ] Set titles (DISCOVER, CREATE, etc.)
- [ ] Add bold and regular text parts
- [ ] Upload featured images
- [ ] Set order (0, 10, 20, 30)
- [ ] Publish all steps

**Day 4: Test**
- [ ] View page with [oga_home_animation]
- [ ] View page with [oga_about_spread]
- [ ] View page with [oga_services_cards]
- [ ] View page with [oga_approach_timeline]
- [ ] Verify all dynamic content appears

---

## 📸 Expected Screens

### Settings Page Layout
```
┌─────────────────────────────────────────────┐
│ Animation Settings                          │
├─────────────────────────────────────────────┤
│  [Home Animation] [About Animation]         │
├─────────────────────────────────────────────┤
│                                             │
│  Home Animation Settings                    │
│  ─────────────────────────────────────────  │
│                                             │
│  Main Title: [CRAFTING_____________]        │
│                                             │
│  Highlight Text: [VISUAL STORIES____]      │
│                                             │
│  Subtitle:                                  │
│  ┌─────────────────────────────────────┐   │
│  │ That captivate, inspire, and drive │   │
│  │ results through compelling video   │   │
│  │ production...                      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  CTA: [START A PROJECT_____________]        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Shortcode Usage                     │   │
│  │ [oga_home_animation]               │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Save Settings]                            │
└─────────────────────────────────────────────┘
```

### Service Cards List
```
┌─────────────────────────────────────────────┐
│ Service Cards                    [Add New]  │
├──┬───────┬──────────────┬────────┬─────────┤
│☑│ Image │ Title        │ Number │ Order   │
├──┼───────┼──────────────┼────────┼─────────┤
│☐│ [img] │ CORPORATE... │   01   │   0     │
│☐│ [img] │ CREATIVE...  │   02   │  10     │
│☐│ [img] │ SOCIAL...    │   03   │  20     │
│☐│ [img] │ ANIMATION    │   04   │  30     │
└──┴───────┴──────────────┴────────┴─────────┘
```

### Edit Service Card
```
┌─────────────────────────────────────────────┐
│ Edit Service Card                           │
├─────────────────────────────────────────────┤
│ Title:                                      │
│ [CORPORATE VIDEOS AND BRANDED FILMS____]    │
│                                             │
│ Service Card Details                        │
│ ─────────────────────────────────────────   │
│ Service Number: [01___]                     │
│                                             │
│ Short Description:                          │
│ ┌─────────────────────────────────────┐    │
│ │ We dive deep into your brand...    │    │
│ └─────────────────────────────────────┘    │
│                                             │
│ [Update]                                    │
│                                             │
│ ┌─ Featured Image ──────────────────┐      │
│ │  [Preview Image]                  │      │
│ │  [Set featured image]             │      │
│ └───────────────────────────────────┘      │
│                                             │
│ ┌─ Page Attributes ─────────────────┐      │
│ │  Order: [0_____]                  │      │
│ └───────────────────────────────────┘      │
└─────────────────────────────────────────────┘
```

---

## 🆘 Support

If you don't see these screens:
1. Make sure plugin is activated
2. Clear browser cache
3. Check user has admin role
4. Look for PHP errors in debug log

**Need more help?**
- See DYNAMIC-FEATURES.md for detailed guide
- Check INSTALLATION.md for setup
- Review TROUBLESHOOTING section in docs

---

**Version:** 1.1.0  
**Last Updated:** February 23, 2024  
**Plugin:** Open Gate Animations
