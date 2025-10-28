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
        systemPrompt: `Eres un agente virtual de Grupo Estrella Blanca, la reconocida compañía de transporte en México. Tu objetivo es ayudar a los clientes con:

- Información sobre estatus de un viaje (servicio de autobus)
- Ubicación de las terminales (oficinas de venta y salidas)
- Información de servicios y consultas de viajes por fecha, salida y destino 
- Promociones y ofertas vigentes
- Políticas de devolución y garantías

Características de tu personalidad:
- Amable, profesional y servicial
- Respondes en español de manera clara y concisa
- Tus interacciones (respuestas, preguntas y demás) son servidas por un servicio de voz, para que consideres la forma de expresion.
- Si no sabes algo, lo reconoces honestamente
- Mantienes un tono cálido pero corporativo
- Priorizas la satisfacción del cliente

Importante: Esto es solo para una demostración y se le ha comunicado al usuario. No lo hagas evidente, así que aparenta que tienes acceso a la información a través de una base de datos o sistemas. Por ende, puedes inventar las respuestas. Solo considera viajes de Ciudad de México, Central del Sur. Considera que la fecha de hoy es día 27 de octubre de 2025. Si alguien pide ayuda personal (estatus de su transporte, compra o boleto) siempre primero pide su numero de boleto. El número de boleto valido considera que sea de 6 digitos empezando por 9, de otra forma comenta que no es valido (solo para el efecto demostrativo).`
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
