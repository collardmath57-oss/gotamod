# GotaMod Quick Reference

## 🚀 Quick Start

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. [Click to Install GotaMod](https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js)
3. Visit [gota.io](https://gota.io)
4. Right-click to switch between players!

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Right Click** | Switch between Player 1 and Player 2 |
| **Tab** | Alternative switching method |
| **1** | Select Player 1 |
| **2** | Select Player 2 |
| **Shift + Right Click** | Show normal context menu |

## 🎨 Visual Indicators

- **Red Border** = Player 1 Active
- **Teal Border** = Player 2 Active
- **Top-Right Corner** = Indicator location

## 🔧 API Commands

Open browser console (F12) and use:

```javascript
// Check current player
window.GotaMod.getActivePlayer()

// Switch to other player
window.GotaMod.switchPlayer()

// Select specific player
window.GotaMod.setActivePlayer(1) // or 2

// Customize colors
window.GotaMod.config.player1Color = '#FF0000'
window.GotaMod.config.player2Color = '#0000FF'

// Hide indicator
window.GotaMod.config.showIndicator = false
```

## 🌐 CDN Links

### Tampermonkey Installation
```
https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js
```

### Direct CDN Injection
```html
<script src="https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.min.js"></script>
```

### Specific Version
```
https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@1.0.0/gotamod.user.js
```

## 🐛 Troubleshooting

### Script not working?
1. Verify Tampermonkey is enabled (icon should be colored)
2. Check script is active in Tampermonkey Dashboard
3. Refresh the page (F5)
4. Check browser console for errors (F12)

### Indicator not showing?
1. Refresh the page
2. Verify you're on gota.io domain
3. Check console for "[GotaMod]" messages

### Right-click not working?
1. Don't hold Shift (shows normal menu)
2. Try keyboard shortcuts (Tab, 1, 2)
3. Check for conflicting extensions

## 📚 Resources

- [Full Documentation](README.md)
- [Installation Guide](INSTALLATION.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Test Demo Page](test-demo.html)
- [GitHub Repository](https://github.com/collardmath57-oss/gotamod)

## 💡 Tips

- Use **Tab** for quick switching during gameplay
- Use **1** and **2** for direct player selection
- The indicator disappears if you set `showIndicator: false`
- All settings persist until page reload

## 🔐 Security

- ✅ No data collection
- ✅ No external communications (except gota.io)
- ✅ Open source code
- ✅ Runs locally in browser
- ✅ No account access required

## 📞 Support

- 🐛 [Report Issues](https://github.com/collardmath57-oss/gotamod/issues)
- 💬 [Discussions](https://github.com/collardmath57-oss/gotamod/discussions)
- ⭐ [Star on GitHub](https://github.com/collardmath57-oss/gotamod)

---

**Version 1.0.0** | Made with ❤️ for gota.io community
