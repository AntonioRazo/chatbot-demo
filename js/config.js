// ==========================================
// CONFIG.JS - Configuration Management
// ==========================================

const CONFIG = {
    // Azure Speech Services
    azure: {
        speechKey: '',
        speechRegion: 'eastus',
        voice: 'es-MX-DaliaNeural'
    },
    
    // AI Provider Configuration
    ai: {
        provider: 'openai', // 'openai', 'anthropic', 'azure-openai'
        apiKey: '',
        model: 'gpt-4',
        systemPrompt: `Eres un asistente virtual profesional de Liverpool, la reconocida tienda departamental mexicana. Tu objetivo es ayudar a los clientes con:

- Información sobre productos y categorías
- Ubicación de artículos en tienda
- Promociones y ofertas vigentes
- Políticas de devolución y garantías
- Servicios de Liverpool (tarjeta de crédito, envíos, etc.)

Características de tu personalidad:
- Amable, profesional y servicial
- Respondes en español de manera clara y concisa
- Si no sabes algo, lo reconoces honestamente
- Mantienes un tono cálido pero corporativo
- Priorizas la satisfacción del cliente

Importante: No inventes información sobre productos específicos o precios. Si te preguntan sobre disponibilidad o precios exactos, recomienda verificar en el sitio web o contactar a la tienda.`
    },
    
    // Conversation History
    conversationHistory: [],
    
    // Load configuration from localStorage
    load: function() {
        const savedConfig = localStorage.getItem('chatbotConfig');
        if (savedConfig) {
            try {
                const parsed = JSON.parse(savedConfig);
                this.azure = { ...this.azure, ...parsed.azure };
                this.ai = { ...this.ai, ...parsed.ai };
                console.log('✅ Configuración cargada desde localStorage');
            } catch (e) {
                console.error('❌ Error al cargar configuración:', e);
            }
        }
    },
    
    // Save configuration to localStorage
    save: function() {
        const configToSave = {
            azure: this.azure,
            ai: this.ai
        };
        localStorage.setItem('chatbotConfig', JSON.stringify(configToSave));
        console.log('✅ Configuración guardada');
    },
    
    // Validate configuration
    validate: function() {
        const errors = [];
        
        if (!this.azure.speechKey || this.azure.speechKey.trim() === '') {
            errors.push('Falta Azure Speech Key');
        }
        
        if (!this.azure.speechRegion || this.azure.speechRegion.trim() === '') {
            errors.push('Falta Azure Speech Region');
        }
        
        if (!this.ai.apiKey || this.ai.apiKey.trim() === '') {
            errors.push('Falta AI API Key');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    },
    
    // Add message to conversation history
    addMessage: function(role, content) {
        this.conversationHistory.push({
            role: role,
            content: content
        });
        
        // Keep only last 10 messages to avoid token limits
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
    },
    
    // Clear conversation history
    clearHistory: function() {
        this.conversationHistory = [];
    }
};

// Load configuration on page load
$(document).ready(function() {
    CONFIG.load();
});
