# Installation Guide for GotaMod

This guide will walk you through installing and using GotaMod step by step.

## Prerequisites

Before installing GotaMod, you need to have:
- A modern web browser (Chrome, Firefox, Edge, or Opera)
- The Tampermonkey browser extension

## Step 1: Install Tampermonkey

### For Chrome
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions)
2. Search for "Tampermonkey"
3. Click "Add to Chrome"
4. Confirm by clicking "Add extension"

### For Firefox
1. Visit [Firefox Add-ons](https://addons.mozilla.org)
2. Search for "Tampermonkey"
3. Click "Add to Firefox"
4. Confirm the installation

### For Edge
1. Visit the [Edge Add-ons Store](https://microsoftedge.microsoft.com/addons)
2. Search for "Tampermonkey"
3. Click "Get"
4. Confirm the installation

## Step 2: Install GotaMod

### Method A: Direct Installation (Recommended)

1. Click this link: [Install GotaMod](https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js)
2. Tampermonkey will open and show you the script
3. Click the "Install" button
4. You're done! The script is now active

### Method B: Manual Installation

1. Open Tampermonkey Dashboard
   - Click the Tampermonkey icon in your browser
   - Select "Dashboard"

2. Create a new script
   - Click the "+" icon (Create a new script)

3. Copy the script
   - Visit [GitHub Repository](https://github.com/collardmath57-oss/gotamod)
   - Open `gotamod.user.js`
   - Copy all the content

4. Paste and save
   - Delete the default template in Tampermonkey
   - Paste the copied script
   - Press Ctrl+S (or Cmd+S on Mac) to save

## Step 3: Using GotaMod

### First Use

1. Visit [gota.io](https://gota.io)
2. You should see a small indicator box in the top-right corner
3. The indicator shows "Player 1" by default

### Controls

**Switching Players:**
- **Right-click** anywhere on the page to switch between Player 1 and Player 2
- The indicator will update to show the active player

**Keyboard Shortcuts:**
- Press **Tab** to switch players
- Press **1** to select Player 1
- Press **2** to select Player 2

**Context Menu:**
- Hold **Shift** and right-click to access the normal browser context menu

### Visual Indicator

The indicator in the top-right corner shows:
- **GotaMod Active** - Script is running
- **Player 1** or **Player 2** - Current active player
- **Color-coded border**:
  - Red = Player 1
  - Teal = Player 2

## Step 4: Troubleshooting

### Script Not Working

1. **Check Tampermonkey is enabled**
   - Click the Tampermonkey icon
   - Make sure it's not disabled (icon should be colored, not gray)

2. **Verify the script is active**
   - Open Tampermonkey Dashboard
   - Find "Gota.io Dual Player Controller"
   - Make sure the toggle is ON (green)

3. **Check the browser console**
   - Press F12 to open Developer Tools
   - Go to the Console tab
   - Look for messages starting with "[GotaMod]"
   - You should see: "[GotaMod] Initializing dual player controller..."

### Indicator Not Showing

1. Refresh the page (F5 or Ctrl+R)
2. Make sure you're on gota.io domain
3. Check if the script matches the domain:
   - Open Tampermonkey Dashboard
   - Edit the script
   - Verify `@match` lines include gota.io

### Right-Click Not Working

1. Make sure you're not holding Shift (Shift+Right-click shows normal menu)
2. Try using keyboard shortcuts (Tab, 1, 2) instead
3. Check if another extension is interfering with mouse events

### Players Not Switching Correctly

1. Open browser console (F12)
2. Check for error messages
3. Try manually switching with keyboard shortcuts
4. If issues persist, reload the page

## Advanced Configuration

### Customizing Colors

Open browser console (F12) and run:
```javascript
window.GotaMod.config.player1Color = '#FF0000'; // Red
window.GotaMod.config.player2Color = '#0000FF'; // Blue
```

### Hiding the Indicator

Run in console:
```javascript
window.GotaMod.config.showIndicator = false;
document.getElementById('gotamod-indicator').remove();
```

### Check Current Player

Run in console:
```javascript
console.log('Active player:', window.GotaMod.getActivePlayer());
```

## Updating GotaMod

The script includes automatic update URLs. Tampermonkey will check for updates:
- Daily (by default)
- Manually from Tampermonkey Dashboard

To manually update:
1. Open Tampermonkey Dashboard
2. Find "Gota.io Dual Player Controller"
3. Click "Last updated" column
4. Click "Check for updates"

## Uninstalling

To remove GotaMod:
1. Open Tampermonkey Dashboard
2. Find "Gota.io Dual Player Controller"
3. Click the trash icon
4. Confirm deletion

## Security & Privacy

- GotaMod runs entirely in your browser
- No data is sent to external servers
- The script only communicates with gota.io servers (normal gameplay)
- All code is open source and auditable

## Need Help?

If you encounter issues not covered here:
1. Check the [FAQ](https://github.com/collardmath57-oss/gotamod#readme)
2. Open an [issue on GitHub](https://github.com/collardmath57-oss/gotamod/issues)
3. Review existing issues for solutions

## CDN Installation (For Developers)

If you want to inject the script directly into a webpage:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Page</title>
    <!-- Add GotaMod via CDN -->
    <script src="https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.min.js"></script>
</head>
<body>
    <!-- Your content -->
</body>
</html>
```

Or use a specific version:
```html
<script src="https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@1.0.0/gotamod.min.js"></script>
```

---

**Enjoy using GotaMod!** 🎮

If this guide helped you, please consider starring the [GitHub repository](https://github.com/collardmath57-oss/gotamod)!
