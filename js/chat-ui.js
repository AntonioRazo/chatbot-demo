// ==========================================
// CHAT-UI.JS - Chat User Interface Management
// ==========================================

const ChatUI = {
    
    $chatPanel: null,
    $chatMessages: null,
    $chatInput: null,
    $statusIndicator: null,
    $voiceVisualizer: null,
    
    // Initialize UI elements
    init: function() {
        this.$chatPanel = $('#chat-panel');
        this.$chatMessages = $('#chat-messages');
        this.$chatInput = $('#chat-input');
        this.$statusIndicator = $('#status-indicator');
        this.$voiceVisualizer = $('#voice-visualizer');
        
        console.log('✅ Chat UI inicializado');
    },
    
    // Add message to chat
    addMessage: function(content, type = 'bot') {
        const time = this.getCurrentTime();
        const avatarIcon = type === 'bot' ? 'bi-robot' : 'bi-person-fill';
        
        const messageHtml = `
            <div class="message ${type}-message">
                <div class="message-avatar">
                    <i class="bi ${avatarIcon}"></i>
                </div>
                <div class="message-content">
                    <p>${this.escapeHtml(content)}</p>
                    <small class="message-time">${time}</small>
                </div>
            </div>
        `;
        
        this.$chatMessages.append(messageHtml);
        this.scrollToBottom();
    },
    
    // Add typing indicator
    addTypingIndicator: function() {
        const typingHtml = `
            <div class="message bot-message typing-indicator">
                <div class="message-avatar">
                    <i class="bi bi-robot"></i>
                </div>
                <div class="message-content">
                    <p>
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                        <span class="typing-dot"></span>
                    </p>
                </div>
            </div>
        `;
        
        this.$chatMessages.append(typingHtml);
        this.scrollToBottom();
        
        // Add CSS for typing animation
        if (!$('#typing-animation-style').length) {
            $('head').append(`
                <style id="typing-animation-style">
                    .typing-dot {
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #667eea;
                        margin: 0 2px;
                        animation: typingDot 1.4s infinite;
                    }
                    .typing-dot:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    .typing-dot:nth-child(3) {
                        animation-delay: 0.4s;
                    }
                    @keyframes typingDot {
                        0%, 60%, 100% {
                            transform: translateY(0);
                            opacity: 0.7;
                        }
                        30% {
                            transform: translateY(-10px);
                            opacity: 1;
                        }
                    }
                </style>
            `);
        }
    },
    
    // Remove typing indicator
    removeTypingIndicator: function() {
        $('.typing-indicator').remove();
    },
    
    // Show status indicator
    showStatus: function(message) {
        $('#status-text').text(message);
        this.$statusIndicator.addClass('active');
    },
    
    // Hide status indicator
    hideStatus: function() {
        this.$statusIndicator.removeClass('active');
    },
    
    // Show voice visualizer
    showVoiceVisualizer: function() {
        this.$voiceVisualizer.addClass('active');
        VoiceVisualizer.start();
    },
    
    // Hide voice visualizer
    hideVoiceVisualizer: function() {
        this.$voiceVisualizer.removeClass('active');
        VoiceVisualizer.stop();
    },
    
    // Clear input
    clearInput: function() {
        this.$chatInput.val('');
    },
    
    // Get input value
    getInputValue: function() {
        return this.$chatInput.val().trim();
    },
    
    // Enable/disable input
    setInputEnabled: function(enabled) {
        this.$chatInput.prop('disabled', !enabled);
        $('#send-btn').prop('disabled', !enabled);
    },
    
    // Scroll to bottom
    scrollToBottom: function(smooth = true) {
        const scrollHeight = this.$chatMessages[0].scrollHeight;
        if (smooth) {
            this.$chatMessages.animate({
                scrollTop: scrollHeight
            }, 300);
        } else {
            this.$chatMessages.scrollTop(scrollHeight);
        }
    },
    
    // Get current time
    getCurrentTime: function() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },
    
    // Escape HTML
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },
    
    // Show error message
    showError: function(message) {
        this.addMessage('❌ ' + message, 'bot');
    },
    
    // Clear chat messages
    clearChat: function() {
        this.$chatMessages.empty();
        this.addMessage('Chat limpiado. ¿En qué puedo ayudarte?', 'bot');
    }
};

// Settings UI Management
const SettingsUI = {
    
    $settingsPanel: null,
    
    // Initialize
    init: function() {
        this.$settingsPanel = $('#settings-panel');
        this.loadFromConfig();
    },
    
    // Load settings from CONFIG
    loadFromConfig: function() {
        $('#azure-speech-key').val(CONFIG.azure.speechKey);
        $('#azure-speech-region').val(CONFIG.azure.speechRegion);
        $('#azure-voice').val(CONFIG.azure.voice);
        $('#ai-provider').val(CONFIG.ai.provider);
        $('#ai-api-key').val(CONFIG.ai.apiKey);
        $('#ai-model').val(CONFIG.ai.model);
        $('#system-prompt').val(CONFIG.ai.systemPrompt);
    },
    
    // Save settings to CONFIG
    saveToConfig: function() {
        CONFIG.azure.speechKey = $('#azure-speech-key').val().trim();
        CONFIG.azure.speechRegion = $('#azure-speech-region').val().trim();
        CONFIG.azure.voice = $('#azure-voice').val();
        CONFIG.ai.provider = $('#ai-provider').val();
        CONFIG.ai.apiKey = $('#ai-api-key').val().trim();
        CONFIG.ai.model = $('#ai-model').val().trim();
        CONFIG.ai.systemPrompt = $('#system-prompt').val().trim();
        
        CONFIG.save();
    },
    
    // Toggle panel
    toggle: function() {
        this.$settingsPanel.toggleClass('open');
    },
    
    // Close panel
    close: function() {
        this.$settingsPanel.removeClass('open');
    },
    
    // Show success message
    showSuccess: function(message) {
        // Simple toast notification
        const toast = $(`
            <div class="settings-toast">
                <i class="bi bi-check-circle-fill me-2"></i>
                ${message}
            </div>
        `);
        
        $('body').append(toast);
        
        // Add CSS if not exists
        if (!$('#toast-style').length) {
            $('head').append(`
                <style id="toast-style">
                    .settings-toast {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #28a745;
                        color: white;
                        padding: 15px 20px;
                        border-radius: 10px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                        z-index: 9999;
                        animation: toastSlideIn 0.3s ease;
                    }
                    @keyframes toastSlideIn {
                        from {
                            transform: translateX(400px);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                </style>
            `);
        }
        
        setTimeout(() => {
            toast.fadeOut(300, () => toast.remove());
        }, 3000);
    }
};

// Initialize on document ready
$(document).ready(function() {
    ChatUI.init();
    SettingsUI.init();
});
