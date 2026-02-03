// ==UserScript==
// @name         Gota.io Dual Player Controller
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Control two players on one page for gota.io with right-click switching
// @author       GotaMod
// @match        *://gota.io/*
// @match        *://*.gota.io/*
// @grant        none
// @run-at       document-start
// @updateURL    https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const config = {
        enableDualPlayer: true,
        switchKey: 'rightClick', // Switch between players with right click
        player1Color: '#FF6B6B',
        player2Color: '#4ECDC4',
        showIndicator: true
    };

    // State management
    let activePlayer = 1;
    let player1Connection = null;
    let player2Connection = null;
    let originalWebSocket = null;

    // Create visual indicator
    function createIndicator() {
        if (!config.showIndicator) return;

        const indicator = document.createElement('div');
        indicator.id = 'gotamod-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            font-family: Arial, sans-serif;
            font-size: 14px;
            border-radius: 5px;
            z-index: 10000;
            pointer-events: none;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(indicator);
        updateIndicator();
    }

    function updateIndicator() {
        const indicator = document.getElementById('gotamod-indicator');
        if (!indicator) return;

        const color = activePlayer === 1 ? config.player1Color : config.player2Color;
        indicator.style.borderLeft = `4px solid ${color}`;
        indicator.innerHTML = `
            <div style="font-weight: bold;">GotaMod Active</div>
            <div>Player ${activePlayer} (Right-click to switch)</div>
        `;
    }

    // Switch between players
    function switchPlayer() {
        activePlayer = activePlayer === 1 ? 2 : 1;
        updateIndicator();
        console.log(`[GotaMod] Switched to Player ${activePlayer}`);
    }

    // Hook into WebSocket to manage dual connections
    function setupDualPlayer() {
        originalWebSocket = window.WebSocket;

        window.WebSocket = function(url, protocols) {
            const ws = new originalWebSocket(url, protocols);

            // Store connections for both players
            if (!player1Connection) {
                player1Connection = ws;
                console.log('[GotaMod] Player 1 connection established');
            } else if (!player2Connection) {
                player2Connection = ws;
                console.log('[GotaMod] Player 2 connection established');
            }

            // Intercept messages based on active player
            const originalSend = ws.send;
            ws.send = function(data) {
                // Route message to active player's connection
                const targetConnection = activePlayer === 1 ? player1Connection : player2Connection;
                if (targetConnection && targetConnection.readyState === WebSocket.OPEN) {
                    originalSend.call(targetConnection, data);
                } else {
                    originalSend.call(ws, data);
                }
            };

            return ws;
        };

        // Copy properties from original WebSocket
        Object.setPrototypeOf(window.WebSocket, originalWebSocket);
        window.WebSocket.prototype = originalWebSocket.prototype;
        window.WebSocket.CONNECTING = originalWebSocket.CONNECTING;
        window.WebSocket.OPEN = originalWebSocket.OPEN;
        window.WebSocket.CLOSING = originalWebSocket.CLOSING;
        window.WebSocket.CLOSED = originalWebSocket.CLOSED;
    }

    // Setup right-click listener
    function setupSwitchListener() {
        document.addEventListener('contextmenu', function(e) {
            if (config.switchKey === 'rightClick') {
                e.preventDefault();
                switchPlayer();
            }
        }, true);

        // Alternative: use a key combo (e.g., Shift + Right Click for normal context menu)
        document.addEventListener('mousedown', function(e) {
            if (e.button === 2 && !e.shiftKey) { // Right click without Shift
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    // Keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Tab key to switch players
            if (e.key === 'Tab') {
                e.preventDefault();
                switchPlayer();
            }
            // Number keys to select specific player
            if (e.key === '1') {
                activePlayer = 1;
                updateIndicator();
            }
            if (e.key === '2') {
                activePlayer = 2;
                updateIndicator();
            }
        });
    }

    // Initialize the mod
    function init() {
        console.log('[GotaMod] Initializing dual player controller...');

        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Setup dual player functionality
        if (config.enableDualPlayer) {
            setupDualPlayer();
            setupSwitchListener();
            setupKeyboardShortcuts();
        }

        // Create visual indicator when body is available
        const checkBody = setInterval(() => {
            if (document.body) {
                clearInterval(checkBody);
                createIndicator();
            }
        }, 100);

        console.log('[GotaMod] Dual player controller initialized!');
    }

    // Start initialization
    init();

    // Expose API for debugging
    window.GotaMod = {
        version: '1.0.0',
        switchPlayer: switchPlayer,
        setActivePlayer: function(player) {
            if (player === 1 || player === 2) {
                activePlayer = player;
                updateIndicator();
            }
        },
        getActivePlayer: function() {
            return activePlayer;
        },
        config: config
    };
})();
