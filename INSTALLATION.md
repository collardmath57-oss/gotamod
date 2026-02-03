# GotaMod Installation Guide

This guide provides step-by-step instructions for installing GotaMod using different methods.

## Table of Contents

1. [Tampermonkey Installation (Recommended)](#tampermonkey-installation)
2. [Bookmarklet Installation (Quick & Easy)](#bookmarklet-installation)
3. [CDN Injection (Advanced)](#cdn-injection)
4. [Manual Console Injection (Testing)](#manual-console-injection)

---

## Tampermonkey Installation

This is the recommended method as it automatically activates on gota.io.

### Step 1: Install Tampermonkey

First, install the Tampermonkey browser extension:

- **Chrome/Edge**: [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- **Safari**: [App Store](https://apps.apple.com/app/tampermonkey/id1482490089)
- **Opera**: [Opera Add-ons](https://addons.opera.com/extensions/details/tampermonkey-beta/)

### Step 2: Install GotaMod Script

1. Click the Tampermonkey icon in your browser toolbar
2. Select "Dashboard"
3. Click the "+" tab or "Create a new script"
4. Delete any existing code in the editor
5. Copy the entire content from `gotamod-dual-player.user.js`
6. Paste it into the Tampermonkey editor
7. Click "File" → "Save" (or press Ctrl+S / Cmd+S)
8. The script is now installed!

### Step 3: Use GotaMod

1. Visit [gota.io](https://gota.io)
2. GotaMod will automatically initialize
3. You'll see two game instances side-by-side
4. Right-click to switch between players!

---

## Bookmarklet Installation

A bookmarklet is a one-click solution that works without installing extensions.

### Step 1: Create the Bookmark

**Option A - Drag and Drop (easiest):**
1. Open `bookmarklet.js` in a text editor
2. Find the line starting with `javascript:(function(){var s=...`
3. Create a new bookmark in your browser
4. Name it "GotaMod"
5. Paste the javascript: URL as the bookmark's location

**Option B - Manual Creation:**
1. Show your bookmarks bar (Ctrl+Shift+B in most browsers)
2. Right-click on the bookmarks bar
3. Select "Add page" or "Add bookmark"
4. Name: `GotaMod`
5. URL: Copy the javascript: code from `bookmarklet.js`
6. Save the bookmark

### Step 2: Use the Bookmarklet

1. Visit [gota.io](https://gota.io)
2. Click the "GotaMod" bookmark
3. The mod will initialize instantly!

### Notes

- The bookmarklet must be clicked each time you visit gota.io
- You may need to click it twice if it doesn't work the first time
- Some browsers may block bookmarklets on certain sites

---

## CDN Injection

For developers who want to host and inject the script.

### Step 1: Host the Script

Upload `gotamod-inject.js` to your web server or CDN:

```
https://your-domain.com/gotamod-inject.js
```

### Step 2: Inject the Script

**Method A - HTML:**
```html
<script src="https://your-domain.com/gotamod-inject.js"></script>
```

**Method B - JavaScript:**
```javascript
var script = document.createElement('script');
script.src = 'https://your-domain.com/gotamod-inject.js';
document.head.appendChild(script);
```

**Method C - Userscript:**
```javascript
// ==UserScript==
// @name         Load GotaMod
// @match        https://gota.io/*
// @require      https://your-domain.com/gotamod-inject.js
// ==/UserScript==
```

### Step 3: Configure (Optional)

You can customize the configuration before initialization:

```javascript
window.GotaMod.init({
    player1Color: '#ff0000',
    player2Color: '#0000ff',
    splitMode: 'vertical'
});
```

---

## Manual Console Injection

For quick testing without installing anything.

### Step 1: Open Browser Console

- **Windows/Linux**: Press `F12` or `Ctrl+Shift+J`
- **Mac**: Press `Cmd+Option+J`

### Step 2: Inject the Code

1. Copy the entire content of `gotamod-inject.js`
2. Paste it into the console
3. Press Enter

### Step 3: Initialize

```javascript
window.GotaMod.init();
```

The mod will activate immediately!

---

## Troubleshooting

### The mod doesn't appear

- **Check if script is enabled** (Tampermonkey): Click the icon and ensure the script is enabled
- **Refresh the page**: Sometimes a page refresh is needed
- **Check console for errors**: Press F12 and look for error messages

### Right-click doesn't switch players

- **Context menu appears**: The script may not have loaded properly
- **Reload the page** and try again
- **Check browser console** for any error messages

### Performance issues

- **Close other tabs**: Running two game instances is resource-intensive
- **Lower graphics settings**: If the game has graphics options, reduce them
- **Use a more powerful device**: This mod requires decent CPU/GPU

### Iframes blocked

Some browsers or security settings may block iframes:
- **Check browser security settings**
- **Disable strict site isolation** (in browser flags)
- **Try a different browser**

---

## Verification

To verify GotaMod is working correctly:

1. ✅ You should see two game instances side-by-side
2. ✅ Status indicator at top showing "Player 1 Active"
3. ✅ Green border around player 1, no border on player 2
4. ✅ Right-clicking switches the active player
5. ✅ Control panel at bottom right with buttons

---

## Uninstallation

### Tampermonkey
1. Click Tampermonkey icon
2. Select "Dashboard"
3. Find "Gota.io Dual Player Control"
4. Click the trash icon to delete

### Bookmarklet
1. Right-click the bookmark
2. Select "Delete" or "Remove"

### CDN Injection
Remove the script tag or injection code from your page.

---

## Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Check the README.md for more information
- Review the demo.html for examples

---

## Security Note

GotaMod only modifies the visual layout and control scheme. It:
- ✅ Does NOT modify game files
- ✅ Does NOT send data to external servers
- ✅ Does NOT provide gameplay advantages
- ✅ Is purely aesthetic and for convenience

All code is open source and can be reviewed in the repository.
