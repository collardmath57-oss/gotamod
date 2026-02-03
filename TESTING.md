# Testing GotaMod v2.0

## What to Test

The key feature is that **BOTH players connect to the SAME server**. This is different from the old approach.

## Test Steps

### 1. Install the Script

1. Install Tampermonkey
2. Copy `gotamod.user.js` content
3. Create new script in Tampermonkey
4. Paste and save
5. Ensure script is enabled

### 2. Test on gota.io/camlan

1. Navigate to `https://gota.io/camlan`
2. You should see:
   - Green border on left side
   - Red border on right side (dimmed)
   - Top indicator: "🎮 Player 1 (LEFT) | Right-Click to Switch"

3. Check browser console (F12):
   - Should see: `[GotaMod v2] Loading dual player same server mod...`
   - Should see: `[GotaMod v2] Script loaded - waiting for game to start...`

### 3. Start a Game

1. Click to start/join a game
2. Check browser console:
   - Should see: `[GotaMod v2] WebSocket intercepted: [url]`
   - Should see: `[GotaMod v2] Player 1 connected to: [url]`
   - Should see: `[GotaMod v2] Player 2 connected to: [url]`
   
3. **IMPORTANT**: Both players should connect to the SAME URL!

### 4. Test Player Switching

1. Right-click anywhere on the page
2. Indicator should change to: "🎮 Player 2 (RIGHT) | Right-Click to Switch"
3. Red border should become bright, green border should dim
4. Console should show: `[GotaMod v2] Switched to Player 2`

5. Right-click again
6. Should switch back to Player 1

### 5. Test Gameplay

1. Move mouse - your active player should move
2. Click - active player should perform action
3. Press keys - active player should respond
4. Switch players and repeat

### 6. Verify Both Players in Same Game

**Critical Test:**
1. Control Player 1 and move to a location
2. Right-click to switch to Player 2
3. Look around - you should SEE Player 1 in the game!
4. Move Player 2
5. Switch back to Player 1
6. You should SEE Player 2!

If you can see both players in the same game world, it's working correctly!

## Expected Console Output

```
[GotaMod v2] Loading dual player same server mod...
[GotaMod v2] Script loaded - waiting for game to start...
[GotaMod v2] Initializing UI...
[GotaMod v2] UI elements added
[GotaMod v2] Input handlers ready
[GotaMod v2] WebSocket intercepted: wss://gota.io/...
[GotaMod v2] Player 1 connected to: wss://gota.io/...
[GotaMod v2] Player 2 connected to: wss://gota.io/...
[GotaMod v2] Switched to Player 2
[GotaMod v2] Switched to Player 1
```

## Common Issues

### Only one player connects
- Check that `@grant unsafeWindow` is in the script header
- Make sure Tampermonkey has necessary permissions
- Try refreshing the page

### Can't see second player in game
- This means the script is creating separate sessions (bug!)
- Check console to see if both WebSockets use SAME URL
- Report issue if URLs are different

### Right-click doesn't work
- Check if browser is blocking right-click
- Try clicking directly in game area
- Check console for errors

### Borders don't show
- DOM might not be ready yet
- Try refreshing page
- Check console for errors

## Success Criteria

✅ Both WebSocket connections use the SAME URL  
✅ Can switch between Player 1 and Player 2 with right-click  
✅ Visual indicators update correctly  
✅ Both players appear in the SAME game world  
✅ Can control each player independently  

## Reporting Issues

If something doesn't work:

1. Open browser console (F12)
2. Copy all `[GotaMod v2]` messages
3. Note what URL you were testing on
4. Describe what happened vs what should happen
5. Open GitHub issue with this info

## Notes

- The script hooks WebSocket BEFORE the game loads (document-start)
- It creates TWO connections when game tries to create ONE
- Input is routed to the active player's connection
- Both connections go to the SAME server URL
