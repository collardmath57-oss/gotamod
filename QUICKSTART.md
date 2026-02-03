# GotaMod Quick Start Guide

## 🎯 What This Does

Connects **2 players to the SAME server** in gota.io without opening 2 pages!

Perfect for **gota.io/camlan** - both players join the same game session.

## Installation (2 minutes)

### Step 1: Install Tampermonkey
- Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
- Edge: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd

### Step 2: Install GotaMod Script

1. Open Tampermonkey dashboard (click extension icon → Dashboard)
2. Click "Create a new script" (+ button)
3. Copy all content from `gotamod.user.js` in this repo
4. Paste into Tampermonkey editor
5. Save (Ctrl+S)

### Step 3: Play with 2 Players!

1. Go to **https://gota.io/camlan** (or any gota.io URL)
2. Start a game
3. **TWO players connect to the SAME server automatically!**
4. Right-click to switch between them

## Controls

| Action | Control |
|--------|---------|
| Switch Players | Right-Click anywhere |
| Control Active Player | Mouse + Keyboard (normal gameplay) |
| See Active Player | Green border (P1 left) or Red border (P2 right) |

## Visual Guide

```
┌────────────────────────────────────────────────────┐
│    🎮 Player 1 (LEFT) | Right-Click to Switch     │
├──────────────────────────┬─────────────────────────┤
│                          │                         │
│    Player 1 (Green)      │    Player 2 (Red)       │
│    ● Active              │    ○ Inactive           │
│    ▓▓▓▓▓▓▓▓▓▓▓▓         │    ░░░░░░░░░░░░        │
│                          │                         │
│    Both in SAME game!    │                         │
│                          │                         │
└──────────────────────────┴─────────────────────────┘
```

## Key Feature: SAME SERVER!

Unlike other mods that open 2 separate browser tabs/windows:

- ✅ Both players connect to the SAME game server
- ✅ Both players are in the SAME match
- ✅ You can see both players in the game world
- ✅ Switch between them with right-click
- ✅ No need for multiple windows!

## Tips & Tricks

1. **Start Both Players**: Play in Player 1 first, then switch to Player 2 to start the second game
2. **Quick Switching**: Right-click is instant - use it frequently
3. **Visual Cues**: 
   - Green border = Player 1 active
   - Red border = Player 2 active
   - Dimmed = Inactive player
4. **Performance**: Close unnecessary tabs for better performance
5. **Strategy**: Use both players to dominate the map!

## Troubleshooting

### Script not working?
✓ Check Tampermonkey is enabled (icon in browser toolbar)
✓ Check script is enabled in Tampermonkey dashboard
✓ Refresh gota.io page
✓ Try clearing browser cache

### Can't switch players?
✓ Ensure right-click isn't blocked
✓ Click directly on game area
✓ Check browser console for errors (F12)

### Performance issues?
✓ Use basic version instead of CDN version
✓ Close other tabs
✓ Reduce game graphics settings

## Uninstallation

1. Open Tampermonkey dashboard
2. Find "Gota.io Dual Player Control"
3. Click trash icon to delete
4. Refresh gota.io

## Support

- GitHub Issues: https://github.com/collardmath57-oss/gotamod/issues
- GitHub Discussions: https://github.com/collardmath57-oss/gotamod/discussions

## Version

Current version: 1.0.0

Enjoy playing with dual player control! 🎮🎮
