# 🎮 GotaMod - Dual Player Control for Gota.io

Control two players on a single page for gota.io with seamless switching using right-click.

## ✨ Features

- **Dual Player View**: Control two gota.io players on one page instead of managing two separate tabs
- **Right-Click Switching**: Instantly switch between players with right mouse button
- **Visual Indicators**: Clear colored borders and status display show which player is active
- **Keyboard Shortcuts**: Alternative controls via Tab, 1, and 2 keys
- **Flexible Layout**: Toggle between horizontal and vertical split screen modes
- **Aesthetic Enhancement**: Purely for visual and control purposes - no gameplay advantages

## 🚀 Installation

### Method 1: Tampermonkey Script (Recommended)

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click on the Tampermonkey icon → "Create new script"
3. Copy the entire content of `gotamod-dual-player.user.js`
4. Paste it into the editor
5. Click "File" → "Save" (or press Ctrl+S)
6. Visit [gota.io](https://gota.io) and the script will automatically activate!

### Method 2: CDN Injection

Host the `gotamod-inject.js` file on your CDN or server, then inject it into the page:

```javascript
var script = document.createElement('script');
script.src = 'https://your-cdn.com/gotamod-inject.js';
document.head.appendChild(script);
```

Or include it directly in your HTML:

```html
<script src="https://your-cdn.com/gotamod-inject.js"></script>
```

### Method 3: Browser Console (Temporary)

For a quick test, you can paste the content of `gotamod-inject.js` directly into your browser's console when on gota.io.

## 🎯 Usage

Once installed, visit [gota.io](https://gota.io) and the mod will automatically initialize with two player views.

### Controls

| Action | Control |
|--------|---------|
| Switch between players | **Right Mouse Button** or **Tab** |
| Select Player 1 | **1** key |
| Select Player 2 | **2** key |
| Toggle split mode | Click "Toggle Split" button |
| Disable mod | Click "Disable" button |

### Visual Feedback

- **Active Player**: Bright colored border (green for P1, magenta for P2) with full opacity
- **Inactive Player**: Transparent border, dimmed, and slightly grayscaled
- **Status Bar**: Shows current active player at the top center of the screen
- **Control Panel**: Located at bottom right with disable and toggle split buttons

## 📁 Files

- **`gotamod-dual-player.user.js`**: Tampermonkey userscript version
- **`gotamod-inject.js`**: CDN-injectable standalone version with API
- **`demo.html`**: Interactive demo page to test the functionality

## 🔧 Configuration

You can customize the mod by editing the configuration object:

```javascript
config: {
    switchKey: 2,              // Mouse button (0=left, 1=middle, 2=right)
    player1Color: '#00ff00',   // Border color for player 1
    player2Color: '#ff00ff',   // Border color for player 2
    borderWidth: '4px',        // Border thickness
    transitionTime: '0.3s',    // Animation duration
    splitMode: 'horizontal'    // 'horizontal' or 'vertical'
}
```

## 🔌 API (CDN Version Only)

The CDN-injectable version exposes a global `GotaMod` object with the following API:

```javascript
// Initialize with custom config
GotaMod.init({
    player1Color: '#ff0000',
    splitMode: 'vertical'
});

// Enable/disable
GotaMod.enable();
GotaMod.disable();

// Control players
GotaMod.switchPlayer();
GotaMod.setActivePlayer(1); // or 2
GotaMod.getActivePlayer();  // returns 1 or 2

// Layout
GotaMod.toggleSplitMode();

// Status
GotaMod.isEnabled(); // returns true/false
```

## 🎬 Demo

Open `demo.html` in your browser to see an interactive demonstration of the mod's features and controls.

## 🛠️ How It Works

GotaMod creates two iframe instances of gota.io displayed side-by-side (or top-to-bottom). Each iframe loads a full instance of the game. The mod captures input events and routes them to the currently active player's iframe. Visual indicators make it clear which player is active.

The right mouse button is captured to switch between players, with the context menu disabled to prevent interference. Keyboard shortcuts provide alternative switching methods.

## ⚠️ Important Notes

- **Purely Aesthetic**: This mod only changes the UI layout and control scheme. It does not modify game mechanics, provide unfair advantages, or constitute cheating.
- **Performance**: Running two game instances requires more system resources. Ensure your device can handle it.
- **Browser Support**: Works on modern browsers (Chrome, Firefox, Edge, Opera) with iframe support.
- **Compatibility**: Designed for gota.io. May not work with other games without modification.

## 📝 License

This project is provided as-is for educational and personal use.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 💡 Tips

- Use keyboard shortcuts (1, 2, Tab) for faster switching during intense gameplay
- Toggle split mode to find your preferred layout (horizontal vs vertical)
- The mod auto-initializes on gota.io domains
- Press 'H' on the demo page for a quick help guide

---

**Version**: 1.0.0  
**Author**: gotamod team  
**Made for**: gota.io players who want enhanced control options