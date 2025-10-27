// ==========================================
// AZURE-SPEECH.JS - Azure Speech Services Integration
// ==========================================

const AzureSpeech = {
    
    recognizer: null,
    synthesizer: null,
    audioConfig: null,
    isListening: false,
    
    // Initialize Azure Speech SDK
    init: function() {
        try {
            // Validar que las credenciales existen
            if (!CONFIG.azure.speechKey || CONFIG.azure.speechKey.trim() === '') {
                console.error('❌ Azure Speech Key no configurada');
                return false;
            }
            
            if (!CONFIG.azure.speechRegion || CONFIG.azure.speechRegion.trim() === '') {
                console.error('❌ Azure Speech Region no configurada');
                return false;
            }
            
            console.log('🔧 Inicializando Azure Speech...');
            console.log('   Region:', CONFIG.azure.speechRegion);
            console.log('   Voice:', CONFIG.azure.voice);
            
            const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
                CONFIG.azure.speechKey.trim(),
                CONFIG.azure.speechRegion.trim()
            );
            
            // Configure language
            speechConfig.speechRecognitionLanguage = 'es-MX';
            speechConfig.speechSynthesisVoiceName = CONFIG.azure.voice;
            
            // Audio configuration
            this.audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            
            // Create recognizer
            this.recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, this.audioConfig);
            
            // Create synthesizer
            this.synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
            
            console.log('✅ Azure Speech Services inicializado correctamente');
            return true;
        } catch (error) {
            console.error('❌ Error al inicializar Azure Speech:', error);
            return false;
        }
    },
    
    // Start listening (Speech-to-Text)
    startListening: function(onResult, onError) {
        
        if (!this.recognizer) {
            if (!this.init()) {
                onError('No se pudo inicializar Azure Speech Services');
                return;
            }
        }
        
        this.isListening = true;
        
        // Recognizing event (interim results)
        this.recognizer.recognizing = (s, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizingSpeech) {
                console.log('🎤 Reconociendo:', e.result.text);
            }
        };
        
        // Recognized event (final result)
        this.recognizer.recognized = (s, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                console.log('✅ Reconocido:', e.result.text);
                onResult(e.result.text);
            } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
                console.log('⚠️ No se reconoció el habla');
                onError('No se pudo entender lo que dijiste. Intenta de nuevo.');
            }
        };
        
        // Error event
        this.recognizer.canceled = (s, e) => {
            console.error('❌ Error de reconocimiento:', e);
            
            let errorMessage = 'Error al reconocer el audio.';
            
            // Dar mensajes más específicos según el error
            if (e.errorCode === SpeechSDK.CancellationErrorCode.AuthenticationFailure) {
                errorMessage = 'Error de autenticación con Azure. Verifica tu Speech Key y Region en Configuración.';
            } else if (e.errorCode === SpeechSDK.CancellationErrorCode.ConnectionFailure) {
                errorMessage = 'No se pudo conectar con Azure Speech Services. Verifica tu conexión a Internet.';
            } else if (e.reason === SpeechSDK.CancellationReason.Error) {
                errorMessage = `Error: ${e.errorDetails || 'Verifica tus credenciales de Azure en Configuración'}`;
            }
            
            onError(errorMessage);
            this.isListening = false;
        };
        
        // Session stopped event
        this.recognizer.sessionStopped = (s, e) => {
            console.log('🛑 Sesión de reconocimiento detenida');
            this.recognizer.stopContinuousRecognitionAsync();
            this.isListening = false;
        };
        
        // Start continuous recognition
        this.recognizer.startContinuousRecognitionAsync(
            () => {
                console.log('🎤 Reconocimiento iniciado');
            },
            (err) => {
                console.error('❌ Error al iniciar reconocimiento:', err);
                onError('Error al iniciar el reconocimiento de voz');
                this.isListening = false;
            }
        );
    },
    
    // Stop listening
    stopListening: function() {
        if (this.recognizer && this.isListening) {
            this.recognizer.stopContinuousRecognitionAsync(
                () => {
                    console.log('🛑 Reconocimiento detenido');
                    this.isListening = false;
                },
                (err) => {
                    console.error('❌ Error al detener reconocimiento:', err);
                    this.isListening = false;
                }
            );
        }
    },
    
    // Speak text (Text-to-Speech)
    speak: function(text, onStart, onEnd, onError) {
        
        if (!this.synthesizer) {
            if (!this.init()) {
                onError('No se pudo inicializar Azure Speech Services');
                return;
            }
        }
        
        // Create SSML for better control
        const ssml = `
            <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='es-MX'>
                <voice name='${CONFIG.azure.voice}'>
                    <prosody rate='1.0' pitch='0%'>
                        ${this.escapeXml(text)}
                    </prosody>
                </voice>
            </speak>
        `;
        
        console.log('🔊 Sintetizando voz...');
        if (onStart) onStart();
        
        this.synthesizer.speakSsmlAsync(
            ssml,
            (result) => {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    console.log('✅ Síntesis completada');
                    if (onEnd) onEnd();
                } else {
                    console.error('❌ Error en síntesis:', result.errorDetails);
                    if (onError) onError(result.errorDetails);
                }
                //result.close();
            },
            (error) => {
                console.error('❌ Error al sintetizar:', error);
                if (onError) onError(error);
            }
        );
    },
    
    // Stop speaking
    stopSpeaking: function() {
        if (this.synthesizer) {
            // Azure Speech SDK doesn't have a direct stop method
            // We need to close and recreate the synthesizer
            this.synthesizer.close();
            const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
                CONFIG.azure.speechKey,
                CONFIG.azure.speechRegion
            );
            speechConfig.speechSynthesisVoiceName = CONFIG.azure.voice;
            this.synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
            console.log('🛑 Síntesis detenida');
        }
    },
    
    // Helper to escape XML characters
    escapeXml: function(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    },
    
    // Check microphone permission
    checkMicrophonePermission: async function() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (error) {
            console.error('❌ Permiso de micrófono denegado:', error);
            return false;
        }
    }
};
