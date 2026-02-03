/**
 * Gota.io Dual Player Control - CDN Injectable Version
 * Version: 1.0.0
 * Description: Control two players on one page for gota.io with right-click switching
 * 
 * Usage: Include this script in your HTML or inject via CDN:
 * <script src="https://your-cdn.com/gotamod-inject.js"></script>
 * 
 * Or inject programmatically:
 * var script = document.createElement('script');
 * script.src = 'https://your-cdn.com/gotamod-inject.js';
 * document.head.appendChild(script);
 */

(function(window) {
    'use strict';

    // Prevent multiple initializations
    if (window.GotaMod) {
        console.log('GotaMod already initialized');
        return;
    }

    // GotaMod namespace
    window.GotaMod = {
        version: '1.0.0',
        config: {
            switchKey: 2, // Right mouse button
            player1Color: '#00ff00',
            player2Color: '#ff00ff',
            borderWidth: '4px',
            transitionTime: '0.3s',
            splitMode: 'horizontal' // 'horizontal' or 'vertical'
        },
        
        state: {
            activePlayer: 1,
            player1Frame: null,
            player2Frame: null,
            isInitialized: false,
            isEnabled: false
        },

        // Initialize the dual player system
        init: function(customConfig) {
            if (this.state.isInitialized) {
                console.log('GotaMod already initialized');
                return;
            }

            // Merge custom config
            if (customConfig) {
                Object.assign(this.config, customConfig);
            }

            console.log('Initializing GotaMod v' + this.version);
            this.state.isInitialized = true;
            this.enable();
        },

        // Enable dual player mode
        enable: function() {
            if (this.state.isEnabled) return;
            this.state.isEnabled = true;

            // Setup the UI
            this.setupUI();
            this.setupEventListeners();
            this.setActivePlayer(1);

            console.log('GotaMod enabled');
        },

        // Disable dual player mode
        disable: function() {
            if (!this.state.isEnabled) return;
            this.state.isEnabled = false;

            const container = document.getElementById('gotamod-container');
            if (container) {
                container.remove();
            }

            console.log('GotaMod disabled');
        },

        // Setup UI elements
        setupUI: function() {
            // Prepare body
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100vw';
            document.body.style.height = '100vh';

            // Create main container
            const container = document.createElement('div');
            container.id = 'gotamod-container';
            
            const isHorizontal = this.config.splitMode === 'horizontal';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: ${isHorizontal ? 'row' : 'column'};
                background: #000;
                z-index: 9999;
            `;

            // Create player frames
            this.state.player1Frame = this.createPlayerFrame('player1', 1, isHorizontal);
            this.state.player2Frame = this.createPlayerFrame('player2', 2, isHorizontal);

            container.appendChild(this.state.player1Frame);
            container.appendChild(this.state.player2Frame);

            // Add to body
            document.body.appendChild(container);

            // Create control panel
            this.createControlPanel();

            // Create status indicator
            this.createStatusIndicator();
        },

        // Create individual player frame
        createPlayerFrame: function(id, playerNum, isHorizontal) {
            const frame = document.createElement('div');
            frame.id = `gotamod-${id}`;
            frame.className = 'gotamod-player-frame';
            frame.dataset.player = playerNum;
            
            const size = isHorizontal ? 'width: 50%' : 'height: 50%';
            frame.style.cssText = `
                position: relative;
                ${size};
                border: ${this.config.borderWidth} solid transparent;
                box-sizing: border-box;
                transition: all ${this.config.transitionTime};
                overflow: hidden;
            `;

            // Create iframe
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
        },

        // Create control panel
        createControlPanel: function() {
            const panel = document.createElement('div');
            panel.id = 'gotamod-control-panel';
            panel.style.cssText = `
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-family: Arial, sans-serif;
                font-size: 12px;
                z-index: 10001;
                display: flex;
                gap: 10px;
                align-items: center;
            `;

            // Toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Disable';
            toggleBtn.style.cssText = `
                padding: 5px 10px;
                background: #ff4444;
                border: none;
                border-radius: 3px;
                color: white;
                cursor: pointer;
                font-size: 11px;
            `;
            toggleBtn.onclick = () => {
                this.disable();
            };

            // Split mode toggle
            const splitBtn = document.createElement('button');
            splitBtn.textContent = 'Toggle Split';
            splitBtn.style.cssText = `
                padding: 5px 10px;
                background: #4444ff;
                border: none;
                border-radius: 3px;
                color: white;
                cursor: pointer;
                font-size: 11px;
            `;
            splitBtn.onclick = () => {
                this.toggleSplitMode();
            };

            panel.appendChild(toggleBtn);
            panel.appendChild(splitBtn);
            document.body.appendChild(panel);
        },

        // Create status indicator
        createStatusIndicator: function() {
            const indicator = document.createElement('div');
            indicator.id = 'gotamod-status';
            indicator.style.cssText = `
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                font-weight: bold;
                z-index: 10001;
                pointer-events: none;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            `;
            indicator.textContent = 'Player 1 Active';
            document.body.appendChild(indicator);
        },

        // Setup event listeners
        setupEventListeners: function() {
            // Prevent context menu on right click
            document.addEventListener('contextmenu', (e) => {
                if (this.state.isEnabled) {
                    e.preventDefault();
                    return false;
                }
            }, true);

            // Mouse button switching
            document.addEventListener('mousedown', (e) => {
                if (this.state.isEnabled && e.button === this.config.switchKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.switchPlayer();
                    return false;
                }
            }, true);

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (!this.state.isEnabled) return;

                // Tab to switch
                if (e.key === 'Tab') {
                    e.preventDefault();
                    this.switchPlayer();
                }
                
                // 1 and 2 to directly select player
                if (e.key === '1') {
                    e.preventDefault();
                    this.setActivePlayer(1);
                }
                if (e.key === '2') {
                    e.preventDefault();
                    this.setActivePlayer(2);
                }
            });
        },

        // Switch between players
        switchPlayer: function() {
            const newPlayer = this.state.activePlayer === 1 ? 2 : 1;
            this.setActivePlayer(newPlayer);
        },

        // Set active player
        setActivePlayer: function(playerNum) {
            if (!this.state.isEnabled) return;

            this.state.activePlayer = playerNum;

            const player1 = this.state.player1Frame;
            const player2 = this.state.player2Frame;
            const status = document.getElementById('gotamod-status');

            if (!player1 || !player2 || !status) return;

            if (playerNum === 1) {
                player1.style.borderColor = this.config.player1Color;
                player1.style.opacity = '1';
                player1.style.filter = 'none';
                player2.style.borderColor = 'transparent';
                player2.style.opacity = '0.6';
                player2.style.filter = 'grayscale(50%) brightness(0.7)';
                status.textContent = 'Player 1 Active (Right Click or Tab to Switch)';
                status.style.color = this.config.player1Color;
            } else {
                player2.style.borderColor = this.config.player2Color;
                player2.style.opacity = '1';
                player2.style.filter = 'none';
                player1.style.borderColor = 'transparent';
                player1.style.opacity = '0.6';
                player1.style.filter = 'grayscale(50%) brightness(0.7)';
                status.textContent = 'Player 2 Active (Right Click or Tab to Switch)';
                status.style.color = this.config.player2Color;
            }
        },

        // Toggle split mode
        toggleSplitMode: function() {
            this.config.splitMode = this.config.splitMode === 'horizontal' ? 'vertical' : 'horizontal';
            
            const container = document.getElementById('gotamod-container');
            if (container) {
                const isHorizontal = this.config.splitMode === 'horizontal';
                container.style.flexDirection = isHorizontal ? 'row' : 'column';
                
                const frames = [this.state.player1Frame, this.state.player2Frame];
                frames.forEach(frame => {
                    if (frame) {
                        if (isHorizontal) {
                            frame.style.width = '50%';
                            frame.style.height = '';
                        } else {
                            frame.style.width = '';
                            frame.style.height = '50%';
                        }
                    }
                });
            }
        },

        // Get current active player
        getActivePlayer: function() {
            return this.state.activePlayer;
        },

        // Check if enabled
        isEnabled: function() {
            return this.state.isEnabled;
        }
    };

    // Auto-initialize if on gota.io
    if (window.location.hostname.includes('gota.io')) {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                window.GotaMod.init();
            });
        } else {
            // DOM already loaded
            window.GotaMod.init();
        }
    }

    console.log('GotaMod script loaded - Version ' + window.GotaMod.version);

})(window);
