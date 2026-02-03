# GotaMod - Dual Player Same Server for Gota.io

A Tampermonkey userscript that enables connecting **TWO players to the SAME server** in gota.io (including gota.io/camlan), with easy switching between players using right-click.

## 🎯 Key Feature: SAME SERVER!

Unlike other mods, this connects **both players to the SAME game server**. You're not opening two separate sessions - you're controlling two players in the SAME game!

## Features

- 🎮 **Same Server Connection** - Both players join the SAME game server (not separate sessions!)
- 🖱️ **Right-Click Switching** - Switch between Player 1 (left) and Player 2 (right) instantly  
- 🎨 **Visual Indicators** - Green border (Player 1), Red border (Player 2)
- ⚡ **Real Dual Control** - Two actual game connections to the same server
- 🌐 **Works Everywhere** - gota.io, gota.io/camlan, all servers

## Installation

### Prerequisites

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### Installation Steps

1. Open Tampermonkey dashboard in your browser
2. Click on "Create a new script"
3. Copy the contents of `gotamod.user.js` from this repository
4. Paste it into Tampermonkey and save (Ctrl+S or Cmd+S)
5. Go to **gota.io/camlan** (or any gota.io URL)
6. The script will activate - you'll see borders and an indicator
7. Start a game - TWO players will connect to the SAME server!

## Usage

### Starting the Game

1. Navigate to https://gota.io/camlan (or any gota.io server)
2. Click to start a game as normal
3. The page will show split borders (green left, red right)
4. **Both Player 1 and Player 2 will connect to the SAME server**

### Controls

- **Player 1 (LEFT side)**: Green border when active
- **Player 2 (RIGHT side)**: Red border when active  
- **Right-Click anywhere**: Switch between Player 1 and Player 2
- **Mouse & Keyboard**: Control whichever player is currently active
- **Top Indicator**: Shows which player you're controlling

### How It Works

The script intercepts the WebSocket connection and creates **TWO connections** to the same game server. When you switch players with right-click, your inputs are routed to the corresponding connection. This means:

✅ Both players are in the SAME game  
✅ Both players are on the SAME server  
✅ You see both players in the game world  
✅ You can switch between them instantly  

## Troubleshooting

### Script doesn't activate
- Ensure Tampermonkey is installed and enabled
- Check the script is enabled in Tampermonkey dashboard
- Refresh the gota.io page

### Only one player connects
- Make sure you're using the v2.0.0 version of the script
- Check browser console (F12) for any errors
- The script needs `@grant unsafeWindow` permission

### Can't switch between players
- Ensure right-click isn't blocked by your browser
- Look for the green/red borders - they indicate the script is active
- Check console for "[GotaMod v2]" messages

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