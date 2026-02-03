# GotaMod Quick Start Guide

## Installation (5 minutes)

### Step 1: Install Tampermonkey
- Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
- Edge: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd

### Step 2: Install GotaMod Script

**Option A: Basic Version (Recommended)**
1. Click [here](https://raw.githubusercontent.com/collardmath57-oss/gotamod/main/gotamod.user.js)
2. Tampermonkey will detect it - click "Install"

**Option B: CDN Version (Advanced)**
1. Click [here](https://raw.githubusercontent.com/collardmath57-oss/gotamod/main/gotamod-cdn.user.js)
2. Tampermonkey will detect it - click "Install"

### Step 3: Play
1. Go to https://gota.io/
2. The page splits into two game instances automatically
3. Start playing!

## Controls

| Action | Control |
|--------|---------|
| Switch Players | Right-Click anywhere |
| Control Active Player | Mouse + Keyboard (normal gameplay) |
| View Active Player | Look at border color & top indicator |

## Visual Guide

```
┌─────────────────────────────────────────────────────────┐
│              Player 1 Active (Right-click to switch)    │
│                        [Indicator]                       │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│    Player 1 (Green)      │    Player 2 (Gray)           │
│    ● Active              │    ○ Inactive                │
│    ▓▓▓▓▓▓▓▓▓▓▓▓         │    ░░░░░░░░░░░░             │
│                          │                              │
│    [Game Instance 1]     │    [Game Instance 2]         │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
```

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
