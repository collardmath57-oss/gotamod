/**
 * GotaMod Bookmarklet
 * 
 * Drag this to your bookmarks bar or create a bookmark with the URL below:
 * 
 * To use: Click the bookmark while on gota.io
 */

// Full bookmarklet URL (copy this entire line as bookmark URL):
// javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@main/gotamod-inject.js';document.head.appendChild(s);})();

// Alternative: Self-contained version (minified inline code)
// javascript:(function(){if(window.GotaMod)return;var c={switchKey:2,player1Color:'#0f0',player2Color:'#f0f',borderWidth:'4px'},a=1,p1,p2;function init(){document.body.style.cssText='margin:0;padding:0;overflow:hidden;width:100vw;height:100vh';var d=document.createElement('div');d.id='gm-c';d.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;display:flex;background:#000;z-index:9999';p1=makeFrame(1);p2=makeFrame(2);d.appendChild(p1);d.appendChild(p2);document.body.appendChild(d);makeStatus();setActive(1);document.addEventListener('contextmenu',e=>e.preventDefault(),true);document.addEventListener('mousedown',e=>{if(e.button===2){e.preventDefault();a=a===1?2:1;setActive(a)}},true)}function makeFrame(n){var f=document.createElement('div');f.style.cssText='width:50%;border:'+c.borderWidth+' solid transparent;transition:all .3s';var i=document.createElement('iframe');i.src=location.href;i.style.cssText='width:100%;height:100%;border:none';f.appendChild(i);return f}function makeStatus(){var s=document.createElement('div');s.id='gm-s';s.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:10px 20px;border-radius:5px;z-index:10001;pointer-events:none';s.textContent='P1 Active';document.body.appendChild(s)}function setActive(n){a=n;var s=document.getElementById('gm-s');if(n===1){p1.style.borderColor=c.player1Color;p1.style.opacity='1';p2.style.opacity='.6';p2.style.borderColor='transparent';s.textContent='P1 Active';s.style.color=c.player1Color}else{p2.style.borderColor=c.player2Color;p2.style.opacity='1';p1.style.opacity='.6';p1.style.borderColor='transparent';s.textContent='P2 Active';s.style.color=c.player2Color}}init()})();

/**
 * Instructions for creating a bookmarklet:
 * 
 * 1. Create a new bookmark in your browser
 * 2. Name it "GotaMod" or any name you prefer
 * 3. Copy one of the javascript: URLs above
 * 4. Paste it as the bookmark's URL
 * 5. Visit gota.io
 * 6. Click the bookmark to activate GotaMod
 * 
 * The first version loads the script from GitHub (requires internet)
 * The second version is self-contained (works offline but larger)
 */

// Pretty-printed version of the self-contained bookmarklet for reference:
/*
javascript:(function() {
    if (window.GotaMod) return;
    
    var config = {
        switchKey: 2,
        player1Color: '#0f0',
        player2Color: '#f0f',
        borderWidth: '4px'
    };
    
    var activePlayer = 1;
    var player1Frame, player2Frame;
    
    function init() {
        document.body.style.cssText = 'margin:0;padding:0;overflow:hidden;width:100vw;height:100vh';
        
        var container = document.createElement('div');
        container.id = 'gm-c';
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;display:flex;background:#000;z-index:9999';
        
        player1Frame = makeFrame(1);
        player2Frame = makeFrame(2);
        container.appendChild(player1Frame);
        container.appendChild(player2Frame);
        document.body.appendChild(container);
        
        makeStatus();
        setActive(1);
        
        document.addEventListener('contextmenu', e => e.preventDefault(), true);
        document.addEventListener('mousedown', e => {
            if (e.button === 2) {
                e.preventDefault();
                activePlayer = activePlayer === 1 ? 2 : 1;
                setActive(activePlayer);
            }
        }, true);
    }
    
    function makeFrame(num) {
        var frame = document.createElement('div');
        frame.style.cssText = 'width:50%;border:' + config.borderWidth + ' solid transparent;transition:all .3s';
        var iframe = document.createElement('iframe');
        iframe.src = location.href;
        iframe.style.cssText = 'width:100%;height:100%;border:none';
        frame.appendChild(iframe);
        return frame;
    }
    
    function makeStatus() {
        var status = document.createElement('div');
        status.id = 'gm-s';
        status.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:10px 20px;border-radius:5px;z-index:10001;pointer-events:none';
        status.textContent = 'P1 Active';
        document.body.appendChild(status);
    }
    
    function setActive(num) {
        activePlayer = num;
        var status = document.getElementById('gm-s');
        if (num === 1) {
            player1Frame.style.borderColor = config.player1Color;
            player1Frame.style.opacity = '1';
            player2Frame.style.opacity = '.6';
            player2Frame.style.borderColor = 'transparent';
            status.textContent = 'P1 Active';
            status.style.color = config.player1Color;
        } else {
            player2Frame.style.borderColor = config.player2Color;
            player2Frame.style.opacity = '1';
            player1Frame.style.opacity = '.6';
            player1Frame.style.borderColor = 'transparent';
            status.textContent = 'P2 Active';
            status.style.color = config.player2Color;
        }
    }
    
    init();
})();
*/
