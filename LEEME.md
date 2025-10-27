# 📦 ÍNDICE DEL PAQUETE - AI CHATBOT DEMO

¡Bienvenido al paquete completo de tu asistente virtual con IA!

## 🚀 INICIO RÁPIDO

### 1. **EMPIEZA AQUÍ** 👈
Abre este archivo primero para ver el proyecto visualmente:
- 📄 [DEMO-PREVIEW.html](DEMO-PREVIEW.html)

### 2. **Configuración Paso a Paso**
Guía completa para obtener credenciales y configurar:
- 📋 [CONFIGURACION-RAPIDA.md](CONFIGURACION-RAPIDA.md)

### 3. **Ejecutar la Demo**
Una vez configurado, abre:
- 🚀 [index.html](index.html) - Aplicación principal del chatbot

## 📚 DOCUMENTACIÓN

### Guías de Usuario
- 📖 [README.md](README.md) - Documentación técnica completa
- 🎯 [GUIA-PRESENTACION.md](GUIA-PRESENTACION.md) - Cómo presentar la demo como un profesional
- 🎨 [COMPONENTES-VISUALES.md](COMPONENTES-VISUALES.md) - Descripción visual de cada componente

## 📁 ESTRUCTURA DEL PROYECTO

```
chatbot-demo/
│
├── 📄 index.html                    # ← Aplicación principal del chatbot
├── 📄 DEMO-PREVIEW.html             # ← Vista previa sin configurar
├── 📄 README.md                     # Documentación completa
├── 📄 CONFIGURACION-RAPIDA.md       # Guía de setup
├── 📄 GUIA-PRESENTACION.md          # Tips para presentar
├── 📄 COMPONENTES-VISUALES.md       # Descripción visual
├── 📄 LEEME.md                      # Este archivo
│
├── 📁 css/
│   └── styles.css                   # Estilos personalizados
│
└── 📁 js/
    ├── config.js                    # Gestión de configuración
    ├── azure-speech.js              # Azure Speech Services
    ├── ai-service.js                # Servicios de IA
    ├── voice-visualizer.js          # Animaciones de voz
    ├── chat-ui.js                   # Interfaz de usuario
    └── main.js                      # Lógica principal
```

## ⚡ FLUJO RECOMENDADO

### Para Desarrolladores
1. Lee [README.md](README.md) para entender la arquitectura
2. Revisa [CONFIGURACION-RAPIDA.md](CONFIGURACION-RAPIDA.md) para obtener credenciales
3. Abre [index.html](index.html) y configura
4. Personaliza colores, textos y system prompt
5. Lee el código en `js/` para modificaciones avanzadas

### Para Vendedores/Presentadores
1. Abre [DEMO-PREVIEW.html](DEMO-PREVIEW.html) para ver el concepto
2. Lee [GUIA-PRESENTACION.md](GUIA-PRESENTACION.md) completa
3. Pide a TI que configure las credenciales
4. Practica la demo 2-3 veces
5. ¡Presenta con confianza!

### Para Clientes
1. Abre [DEMO-PREVIEW.html](DEMO-PREVIEW.html) 
2. Mira el video/screenshots que te compartan
3. Solicita una demo en vivo
4. Discute personalización para tu negocio

## 🎯 ARCHIVOS CLAVE

| Archivo | Qué hace | Cuándo editarlo |
|---------|----------|-----------------|
| `index.html` | Estructura del chatbot | Cambiar textos, estructura HTML |
| `css/styles.css` | Apariencia visual | Cambiar colores, tamaños, animaciones |
| `js/config.js` | Configuración default | Cambiar valores por defecto |
| `js/main.js` | Flujo de la aplicación | Añadir funcionalidades |
| `js/ai-service.js` | Conexión con APIs de IA | Añadir otro proveedor de IA |
| `js/azure-speech.js` | Conexión con Azure | Modificar configuración de voz |

## 🛠️ PERSONALIZACIÓN RÁPIDA

### Cambiar colores de la marca
1. Abre `css/styles.css`
2. Busca `#667eea` y `#764ba2`
3. Reemplaza con los colores de tu marca
4. Guarda y recarga

### Cambiar el sitio de fondo
1. Abre `index.html`
2. Línea 25: cambia la URL del iframe
3. Guarda y recarga

### Cambiar el nombre del asistente
1. Abre `index.html`
2. Línea 42: cambia "Asistente Liverpool"
3. Guarda y recarga

### Personalizar el comportamiento de la IA
1. Abre el chatbot
2. Click en ⚙️ (configuración)
3. Edita el "System Prompt"
4. Guarda

## 💡 RECURSOS ADICIONALES

### APIs Necesarias
- Azure Speech Services: https://portal.azure.com
- OpenAI API: https://platform.openai.com
- Anthropic API: https://console.anthropic.com

### Documentación Oficial
- Azure Speech: https://learn.microsoft.com/azure/cognitive-services/speech-service/
- OpenAI: https://platform.openai.com/docs
- Anthropic: https://docs.anthropic.com

### Frameworks Usados
- Bootstrap 5: https://getbootstrap.com
- jQuery: https://jquery.com
- Azure Speech SDK: https://learn.microsoft.com/javascript/api/overview/azure/speech-service

## ❓ FAQ RÁPIDO

**P: ¿Necesito programar algo?**
R: No. Solo configura las credenciales en el panel de settings.

**P: ¿Cuánto cuesta ejecutar esto?**
R: ~$0.03-0.05 USD por conversación promedio.

**P: ¿Funciona en móvil?**
R: Sí, completamente responsive.

**P: ¿Puedo cambiar la voz?**
R: Sí, hay múltiples voces en español (México y España) en el panel de configuración.

**P: ¿Necesito un servidor?**
R: No para la demo. Solo abre el HTML en el navegador.

**P: ¿Es seguro poner mis API keys?**
R: Para demo está bien. Para producción, debes mover las keys a un backend.

**P: No funciona el micrófono**
R: Necesitas HTTPS o localhost, y dar permisos al navegador.

**P: ¿Puedo agregar más idiomas?**
R: Sí, solo cambia la configuración en Azure Speech (`es-MX`, `en-US`, etc.)

## 🆘 SOPORTE

Si algo no funciona:
1. Abre la consola del navegador (F12)
2. Busca mensajes de error en rojo
3. Verifica que las credenciales estén correctas
4. Lee la sección de Troubleshooting en README.md

## 📞 CONTACTO

Para consultas sobre:
- **Configuración técnica**: Ver README.md
- **Presentación comercial**: Ver GUIA-PRESENTACION.md
- **Personalización avanzada**: Revisar código en `js/`

## ⭐ PRÓXIMOS PASOS

1. [ ] Configurar credenciales
2. [ ] Probar la demo
3. [ ] Personalizar para el cliente
4. [ ] Practicar presentación
5. [ ] ¡Impresionar al cliente!

---

**¡Éxito con tu demo! 🚀**

> Desarrollado con ❤️ para crear experiencias de IA memorables
