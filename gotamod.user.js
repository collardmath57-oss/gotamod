// ==UserScript==
// @name         Gota.io Dual Player Same Server
// @namespace    http://tampermonkey.net/
// @version      2.0.0
// @description  Connect TWO players to the SAME server in gota.io - switch with right-click
// @author       GotaMod
// @match        *://gota.io/*
// @match        *://*.gota.io/*
// @icon         https://gota.io/favicon.ico
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('[GotaMod v2] Loading dual player same server mod...');

    // Configuration
    const CONFIG = {
        PLAYER1_COLOR: '#00ff00',
        PLAYER2_COLOR: '#ff0000',
        BORDER_WIDTH: '4px',
    };

    let activePlayerIndex = 0; // 0 or 1
    let gameConnections = [];
    let indicator = null;
    let overlays = [];
    let isInitialized = false;

    // Hook WebSocket BEFORE the game loads
    const OriginalWebSocket = unsafeWindow.WebSocket || window.WebSocket;
    
    unsafeWindow.WebSocket = window.WebSocket = function(url, protocols) {
        console.log('[GotaMod v2] WebSocket intercepted:', url);
        
        // Create TWO connections to the same server
        const ws1 = new OriginalWebSocket(url, protocols);
        const ws2 = new OriginalWebSocket(url, protocols);
        
        gameConnections = [ws1, ws2];
        
        // Log connections
        ws1.addEventListener('open', () => {
            console.log('[GotaMod v2] Player 1 connected to:', url);
        });
        
        ws2.addEventListener('open', () => {
            console.log('[GotaMod v2] Player 2 connected to:', url);
        });
        
        // Handle messages for both
        ws1.addEventListener('message', (e) => {
            console.log('[GotaMod v2] Player 1 received:', e.data);
        });
        
        ws2.addEventListener('message', (e) => {
            console.log('[GotaMod v2] Player 2 received:', e.data);
        });
        
        // Return active player's connection with safety check
        // Store the current active index to avoid race conditions
        const proxyHandler = {
            get(target, prop) {
                const currentIndex = activePlayerIndex;
                const activeConn = gameConnections[currentIndex];
                if (!activeConn) return target[prop];
                
                if (typeof activeConn[prop] === 'function') {
                    return activeConn[prop].bind(activeConn);
                }
                return activeConn[prop];
            },
            set(target, prop, value) {
                // Set on BOTH connections to maintain consistency
                if (gameConnections[0]) gameConnections[0][prop] = value;
                if (gameConnections[1]) gameConnections[1][prop] = value;
                return true;
            }
        };
        
        const activeWS = new Proxy(ws1, proxyHandler);
        
        return activeWS;
    };
    
    // Copy WebSocket static properties
    Object.setPrototypeOf(unsafeWindow.WebSocket, OriginalWebSocket);
    for (let prop in OriginalWebSocket) {
        if (OriginalWebSocket.hasOwnProperty(prop)) {
            unsafeWindow.WebSocket[prop] = OriginalWebSocket[prop];
        }
    }

    // Initialize UI overlays
    function initUI() {
        if (isInitialized) return;
        isInitialized = true;
        
        console.log('[GotaMod v2] Initializing UI...');
        
        // Create left overlay (Player 1)
        const overlayLeft = document.createElement('div');
        overlayLeft.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 50%;
            height: 100%;
            border-right: ${CONFIG.BORDER_WIDTH} solid ${CONFIG.PLAYER1_COLOR};
            pointer-events: none;
            z-index: 999998;
            box-sizing: border-box;
        `;
        
        // Create right overlay (Player 2)
        const overlayRight = document.createElement('div');
        overlayRight.style.cssText = `
            position: fixed;
            right: 0;
            top: 0;
            width: 50%;
            height: 100%;
            border-left: ${CONFIG.BORDER_WIDTH} solid ${CONFIG.PLAYER2_COLOR};
            pointer-events: none;
            z-index: 999998;
            box-sizing: border-box;
            opacity: 0.5;
        `;
        
        overlays = [overlayLeft, overlayRight];
        
        // Create indicator
        indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background: rgba(0, 255, 0, 0.9);
            color: black;
            font-size: 18px;
            font-weight: bold;
            border-radius: 8px;
            z-index: 999999;
            pointer-events: none;
            font-family: 'Arial', sans-serif;
            box-shadow: 0 4px 15px rgba(0,0,0,0.6);
            border: 2px solid white;
        `;
        indicator.textContent = '🎮 Player 1 (LEFT) | Right-Click to Switch';
        
        // Append to body when ready
        function appendElements() {
            if (document.body) {
                document.body.appendChild(overlayLeft);
                document.body.appendChild(overlayRight);
                document.body.appendChild(indicator);
                console.log('[GotaMod v2] UI elements added');
                
                // Setup input handlers
                setupInputHandlers();
            } else {
                setTimeout(appendElements, 50);
            }
        }
        appendElements();
    }

    // Setup input handlers
    function setupInputHandlers() {
        // Right-click to switch players
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switchPlayer();
            return false;
        }, true);
        
        console.log('[GotaMod v2] Input handlers ready (right-click to switch)');
    }

    // Switch active player
    function switchPlayer() {
        activePlayerIndex = (activePlayerIndex + 1) % 2;
        updateUI();
        console.log(`[GotaMod v2] Switched to Player ${activePlayerIndex + 1}`);
    }

    // Update UI to reflect active player
    function updateUI() {
        if (!indicator || overlays.length < 2) return;
        
        if (activePlayerIndex === 0) {
            // Player 1 active (left)
            overlays[0].style.borderRight = `${CONFIG.BORDER_WIDTH} solid ${CONFIG.PLAYER1_COLOR}`;
            overlays[0].style.opacity = '1';
            overlays[1].style.borderLeft = `${CONFIG.BORDER_WIDTH} solid #555`;
            overlays[1].style.opacity = '0.5';
            
            indicator.style.background = 'rgba(0, 255, 0, 0.9)';
            indicator.style.color = 'black';
            indicator.textContent = '🎮 Player 1 (LEFT) | Right-Click to Switch';
        } else {
            // Player 2 active (right)
            overlays[1].style.borderLeft = `${CONFIG.BORDER_WIDTH} solid ${CONFIG.PLAYER2_COLOR}`;
            overlays[1].style.opacity = '1';
            overlays[0].style.borderRight = `${CONFIG.BORDER_WIDTH} solid #555`;
            overlays[0].style.opacity = '0.5';
            
            indicator.style.background = 'rgba(255, 0, 0, 0.9)';
            indicator.style.color = 'white';
            indicator.textContent = '🎮 Player 2 (RIGHT) | Right-Click to Switch';
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        setTimeout(initUI, 100);
    }
    
    console.log('[GotaMod v2] Script loaded - waiting for game to start...');

})();
