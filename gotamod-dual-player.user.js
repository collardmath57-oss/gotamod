// ==UserScript==
// @name         Gota.io Dual Player Control
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Control two players on one page for gota.io with right-click switching
// @author       gotamod
// @match        https://gota.io/*
// @match        http://gota.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    const config = {
        switchKey: 2, // Right mouse button
        player1Color: '#00ff00',
        player2Color: '#ff00ff',
        borderWidth: '4px',
        transitionTime: '0.3s'
    };

    // State management
    let activePlayer = 1;
    let player1Frame = null;
    let player2Frame = null;
    let isInitialized = false;

    // Initialize dual player setup
    function initializeDualPlayer() {
        if (isInitialized) return;
        
        // Prevent infinite recursion - don't initialize if we're inside an iframe
        if (window.self !== window.top) {
            console.log('GotaMod: Running inside iframe, skipping initialization');
            return;
        }
        
        isInitialized = true;

        // Hide original body content
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';

        // Create container
        const container = document.createElement('div');
        container.id = 'gotamod-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            background: #000;
        `;

        // Create player 1 frame
        player1Frame = createPlayerFrame('player1', 1);
        container.appendChild(player1Frame);

        // Create player 2 frame
        player2Frame = createPlayerFrame('player2', 2);
        container.appendChild(player2Frame);

        // Hide existing content and append container
        const existingContent = document.body.children;
        for (let i = 0; i < existingContent.length; i++) {
            existingContent[i].style.display = 'none';
        }
        document.body.appendChild(container);

        // Create status indicator
        createStatusIndicator();

        // Setup event listeners
        setupEventListeners();

        // Set initial active player
        setActivePlayer(1);
    }

    // Create individual player frame
    function createPlayerFrame(id, playerNum) {
        const frame = document.createElement('div');
        frame.id = `gotamod-${id}`;
        frame.className = 'gotamod-player-frame';
        frame.dataset.player = playerNum;
        frame.style.cssText = `
            position: relative;
            width: 50%;
            height: 100%;
            border: ${config.borderWidth} solid transparent;
            box-sizing: border-box;
            transition: all ${config.transitionTime};
            overflow: hidden;
        `;

        // Create iframe for the game
        const iframe = document.createElement('iframe');
        iframe.src = window.location.href;
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            display: block;
        `;
        iframe.id = `gotamod-iframe-${playerNum}`;

        frame.appendChild(iframe);

        return frame;
    }

    // Create status indicator overlay
    function createStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'gotamod-status';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 10000;
            pointer-events: none;
        `;
        indicator.textContent = 'Player 1 Active - Right Click to Switch';
        document.body.appendChild(indicator);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Prevent context menu on right click
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        }, true);

        // Handle mouse button down for switching
        document.addEventListener('mousedown', function(e) {
            if (e.button === config.switchKey) {
                e.preventDefault();
                e.stopPropagation();
                switchPlayer();
                return false;
            }
        }, true);

        // Keyboard shortcut for switching (Tab key as alternative)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                switchPlayer();
            }
        });
    }

    // Switch between players
    function switchPlayer() {
        activePlayer = activePlayer === 1 ? 2 : 1;
        setActivePlayer(activePlayer);
    }

    // Set active player with visual feedback
    function setActivePlayer(playerNum) {
        activePlayer = playerNum;

        const player1 = document.getElementById('gotamod-player1');
        const player2 = document.getElementById('gotamod-player2');
        const status = document.getElementById('gotamod-status');

        if (playerNum === 1) {
            player1.style.borderColor = config.player1Color;
            player1.style.opacity = '1';
            player1.style.filter = 'none';
            player2.style.borderColor = 'transparent';
            player2.style.opacity = '0.6';
            player2.style.filter = 'grayscale(50%)';
            status.textContent = 'Player 1 Active - Right Click to Switch';
            status.style.color = config.player1Color;
        } else {
            player2.style.borderColor = config.player2Color;
            player2.style.opacity = '1';
            player2.style.filter = 'none';
            player1.style.borderColor = 'transparent';
            player1.style.opacity = '0.6';
            player1.style.filter = 'grayscale(50%)';
            status.textContent = 'Player 2 Active - Right Click to Switch';
            status.style.color = config.player2Color;
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDualPlayer);
    } else {
        // DOM is already loaded
        setTimeout(initializeDualPlayer, 100);
    }

})();
