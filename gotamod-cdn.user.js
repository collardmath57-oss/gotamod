// ==UserScript==
// @name         Gota.io Dual Player Control (CDN Version)
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Control two players on a single page in gota.io with right-click switching (CDN injected)
// @author       GotaMod
// @match        *://gota.io/*
// @match        *://*.gota.io/*
// @icon         https://gota.io/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// @connect      *
// ==/UserScript==

(function() {
    'use strict';

    // CDN Configuration
    const CDN_URL = 'https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@main/inject.js';
    
    // Configuration
    const CONFIG = {
        PLAYER1_COLOR: '#00ff00',
        PLAYER2_COLOR: '#ff0000',
        BORDER_WIDTH: '5px'
    };

    let activePlayer = 1;
    let player1Canvas = null;
    let player2Canvas = null;
    let indicator = null;
    let gameInstances = [];

    // Inject CDN script
    function injectCDNScript() {
        console.log('[GotaMod CDN] Injecting CDN script...');
        
        const script = document.createElement('script');
        script.src = CDN_URL;
        script.onerror = function() {
            console.error('[GotaMod CDN] Failed to load CDN script, using embedded version');
            injectEmbeddedScript();
        };
        script.onload = function() {
            console.log('[GotaMod CDN] CDN script loaded successfully');
        };
        
        (document.head || document.documentElement).appendChild(script);
    }

    // Fallback: Inject embedded script
    function injectEmbeddedScript() {
        const script = document.createElement('script');
        script.textContent = getEmbeddedScript();
        (document.head || document.documentElement).appendChild(script);
    }

    // Get embedded script content
    function getEmbeddedScript() {
        return `
            (function() {
                console.log('[GotaMod] Embedded script loaded');
                
                // Hook into the game's WebSocket or main loop
                window.GotaMod = {
                    instances: [],
                    activeInstance: 0,
                    
                    createInstance: function() {
                        const instance = {
                            id: this.instances.length,
                            active: false,
                            inputQueue: []
                        };
                        this.instances.push(instance);
                        return instance;
                    },
                    
                    setActiveInstance: function(index) {
                        this.activeInstance = index;
                        this.instances.forEach((inst, i) => {
                            inst.active = (i === index);
                        });
                    },
                    
                    routeInput: function(eventType, eventData) {
                        const activeInst = this.instances[this.activeInstance];
                        if (activeInst) {
                            activeInst.inputQueue.push({ type: eventType, data: eventData });
                        }
                    }
                };
                
                // Hook into game initialization if possible
                const originalAddEventListener = EventTarget.prototype.addEventListener;
                EventTarget.prototype.addEventListener = function(type, listener, options) {
                    if (type === 'mousemove' || type === 'click' || type === 'keydown') {
                        const wrappedListener = function(event) {
                            if (window.GotaMod && window.GotaMod.instances.length > 0) {
                                window.GotaMod.routeInput(type, event);
                            }
                            return listener.call(this, event);
                        };
                        return originalAddEventListener.call(this, type, wrappedListener, options);
                    }
                    return originalAddEventListener.call(this, type, listener, options);
                };
            })();
        `;
    }

    // Initialize the dual player system with canvas split
    function init() {
        console.log('[GotaMod CDN] Initializing dual player control...');

        // Inject the CDN script first
        injectCDNScript();

        // Wait a bit for the page to load
        setTimeout(() => {
            setupDualView();
        }, 1000);
    }

    // Setup dual view with canvas splitting
    function setupDualView() {
        // Create overlay container
        const container = document.createElement('div');
        container.id = 'gotamod-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.zIndex = '999999';
        container.style.pointerEvents = 'none';
        container.style.display = 'flex';

        // Create left panel (Player 1)
        const leftPanel = document.createElement('div');
        leftPanel.id = 'player1-panel';
        leftPanel.style.width = '50%';
        leftPanel.style.height = '100%';
        leftPanel.style.border = `${CONFIG.BORDER_WIDTH} solid ${CONFIG.PLAYER1_COLOR}`;
        leftPanel.style.boxSizing = 'border-box';
        leftPanel.style.pointerEvents = 'auto';
        leftPanel.style.position = 'relative';

        // Create right panel (Player 2)
        const rightPanel = document.createElement('div');
        rightPanel.id = 'player2-panel';
        rightPanel.style.width = '50%';
        rightPanel.style.height = '100%';
        rightPanel.style.border = `${CONFIG.BORDER_WIDTH} solid ${CONFIG.PLAYER2_COLOR}`;
        rightPanel.style.boxSizing = 'border-box';
        rightPanel.style.pointerEvents = 'auto';
        rightPanel.style.position = 'relative';

        // Create indicator
        indicator = document.createElement('div');
        indicator.style.position = 'fixed';
        indicator.style.top = '10px';
        indicator.style.left = '50%';
        indicator.style.transform = 'translateX(-50%)';
        indicator.style.padding = '10px 20px';
        indicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        indicator.style.color = 'white';
        indicator.style.fontSize = '16px';
        indicator.style.fontWeight = 'bold';
        indicator.style.borderRadius = '5px';
        indicator.style.zIndex = '1000000';
        indicator.style.fontFamily = 'Arial, sans-serif';
        indicator.textContent = 'Player 1 Active (Right-click to switch)';

        container.appendChild(leftPanel);
        container.appendChild(rightPanel);
        document.body.appendChild(container);
        document.body.appendChild(indicator);

        // Setup event handlers
        setupEventHandlers(leftPanel, rightPanel);

        console.log('[GotaMod CDN] Dual view setup complete');
    }

    // Setup event handlers for player switching
    function setupEventHandlers(leftPanel, rightPanel) {
        // Right-click to switch players
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            switchPlayer();
        }, true);

        // Click on panels to activate
        leftPanel.addEventListener('click', () => {
            setActivePlayer(1);
        });

        rightPanel.addEventListener('click', () => {
            setActivePlayer(2);
        });

        // Route inputs to active player
        document.addEventListener('mousemove', routeToActivePlayer, true);
        document.addEventListener('keydown', routeToActivePlayer, true);
        document.addEventListener('keyup', routeToActivePlayer, true);
    }

    // Route events to the active player
    function routeToActivePlayer(e) {
        if (unsafeWindow.GotaMod) {
            unsafeWindow.GotaMod.routeInput(e.type, e);
        }
    }

    // Switch between players
    function switchPlayer() {
        activePlayer = activePlayer === 1 ? 2 : 1;
        setActivePlayer(activePlayer);
    }

    // Set the active player
    function setActivePlayer(playerNum) {
        activePlayer = playerNum;

        const leftPanel = document.getElementById('player1-panel');
        const rightPanel = document.getElementById('player2-panel');

        if (playerNum === 1) {
            if (leftPanel) {
                leftPanel.style.borderColor = CONFIG.PLAYER1_COLOR;
                leftPanel.style.opacity = '1';
            }
            if (rightPanel) {
                rightPanel.style.borderColor = '#333';
                rightPanel.style.opacity = '0.7';
            }
            indicator.textContent = 'Player 1 Active (Right-click to switch)';
            indicator.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
        } else {
            if (rightPanel) {
                rightPanel.style.borderColor = CONFIG.PLAYER2_COLOR;
                rightPanel.style.opacity = '1';
            }
            if (leftPanel) {
                leftPanel.style.borderColor = '#333';
                leftPanel.style.opacity = '0.7';
            }
            indicator.textContent = 'Player 2 Active (Right-click to switch)';
            indicator.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        }

        if (unsafeWindow.GotaMod) {
            unsafeWindow.GotaMod.setActiveInstance(playerNum - 1);
        }

        console.log(`[GotaMod CDN] Switched to Player ${playerNum}`);
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
