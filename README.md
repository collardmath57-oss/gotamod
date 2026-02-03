# GotaMod - Dual Player Controller for Gota.io

> 🇫🇷 [Version française](INSTALLATION_FR.md) | 🇬🇧 English | 🚀 [Quick Start](QUICKSTART.md)

A Tampermonkey userscript that allows you to control two players on a single page for gota.io with seamless switching using right-click.

## ⚡ Quick Install

**[📥 Click here to install GotaMod](https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js)** (Requires [Tampermonkey](https://www.tampermonkey.net/))

**🇫🇷 Pour les francophones :** [Guide d'installation en français](INSTALLATION_FR.md)

## 🎮 Features

- **Dual Player Control**: Manage two players simultaneously on one page
- **Right-Click Switching**: Quickly switch between players with right mouse button
- **Visual Indicator**: See which player is currently active
- **Keyboard Shortcuts**: Additional control options with Tab and number keys
- **Aesthetic Enhancement**: Purely aesthetic modification, not a gameplay advantage

## 📦 Installation

### Method 1: Tampermonkey (Recommended)

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click here to install: [Install GotaMod](https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js)
3. Click "Install" in the Tampermonkey popup
4. Visit [gota.io](https://gota.io) and enjoy!

### Method 2: Direct CDN Injection

Add this script tag to inject GotaMod via CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.min.js"></script>
```

### Method 3: Manual Installation

1. Copy the contents of `gotamod.user.js`
2. Open Tampermonkey Dashboard
3. Click "+" to create a new script
4. Paste the code and save
5. Enable the script

## 🎯 Usage

### Basic Controls

- **Right Click**: Switch between Player 1 and Player 2
- **Tab Key**: Alternative switching method
- **1 Key**: Directly select Player 1
- **2 Key**: Directly select Player 2
- **Shift + Right Click**: Show normal context menu

### Visual Indicator

The script displays an indicator in the top-right corner showing:
- Current active player (1 or 2)
- Color-coded border (Red for Player 1, Teal for Player 2)
- Instructions for switching

## ⚙️ Configuration

You can customize the behavior by modifying the `config` object in the script:

```javascript
const config = {
    enableDualPlayer: true,        // Enable/disable dual player mode
    switchKey: 'rightClick',       // Switching method
    player1Color: '#FF6B6B',       // Color indicator for Player 1
    player2Color: '#4ECDC4',       // Color indicator for Player 2
    showIndicator: true            // Show/hide visual indicator
};
```

## 🔧 API Reference

GotaMod exposes a global API for advanced users:

```javascript
// Switch to the other player
window.GotaMod.switchPlayer();

// Set active player directly
window.GotaMod.setActivePlayer(1); // or 2

// Get current active player
window.GotaMod.getActivePlayer(); // returns 1 or 2

// Access configuration
window.GotaMod.config;
```

## 🌐 CDN Information

This project uses jsDelivr CDN for reliable script delivery:

- **Latest Version**: `https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js`
- **Minified Version**: `https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.min.js`
- **Specific Version**: `https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@1.0.0/gotamod.user.js`

The CDN automatically updates within 24 hours of pushing changes to the repository.

## 🚀 How It Works

1. **WebSocket Interception**: The script hooks into the browser's WebSocket API to manage two separate connections
2. **Connection Management**: Maintains two distinct player connections simultaneously
3. **Input Routing**: Routes user input to the currently active player
4. **Visual Feedback**: Provides clear indication of which player is active

## 🛡️ Privacy & Security

- **No Data Collection**: This script does not collect or transmit any user data
- **Local Execution**: All code runs locally in your browser
- **Open Source**: Full source code is available for inspection
- **No Server Communication**: Only communicates with gota.io servers (normal gameplay)

## ⚠️ Disclaimer

This script is for aesthetic and quality-of-life purposes only. It provides no competitive advantage and is designed to enhance the user experience by reducing the need for multiple browser windows.

## 📝 License

MIT License - feel free to modify and distribute

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

## 🔄 Changelog

### Version 1.0.0 (Initial Release)
- Dual player control system
- Right-click switching functionality
- Visual indicator with color coding
- Keyboard shortcuts (Tab, 1, 2)
- CDN integration with jsDelivr
- Comprehensive documentation

## 🎨 Customization Examples

### Change Colors
```javascript
window.GotaMod.config.player1Color = '#FF0000'; // Red
window.GotaMod.config.player2Color = '#0000FF'; // Blue
```

### Disable Indicator
```javascript
window.GotaMod.config.showIndicator = false;
document.getElementById('gotamod-indicator').remove();
```

### Check Current Player
```javascript
console.log('Active player:', window.GotaMod.getActivePlayer());
```

## 🌟 Features Roadmap

- [ ] Custom keybindings configuration
- [ ] Multiple player support (3+)
- [ ] Player-specific settings profiles
- [ ] Statistics tracking per player
- [ ] Enhanced visual customization options

---

**Made with ❤️ for the gota.io community**