// ==========================================
// AI-SERVICE.JS - AI Provider Integration
// ==========================================

const AIService = {
    
    // Send message to AI and get response
    sendMessage: async function(userMessage) {
        
        // Add user message to history
        CONFIG.addMessage('user', userMessage);
        
        // Select provider
        switch (CONFIG.ai.provider) {
            case 'openai':
                return await this.callOpenAI();
            case 'anthropic':
                return await this.callAnthropic();
            case 'azure-openai':
                return await this.callAzureOpenAI();
            default:
                throw new Error('Proveedor de IA no soportado');
        }
    },
    
    // Call OpenAI API
    callOpenAI: async function() {
        try {
            // Construir el array de mensajes: system prompt + historial de conversación
            const messages = [
                {
                    role: "system",
                    content: CONFIG.ai.systemPrompt
                },
                ...CONFIG.conversationHistory
            ];
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.ai.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: CONFIG.ai.model,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Error en la API de OpenAI');
            }
            
            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;
            
            // Add assistant response to history
            CONFIG.addMessage('assistant', assistantMessage);
            
            return assistantMessage;
            
        } catch (error) {
            console.error('❌ Error en OpenAI:', error);
            throw error;
        }
    },
    
    // Call Anthropic API (Claude)
    callAnthropic: async function() {
        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': CONFIG.ai.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: CONFIG.ai.model,
                    max_tokens: 1024,
                    system: CONFIG.ai.systemPrompt,
                    messages: CONFIG.conversationHistory
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Error en la API de Anthropic');
            }
            
            const data = await response.json();
            const assistantMessage = data.content[0].text;
            
            // Add assistant response to history
            CONFIG.addMessage('assistant', assistantMessage);
            
            return assistantMessage;
            
        } catch (error) {
            console.error('❌ Error en Anthropic:', error);
            throw error;
        }
    },
    
    // Call Azure OpenAI API
    callAzureOpenAI: async function() {
        try {
            // Azure OpenAI requires endpoint configuration
            // This is a placeholder - needs actual Azure OpenAI endpoint
            const endpoint = 'https://YOUR-RESOURCE-NAME.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT-NAME/chat/completions?api-version=2023-05-15';
            
            const messages = [
                { role: 'system', content: CONFIG.ai.systemPrompt },
                ...CONFIG.conversationHistory
            ];
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': CONFIG.ai.apiKey
                },
                body: JSON.stringify({
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Error en Azure OpenAI');
            }
            
            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;
            
            // Add assistant response to history
            CONFIG.addMessage('assistant', assistantMessage);
            
            return assistantMessage;
            
        } catch (error) {
            console.error('❌ Error en Azure OpenAI:', error);
            throw error;
        }
    },
    
    // Test connection to AI service
    testConnection: async function() {
        try {
            CONFIG.addMessage('user', 'Hola, ¿puedes confirmar que estás funcionando?');
            const response = await this.sendMessage('Hola, ¿puedes confirmar que estás funcionando?');
            CONFIG.clearHistory(); // Clear test message
            return {
                success: true,
                message: 'Conexión exitosa con ' + CONFIG.ai.provider
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
};