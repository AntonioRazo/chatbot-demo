// ==========================================
// MAIN.JS - Main Application Logic
// ==========================================

const App = {
    
    isProcessing: false,
    isListening: false,
    isSpeaking: false,
    autoVoiceResponse: true, // Nueva opción: responder automáticamente con voz
    
    // Initialize application
    init: function() {
        console.log('🚀 Iniciando aplicación...');
        
        // Load voice response preference
        const savedPreference = localStorage.getItem('autoVoiceResponse');
        if (savedPreference !== null) {
            this.autoVoiceResponse = savedPreference === 'true';
        }
        this.updateVoiceToggleUI();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Check for saved configuration
        this.checkConfiguration();
        
        console.log('✅ Aplicación lista');
    },
    
    // Setup all event listeners
    setupEventListeners: function() {
        
        // Toggle chat panel
        $('#chat-toggle-btn').on('click', () => {
            this.toggleChat();
        });
        
        // Close chat
        $('#chat-close-btn').on('click', () => {
            this.toggleChat();
        });
        
        // Close chat when clicking overlay
        $('.overlay').on('click', () => {
            if ($('body').hasClass('chat-open')) {
                this.toggleChat();
            }
        });
        
        // Send message button
        $('#send-btn').on('click', () => {
            this.sendTextMessage();
        });
        
        // Send message on Enter key
        $('#chat-input').on('keypress', (e) => {
            if (e.which === 13 && !e.shiftKey) {
                e.preventDefault();
                this.sendTextMessage();
            }
        });
        
        // Voice button
        $('#voice-btn').on('click', () => {
            this.toggleVoice();
        });
        
        // Voice response toggle
        $('#voice-response-toggle').on('click', () => {
            this.toggleAutoVoiceResponse();
        });
        
        // Settings toggle
        $('#settings-toggle').on('click', () => {
            SettingsUI.toggle();
        });
        
        // Settings close
        $('#settings-close').on('click', () => {
            SettingsUI.close();
        });
        
        // Save settings
        $('#save-settings').on('click', () => {
            this.saveSettings();
        });
        
        // AI Provider change
        $('#ai-provider').on('change', function() {
            const provider = $(this).val();
            if (provider === 'openai') {
                $('#ai-model').val('gpt-4');
            } else if (provider === 'anthropic') {
                $('#ai-model').val('claude-3-5-sonnet-20241022');
            }
        });
    },
    
    // Toggle chat panel
    toggleChat: function() {
        $('body').toggleClass('chat-open');
    },
    
    // Check if configuration is complete
    checkConfiguration: function() {
        const validation = CONFIG.validate();
        if (!validation.valid) {
            console.warn('⚠️ Configuración incompleta:', validation.errors);
            // Show a subtle notification in the chat
            setTimeout(() => {
                ChatUI.addMessage(
                    '⚙️ Hola! Parece que es tu primera vez aquí. Por favor, configura tus credenciales de Azure y tu API de IA en el panel de configuración (ícono de engranaje) para comenzar.',
                    'bot'
                );
            }, 1000);
        }
    },
    
    // Send text message
    sendTextMessage: async function(speakResponse = false) {
        
        if (this.isProcessing) return;
        
        const message = ChatUI.getInputValue();
        if (!message) return;
        
        // Validate configuration
        const validation = CONFIG.validate();
        if (!validation.valid) {
            ChatUI.showError('Por favor, configura tus credenciales primero (ícono de engranaje).');
            return;
        }
        
        // Add user message to UI
        ChatUI.addMessage(message, 'user');
        ChatUI.clearInput();
        
        // Show processing state
        this.isProcessing = true;
        ChatUI.setInputEnabled(false);
        ChatUI.addTypingIndicator();
        ChatUI.showStatus('Pensando...');
        
        try {
            // Get AI response
            const response = await AIService.sendMessage(message);
            
            // Remove typing indicator
            ChatUI.removeTypingIndicator();
            
            // Add bot response
            ChatUI.addMessage(response, 'bot');
            
            // Speak response if voice was used
            if (speakResponse) {
                this.speakResponse(response);
            }
            
        } catch (error) {
            console.error('❌ Error al enviar mensaje:', error);
            ChatUI.removeTypingIndicator();
            ChatUI.showError('Hubo un error al procesar tu mensaje: ' + error.message);
        } finally {
            this.isProcessing = false;
            ChatUI.setInputEnabled(true);
            ChatUI.hideStatus();
            $('#chat-input').focus();
        }
    },
    
    // Toggle voice input
    toggleVoice: async function() {
        
        if (this.isListening) {
            this.stopListening();
        } else {
            await this.startListening();
        }
    },
    
    // Start listening
    startListening: async function() {
        
        // Validate configuration
        const validation = CONFIG.validate();
        if (!validation.valid) {
            ChatUI.showError('Por favor, configura tus credenciales primero.');
            return;
        }
        
        // Check microphone permission
        const hasPermission = await AzureSpeech.checkMicrophonePermission();
        if (!hasPermission) {
            ChatUI.showError('Se necesita permiso para usar el micrófono.');
            return;
        }
        
        this.isListening = true;
        $('#voice-btn').addClass('listening');
        ChatUI.showVoiceVisualizer();
        
        // Start Azure Speech recognition
        AzureSpeech.startListening(
            // On result
            (text) => {
                console.log('📝 Texto reconocido:', text);
                this.stopListening();
                
                if (text && text.trim()) {
                    // Set the text in input and send WITH voice response
                    $('#chat-input').val(text);
                    this.sendTextMessage(this.autoVoiceResponse); // Usar preferencia del usuario
                }
            },
            // On error
            (error) => {
                console.error('❌ Error de reconocimiento:', error);
                this.stopListening();
                ChatUI.showError(error);
            }
        );
    },
    
    // Stop listening
    stopListening: function() {
        this.isListening = false;
        $('#voice-btn').removeClass('listening');
        ChatUI.hideVoiceVisualizer();
        AzureSpeech.stopListening();
    },
    
    // Speak response
    speakResponse: function(text) {
        
        if (this.isSpeaking) {
            AzureSpeech.stopSpeaking();
        }
        
        this.isSpeaking = true;
        ChatUI.showStatus('Hablando...');
        
        AzureSpeech.speak(
            text,
            // On start
            () => {
                console.log('🔊 Comenzando a hablar...');
            },
            // On end
            () => {
                console.log('✅ Habla completada');
                this.isSpeaking = false;
                ChatUI.hideStatus();
            },
            // On error
            (error) => {
                console.error('❌ Error al hablar:', error);
                this.isSpeaking = false;
                ChatUI.hideStatus();
                ChatUI.showError('Error al reproducir la voz: ' + error);
            }
        );
    },
    
    // Save settings
    saveSettings: function() {
        
        // Save to CONFIG
        SettingsUI.saveToConfig();
        
        // Reinitialize Azure Speech if configured
        if (CONFIG.azure.speechKey && CONFIG.azure.speechRegion) {
            AzureSpeech.init();
        }
        
        // Clear conversation history when settings change
        CONFIG.clearHistory();
        
        // Show success message
        SettingsUI.showSuccess('✅ Configuración guardada correctamente');
        
        // Close settings panel
        setTimeout(() => {
            SettingsUI.close();
        }, 1500);
        
        console.log('✅ Configuración guardada y aplicada');
    },
    
    // Toggle auto voice response
    toggleAutoVoiceResponse: function() {
        this.autoVoiceResponse = !this.autoVoiceResponse;
        localStorage.setItem('autoVoiceResponse', this.autoVoiceResponse);
        this.updateVoiceToggleUI();
        
        const status = this.autoVoiceResponse ? 'activada' : 'desactivada';
        console.log(`🔊 Respuesta por voz ${status}`);
    },
    
    // Update voice toggle UI
    updateVoiceToggleUI: function() {
        const $toggle = $('#voice-response-toggle');
        const $icon = $toggle.find('i');
        
        if (this.autoVoiceResponse) {
            $toggle.addClass('active');
            $toggle.attr('title', 'Respuesta por voz activada (click para desactivar)');
            $icon.removeClass('bi-volume-mute-fill').addClass('bi-volume-up-fill');
        } else {
            $toggle.removeClass('active');
            $toggle.attr('title', 'Respuesta por voz desactivada (click para activar)');
            $icon.removeClass('bi-volume-up-fill').addClass('bi-volume-mute-fill');
        }
    }
};

// Initialize when document is ready
$(document).ready(function() {
    App.init();
});

// Handle page unload (cleanup)
$(window).on('beforeunload', function() {
    if (AzureSpeech.isListening) {
        AzureSpeech.stopListening();
    }
    if (App.isSpeaking) {
        AzureSpeech.stopSpeaking();
    }
});
