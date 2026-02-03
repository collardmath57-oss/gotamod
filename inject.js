/**
 * GotaMod Inject Script
 * This script is injected into the gota.io game page to enable dual player control
 * Can be hosted on CDN (e.g., jsDelivr via GitHub)
 */

(function(window) {
    'use strict';

    console.log('[GotaMod Inject] Script loaded from CDN');

    // Create GotaMod namespace
    window.GotaMod = window.GotaMod || {};

    // Game instances manager
    const GameManager = {
        instances: [],
        activeInstance: 0,
        originalCanvas: null,
        splitCanvases: [],

        init: function() {
            console.log('[GotaMod] Initializing game manager...');
            
            // Create two game instances
            for (let i = 0; i < 2; i++) {
                this.instances.push(this.createInstance(i));
            }

            // Hook into game events
            this.hookGameEvents();
            
            // Setup canvas splitting if available
            this.setupCanvasSplitting();

            console.log('[GotaMod] Game manager initialized with', this.instances.length, 'instances');
        },

        createInstance: function(id) {
            return {
                id: id,
                active: id === 0,
                inputQueue: [],
                mouseX: 0,
                mouseY: 0,
                keys: {},
                canvas: null,
                context: null
            };
        },

        setActiveInstance: function(index) {
            if (index >= 0 && index < this.instances.length) {
                this.activeInstance = index;
                this.instances.forEach((inst, i) => {
                    inst.active = (i === index);
                });
                console.log('[GotaMod] Active instance set to:', index);
            }
        },

        routeInput: function(eventType, eventData) {
            const activeInst = this.instances[this.activeInstance];
            if (activeInst) {
                activeInst.inputQueue.push({ 
                    type: eventType, 
                    data: eventData,
                    timestamp: Date.now()
                });

                // Update instance state
                if (eventType === 'mousemove') {
                    activeInst.mouseX = eventData.clientX;
                    activeInst.mouseY = eventData.clientY;
                } else if (eventType === 'keydown') {
                    activeInst.keys[eventData.key] = true;
                } else if (eventType === 'keyup') {
                    activeInst.keys[eventData.key] = false;
                }
            }
        },

        getActiveInstance: function() {
            return this.instances[this.activeInstance];
        },

        hookGameEvents: function() {
            // Hook into mouse events
            const self = this;
            
            // Store original addEventListener
            const originalAddEventListener = EventTarget.prototype.addEventListener;
            
            // Override addEventListener to intercept game events
            EventTarget.prototype.addEventListener = function(type, listener, options) {
                const eventTypes = ['mousemove', 'mousedown', 'mouseup', 'click', 'keydown', 'keyup', 'wheel'];
                
                if (eventTypes.includes(type)) {
                    const wrappedListener = function(event) {
                        // Route to active instance
                        self.routeInput(type, event);
                        
                        // Still call original listener
                        return listener.call(this, event);
                    };
                    return originalAddEventListener.call(this, type, wrappedListener, options);
                }
                
                return originalAddEventListener.call(this, type, listener, options);
            };
        },

        setupCanvasSplitting: function() {
            // Wait for canvas to be available
            const checkCanvas = setInterval(() => {
                const canvas = document.querySelector('canvas');
                if (canvas) {
                    clearInterval(checkCanvas);
                    this.originalCanvas = canvas;
                    this.splitCanvas(canvas);
                }
            }, 100);

            // Stop checking after 10 seconds
            setTimeout(() => clearInterval(checkCanvas), 10000);
        },

        splitCanvas: function(originalCanvas) {
            console.log('[GotaMod] Splitting canvas for dual view');
            
            // Store original dimensions
            const originalWidth = originalCanvas.width;
            const originalHeight = originalCanvas.height;

            // Create wrapper for split view
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';

            // Create two canvas elements
            for (let i = 0; i < 2; i++) {
                const canvas = document.createElement('canvas');
                canvas.width = originalWidth / 2;
                canvas.height = originalHeight;
                canvas.style.width = '50%';
                canvas.style.height = '100%';
                
                const context = canvas.getContext('2d');
                
                this.splitCanvases.push(canvas);
                this.instances[i].canvas = canvas;
                this.instances[i].context = context;
                
                wrapper.appendChild(canvas);
            }

            // Replace original canvas with wrapper
            if (originalCanvas.parentNode) {
                originalCanvas.parentNode.insertBefore(wrapper, originalCanvas);
                originalCanvas.style.display = 'none';
            }
        }
    };

    // WebSocket Hook for multiplayer games
    const WebSocketHook = {
        originalWebSocket: null,
        sockets: [],

        init: function() {
            this.originalWebSocket = window.WebSocket;
            const self = this;

            // Override WebSocket constructor
            window.WebSocket = function(url, protocols) {
                console.log('[GotaMod] WebSocket connection intercepted:', url);
                
                // Create two WebSocket connections (one for each player)
                const ws1 = new self.originalWebSocket(url, protocols);
                const ws2 = new self.originalWebSocket(url, protocols);
                
                self.sockets.push({ player1: ws1, player2: ws2 });
                
                // Return the first WebSocket, but route based on active player
                const proxyWs = new Proxy(ws1, {
                    get: function(target, prop) {
                        const activeIdx = GameManager.activeInstance;
                        const activeWs = activeIdx === 0 ? ws1 : ws2;
                        
                        if (typeof activeWs[prop] === 'function') {
                            return activeWs[prop].bind(activeWs);
                        }
                        return activeWs[prop];
                    },
                    set: function(target, prop, value) {
                        // Set on both WebSockets
                        ws1[prop] = value;
                        ws2[prop] = value;
                        return true;
                    }
                });
                
                return proxyWs;
            };

            // Copy static properties
            Object.keys(this.originalWebSocket).forEach(key => {
                window.WebSocket[key] = this.originalWebSocket[key];
            });
        }
    };

    // Initialize all hooks and managers
    function initialize() {
        console.log('[GotaMod] Initializing all systems...');
        
        GameManager.init();
        WebSocketHook.init();
        
        // Expose API
        window.GotaMod.GameManager = GameManager;
        window.GotaMod.WebSocketHook = WebSocketHook;
        window.GotaMod.setActiveInstance = GameManager.setActiveInstance.bind(GameManager);
        window.GotaMod.routeInput = GameManager.routeInput.bind(GameManager);
        window.GotaMod.getActiveInstance = GameManager.getActiveInstance.bind(GameManager);
        
        console.log('[GotaMod] All systems initialized successfully');
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})(window);
