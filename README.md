# GotaMod - Dual Player Control for Gota.io

A Tampermonkey userscript that enables controlling two players on a single page in gota.io, with easy switching between players using right-click.

## Features

- 🎮 **Dual Player Control** - Control two game instances simultaneously on one page
- 🖱️ **Right-Click Switching** - Switch between players with a simple right-click
- 🎨 **Visual Indicators** - Clear borders and indicators show which player is active
- 🌐 **CDN Support** - Modular architecture with CDN-hosted injection code
- ⚡ **Performance Optimized** - Efficient event routing and game state management

## Installation

### Prerequisites

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### Method 1: Basic Version (Recommended for most users)

1. Open Tampermonkey dashboard in your browser
2. Click on "Create a new script"
3. Copy the contents of `gotamod.user.js` and paste it
4. Save the script (Ctrl+S or Cmd+S)
5. Navigate to gota.io and the script will activate automatically

### Method 2: CDN Version (Advanced)

1. Open Tampermonkey dashboard in your browser
2. Click on "Create a new script"
3. Copy the contents of `gotamod-cdn.user.js` and paste it
4. Save the script
5. Navigate to gota.io

The CDN version will automatically load the inject.js from jsDelivr CDN:
```
https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@main/inject.js
```

## Usage

### Starting the Game

1. Navigate to https://gota.io/
2. The page will automatically split into two game instances
3. Each side will show a separate game view

### Controls

- **Left Side (Player 1)**: Green border when active
- **Right Side (Player 2)**: Red border when active
- **Right-Click**: Switch between Player 1 and Player 2
- **Mouse & Keyboard**: Automatically routed to the active player
- **Top Center Indicator**: Shows which player is currently active

### Tips

- Start playing in one instance first, then switch to control the second player
- Use right-click frequently to manage both players effectively
- Each player has independent game state and connection

## File Structure

```
gotamod/
├── gotamod.user.js        # Basic Tampermonkey script (iframe-based)
├── gotamod-cdn.user.js    # CDN-enabled version
├── inject.js              # CDN-hosted injection code
└── README.md              # This file
```

## How It Works

### Basic Version (`gotamod.user.js`)
- Creates two iframes, each loading gota.io independently
- Routes mouse and keyboard events to the active iframe
- Simple and reliable, works without external dependencies

### CDN Version (`gotamod-cdn.user.js`)
- Loads injection code from CDN
- Hooks into game events at a deeper level
- Supports WebSocket interception for better multiplayer control
- Can split game canvas for more efficient rendering

### Injection Script (`inject.js`)
- Provides game event management
- Handles WebSocket connections for both players
- Manages input routing and game state
- Can be hosted on any CDN (GitHub + jsDelivr recommended)

## Development

### Local Testing

1. Clone this repository
2. Open Tampermonkey dashboard
3. Import the desired script
4. Make changes and reload gota.io to test

### Hosting inject.js on CDN

The inject.js file is automatically available via jsDelivr once pushed to GitHub:

```
https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@main/inject.js
```

For a specific version/tag:
```
https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@v1.0.0/inject.js
```

## Compatibility

- ✅ Chrome/Chromium browsers
- ✅ Firefox
- ✅ Edge
- ✅ Opera
- ✅ Safari (with Tampermonkey or Userscripts)

## Troubleshooting

### Script doesn't activate
- Ensure Tampermonkey is installed and enabled
- Check that the script is enabled in Tampermonkey dashboard
- Verify you're on gota.io (not a different domain)

### Events not routing properly
- Try refreshing the page
- Check browser console for error messages
- Switch to the basic version if CDN version has issues

### Performance issues
- Close other tabs to free up resources
- Reduce graphics quality in game settings
- Try the basic version instead of CDN version

### Can't switch between players
- Ensure right-click is working (not blocked by browser)
- Try clicking directly on one of the game panels
- Check that both iframes have loaded properly

## License

MIT License - Feel free to modify and distribute

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This userscript is for educational purposes. Use responsibly and in accordance with gota.io's terms of service. The developers are not responsible for any consequences of using this script.

## Credits

Developed by the GotaMod team for the gota.io community.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Contribute improvements via pull requests