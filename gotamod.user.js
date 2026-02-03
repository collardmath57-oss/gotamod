// ==UserScript==
// @name         Gota.io Dual Player Control
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Control two players on a single page in gota.io with right-click switching
// @author       GotaMod
// @match        *://gota.io/*
// @match        *://*.gota.io/*
// @icon         https://gota.io/favicon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        PLAYER1_COLOR: '#00ff00',
        PLAYER2_COLOR: '#ff0000',
        BORDER_WIDTH: '5px',
        INDICATOR_SIZE: '20px'
    };

    let activePlayer = 1; // 1 or 2
    let player1Frame = null;
    let player2Frame = null;
    let indicator = null;
    let originalBody = null;

    // Initialize the dual player system
    function init() {
        // Store the original body content
        originalBody = document.body.innerHTML;

        // Clear the page
        document.body.innerHTML = '';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';

        // Create container
        const container = document.createElement('div');
        container.id = 'dual-player-container';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.position = 'relative';
        container.style.display = 'flex';

        // Create Player 1 iframe
        player1Frame = createPlayerFrame('player1');
        player1Frame.style.borderColor = CONFIG.PLAYER1_COLOR;

        // Create Player 2 iframe
        player2Frame = createPlayerFrame('player2');
        player2Frame.style.borderColor = CONFIG.PLAYER2_COLOR;

        // Append frames to container
        container.appendChild(player1Frame);
        container.appendChild(player2Frame);

        // Create indicator
        indicator = createIndicator();
        container.appendChild(indicator);

        // Append container to body
        document.body.appendChild(container);

        // Setup event routing
        setupEventRouting();

        // Set initial active player
        setActivePlayer(1);

        console.log('[GotaMod] Dual player control initialized');
    }

    // Create a player frame (iframe)
    function createPlayerFrame(id) {
        const frame = document.createElement('iframe');
        frame.id = id;
        frame.src = window.location.href;
        frame.style.width = '50%';
        frame.style.height = '100%';
        frame.style.border = `${CONFIG.BORDER_WIDTH} solid`;
        frame.style.boxSizing = 'border-box';
        frame.style.position = 'relative';
        frame.allow = 'autoplay';

        return frame;
    }

    // Create active player indicator
    function createIndicator() {
        const ind = document.createElement('div');
        ind.id = 'active-player-indicator';
        ind.style.position = 'absolute';
        ind.style.top = '10px';
        ind.style.left = '50%';
        ind.style.transform = 'translateX(-50%)';
        ind.style.padding = '10px 20px';
        ind.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        ind.style.color = 'white';
        ind.style.fontSize = '16px';
        ind.style.fontWeight = 'bold';
        ind.style.borderRadius = '5px';
        ind.style.zIndex = '10000';
        ind.style.pointerEvents = 'none';
        ind.style.fontFamily = 'Arial, sans-serif';

        return ind;
    }

    // Setup event routing between frames
    function setupEventRouting() {
        // Prevent context menu on right-click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            switchPlayer();
        }, true);

        // Route mouse events
        document.addEventListener('mousemove', routeMouseEvent, true);
        document.addEventListener('mousedown', routeMouseEvent, true);
        document.addEventListener('mouseup', routeMouseEvent, true);
        document.addEventListener('click', routeMouseEvent, true);
        document.addEventListener('wheel', routeMouseEvent, true);

        // Route keyboard events
        document.addEventListener('keydown', routeKeyboardEvent, true);
        document.addEventListener('keyup', routeKeyboardEvent, true);
        document.addEventListener('keypress', routeKeyboardEvent, true);

        console.log('[GotaMod] Event routing setup complete');
    }

    // Route mouse events to the active player
    function routeMouseEvent(e) {
        if (e.button === 2) {
            // Right-click handled separately
            return;
        }

        const activeFrame = activePlayer === 1 ? player1Frame : player2Frame;
        
        try {
            if (activeFrame && activeFrame.contentWindow) {
                const rect = activeFrame.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Create synthetic event in iframe
                const iframeDoc = activeFrame.contentWindow.document;
                const syntheticEvent = new MouseEvent(e.type, {
                    bubbles: true,
                    cancelable: true,
                    view: activeFrame.contentWindow,
                    clientX: x,
                    clientY: y,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    button: e.button,
                    buttons: e.buttons,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    metaKey: e.metaKey
                });

                iframeDoc.dispatchEvent(syntheticEvent);
            }
        } catch (err) {
            // Cross-origin restrictions may apply
            console.warn('[GotaMod] Could not route event:', err);
        }
    }

    // Route keyboard events to the active player
    function routeKeyboardEvent(e) {
        const activeFrame = activePlayer === 1 ? player1Frame : player2Frame;

        try {
            if (activeFrame && activeFrame.contentWindow) {
                const iframeDoc = activeFrame.contentWindow.document;
                const syntheticEvent = new KeyboardEvent(e.type, {
                    bubbles: true,
                    cancelable: true,
                    key: e.key,
                    code: e.code,
                    keyCode: e.keyCode,
                    charCode: e.charCode,
                    which: e.which,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    metaKey: e.metaKey,
                    repeat: e.repeat
                });

                iframeDoc.dispatchEvent(syntheticEvent);
            }
        } catch (err) {
            console.warn('[GotaMod] Could not route keyboard event:', err);
        }
    }

    // Switch between players
    function switchPlayer() {
        activePlayer = activePlayer === 1 ? 2 : 1;
        setActivePlayer(activePlayer);
        console.log(`[GotaMod] Switched to Player ${activePlayer}`);
    }

    // Set the active player and update UI
    function setActivePlayer(playerNum) {
        activePlayer = playerNum;

        if (playerNum === 1) {
            player1Frame.style.borderColor = CONFIG.PLAYER1_COLOR;
            player1Frame.style.opacity = '1';
            player2Frame.style.borderColor = '#333';
            player2Frame.style.opacity = '0.7';
            indicator.textContent = 'Player 1 Active (Right-click to switch)';
            indicator.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
        } else {
            player2Frame.style.borderColor = CONFIG.PLAYER2_COLOR;
            player2Frame.style.opacity = '1';
            player1Frame.style.borderColor = '#333';
            player1Frame.style.opacity = '0.7';
            indicator.textContent = 'Player 2 Active (Right-click to switch)';
            indicator.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        }
    }

    // Wait for page load and initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
