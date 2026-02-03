# Version Comparison: Basic vs CDN

This document helps you choose between the two versions of GotaMod.

## Quick Recommendation

- **New users or prefer simplicity**: Use **Basic Version** (`gotamod.user.js`)
- **Advanced users or want future updates**: Use **CDN Version** (`gotamod-cdn.user.js`)

## Detailed Comparison

| Feature | Basic Version | CDN Version |
|---------|--------------|-------------|
| **Ease of Setup** | ⭐⭐⭐⭐⭐ Very Easy | ⭐⭐⭐⭐ Easy |
| **Dependencies** | None | jsDelivr CDN |
| **Reliability** | ⭐⭐⭐⭐⭐ Very Reliable | ⭐⭐⭐⭐ Reliable |
| **Performance** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| **Updates** | Manual reinstall | Automatic via CDN |
| **Internet Required** | Only for game | For game + CDN |
| **Cross-origin Issues** | May occur | Better handling |
| **File Size** | 8.2 KB | 9.6 KB + 8.5 KB |
| **Maintenance** | Self-contained | CDN dependent |

## Technical Differences

### Basic Version (`gotamod.user.js`)

**How it works:**
```
┌────────────────────────────────────┐
│  Main Page                         │
│  ┌──────────────┬──────────────┐   │
│  │  Iframe 1    │  Iframe 2    │   │
│  │  (gota.io)   │  (gota.io)   │   │
│  │              │              │   │
│  │  Game        │  Game        │   │
│  │  Instance 1  │  Instance 2  │   │
│  └──────────────┴──────────────┘   │
│  Events routed via DOM             │
└────────────────────────────────────┘
```

**Pros:**
- ✅ No external dependencies
- ✅ Works offline (once game loads)
- ✅ Simple architecture
- ✅ Guaranteed to work
- ✅ Easy to understand and modify

**Cons:**
- ⚠️ Slightly higher memory usage (2 full iframes)
- ⚠️ May have cross-origin restrictions
- ⚠️ Requires manual updates

**Best for:**
- First-time users
- Users with unreliable internet
- Users who prefer self-contained solutions
- Testing and development

### CDN Version (`gotamod-cdn.user.js`)

**How it works:**
```
┌────────────────────────────────────┐
│  Main Page                         │
│  ┌────────────────────────────┐   │
│  │  inject.js (from CDN)      │   │
│  │  ↓                          │   │
│  │  Game Instance Manager     │   │
│  │  ├─ Player 1 Instance      │   │
│  │  └─ Player 2 Instance      │   │
│  │                             │   │
│  │  WebSocket Hook            │   │
│  │  ├─ Connection 1           │   │
│  │  └─ Connection 2           │   │
│  └────────────────────────────┘   │
│  Events routed via injected code  │
└────────────────────────────────────┘
```

**Pros:**
- ✅ More efficient memory usage
- ✅ Automatic updates via CDN
- ✅ Better game integration
- ✅ Advanced features (WebSocket hook, canvas split)
- ✅ Better performance

**Cons:**
- ⚠️ Requires CDN access
- ⚠️ Slightly more complex
- ⚠️ May fail if CDN is down (has fallback)

**Best for:**
- Advanced users
- Users who want automatic updates
- Users with stable internet
- Better performance requirements

## Feature Availability

| Feature | Basic | CDN |
|---------|-------|-----|
| Dual player control | ✅ | ✅ |
| Right-click switching | ✅ | ✅ |
| Visual indicators | ✅ | ✅ |
| Keyboard input routing | ✅ | ✅ |
| Mouse input routing | ✅ | ✅ |
| Independent game states | ✅ | ✅ |
| WebSocket management | ⚠️ Limited | ✅ Full |
| Canvas splitting | ❌ | ✅ |
| Game event hooks | ⚠️ Limited | ✅ Deep |
| Automatic updates | ❌ | ✅ |
| Offline capable | ✅ | ⚠️ Partial |

## Performance Comparison

### Basic Version
- Memory: ~200-300 MB (2 full iframes)
- CPU: Moderate (2 separate game instances)
- Network: 2x game traffic
- Latency: Low (direct iframe communication)

### CDN Version
- Memory: ~150-250 MB (shared resources)
- CPU: Lower (shared game engine)
- Network: 2x game traffic + initial CDN load
- Latency: Very Low (direct game integration)

## Installation Comparison

### Basic Version
```
1. Install Tampermonkey
2. Copy gotamod.user.js
3. Create new script
4. Paste and save
5. Visit gota.io
✅ Done in 2 minutes
```

### CDN Version
```
1. Install Tampermonkey
2. Copy gotamod-cdn.user.js
3. Create new script
4. Paste and save
5. Visit gota.io
6. Wait for CDN load (1-2 seconds)
✅ Done in 2-3 minutes
```

## Update Process

### Basic Version
```
1. New version released
2. Copy new gotamod.user.js
3. Edit existing script in Tampermonkey
4. Replace content and save
5. Refresh gota.io
⏱️ Takes ~3 minutes
```

### CDN Version
```
1. New version released
2. Auto-updates via CDN
3. Refresh gota.io
⏱️ Takes ~5 seconds
```

## Troubleshooting

### If Basic Version Has Issues
→ Try CDN version
→ Check iframe security settings
→ Verify Tampermonkey permissions

### If CDN Version Has Issues
→ Try Basic version
→ Check internet connection
→ Verify CDN is accessible
→ Check browser console for errors

## Switching Between Versions

To switch from one to another:

1. Open Tampermonkey dashboard
2. Disable/delete current version
3. Install new version
4. Refresh gota.io

Your choice doesn't affect your game progress!

## Recommendation by Use Case

| Use Case | Recommended Version |
|----------|-------------------|
| Just trying it out | Basic |
| Long-term use | CDN |
| Unstable internet | Basic |
| Want best performance | CDN |
| Privacy concerned | Basic |
| Want latest features | CDN |
| Development/testing | Basic |
| Production use | CDN |

## Summary

**Choose Basic** if you want:
- Simplicity
- Self-contained solution
- No CDN dependency
- Easier troubleshooting

**Choose CDN** if you want:
- Better performance
- Automatic updates
- Advanced features
- Best user experience

**Still unsure?** Start with Basic version. You can always switch later!

---

Both versions provide the same core functionality - controlling two players on one page with right-click switching. The choice mainly affects installation complexity and update convenience.
