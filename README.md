# 🤖 AI Chatbot Demo - Liverpool

Demo profesional de asistente virtual con capacidades de texto y voz, utilizando Azure Cognitive Services y APIs de IA Generativa.

## 🌟 Características

- ✅ **Interfaz Profesional**: Botón flotante y panel de chat moderno con Bootstrap
- 🎤 **Entrada por Voz**: Speech-to-Text de Azure Cognitive Services
- 🔊 **Salida por Voz**: Text-to-Speech de Azure Cognitive Services
- 🤖 **IA Generativa**: Soporte para OpenAI, Anthropic (Claude) y Azure OpenAI
- ⚙️ **Sistema de Configuración**: Panel completo para editar credenciales y system prompt
- 🎨 **Animaciones**: Visualizador de voz y avatar animado de IA
- 📱 **Responsive**: Funciona en desktop y móvil
- 🎯 **Demo-Ready**: Fondo con iframe del sitio del cliente (Liverpool)

## 📁 Estructura del Proyecto

```
chatbot-demo/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos personalizados
├── js/
│   ├── config.js          # Gestión de configuración
│   ├── azure-speech.js    # Integración Azure Speech
│   ├── ai-service.js      # Servicios de IA (OpenAI/Anthropic)
│   ├── voice-visualizer.js # Animaciones de voz
│   ├── chat-ui.js         # Interfaz de usuario
│   └── main.js            # Lógica principal
└── README.md              # Este archivo
```

## 🚀 Inicio Rápido

### 1. Configuración Inicial

Abre `index.html` en tu navegador web moderno (Chrome, Firefox, Edge, Safari).

### 2. Configurar Credenciales

Haz clic en el ícono de **engranaje (⚙️)** en el panel del chat para abrir la configuración:

#### Azure Cognitive Services
- **Speech Key**: Tu clave de Azure Speech Services
- **Speech Region**: Región de tu servicio (ej: `eastus`, `westus`)
- **Voz**: Selecciona la voz para Text-to-Speech

Para obtener las credenciales:
1. Ve a [Azure Portal](https://portal.azure.com)
2. Crea un recurso de "Speech Services"
3. Copia la Key y Region

#### Proveedor de IA
Selecciona uno de los siguientes:

**OpenAI:**
- API Key: Tu clave de OpenAI API
- Modelo: `gpt-4` o `gpt-3.5-turbo`
- Obtén tu API key en: https://platform.openai.com/api-keys

**Anthropic (Claude):**
- API Key: Tu clave de Anthropic API
- Modelo: `claude-3-5-sonnet-20241022`
- Obtén tu API key en: https://console.anthropic.com/

**Azure OpenAI:**
- API Key: Tu clave de Azure OpenAI
- Modelo: Tu nombre de deployment
- Nota: Debes modificar el endpoint en `ai-service.js`

#### System Prompt
Edita las instrucciones que definen el comportamiento de tu asistente. El prompt por defecto está personalizado para Liverpool, pero puedes adaptarlo a cualquier negocio.

### 3. Usar el Chatbot

1. **Abrir**: Haz clic en el botón flotante (esquina inferior derecha)
2. **Escribir**: Escribe tu mensaje y presiona Enter o el botón de enviar
3. **Hablar**: Haz clic en el ícono del micrófono 🎤 y habla (se activará la visualización)
4. **Cerrar**: Haz clic en la X o fuera del panel

## 🎨 Personalización

### Cambiar el Sitio de Fondo

Edita la línea 25 en `index.html`:

```html
<iframe id="client-website" src="https://www.liverpool.com.mx/" frameborder="0"></iframe>
```

Cambia la URL por cualquier sitio web:
```html
<iframe id="client-website" src="https://www.ejemplo.com/" frameborder="0"></iframe>
```

### Cambiar Colores

Edita `css/styles.css`, busca estos valores de color:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Cámbialos por tus colores de marca:
```css
background: linear-gradient(135deg, #TU-COLOR-1 0%, #TU-COLOR-2 100%);
```

### Cambiar Nombre del Asistente

En `index.html`, línea 42:
```html
<h5 class="mb-0">Asistente Liverpool</h5>
```

### Personalizar System Prompt

Edita directamente en el panel de configuración o modifica el default en `js/config.js`.

## 🔧 Requisitos Técnicos

- **Navegador moderno** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Conexión a Internet** (para CDNs y APIs)
- **HTTPS o localhost** (requerido para acceso al micrófono)
- **Credenciales válidas** de Azure y proveedor de IA

## 📝 Notas Importantes

### Permisos del Micrófono
El navegador pedirá permiso para usar el micrófono la primera vez que uses la función de voz.

### CORS y Seguridad
- Las credenciales se guardan en `localStorage` del navegador
- **NO uses este código en producción** sin implementar seguridad backend
- Las API keys deberían estar en un servidor, no en el cliente

### Iframe del Cliente
Algunos sitios web no permiten ser embebidos en iframes (política X-Frame-Options). Si el sitio del cliente no se muestra:
- Usa una captura de pantalla como imagen de fondo
- O simplemente usa un fondo sólido/gradiente

## 🐛 Solución de Problemas

### El chatbot no responde
- Verifica que las credenciales estén configuradas correctamente
- Abre la consola del navegador (F12) para ver errores
- Verifica que tengas crédito en tu cuenta de OpenAI/Anthropic

### El micrófono no funciona
- Verifica que el navegador tenga permiso para usar el micrófono
- Asegúrate de estar usando HTTPS o localhost
- Verifica las credenciales de Azure Speech

### El Text-to-Speech no funciona
- Verifica las credenciales de Azure Speech
- Prueba con diferentes voces
- Revisa la consola para errores específicos

### El iframe no muestra el sitio
- Algunos sitios bloquean iframes por seguridad
- Intenta con otro sitio o usa una imagen de fondo

## 💡 Tips para la Demo

1. **Prepara las credenciales antes** de la presentación
2. **Prueba la conexión a internet** del lugar
3. **Ten un plan B**: captura de pantalla del chatbot funcionando
4. **Casos de uso preparados**: preguntas que muestren las capacidades
5. **Personaliza el system prompt** específicamente para el cliente

## 🎯 Casos de Uso de Ejemplo (Liverpool)

- "¿Qué categorías de productos tienen?"
- "¿Cuál es su política de devoluciones?"
- "¿Cómo puedo obtener la tarjeta de crédito Liverpool?"
- "¿Tienen servicio de envío a domicilio?"
- "¿Dónde puedo encontrar artículos de tecnología?"

## 📚 Recursos Adicionales

- [Azure Speech Services Docs](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic Claude API Docs](https://docs.anthropic.com/)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)

## 📄 Licencia

Este es un proyecto de demo. Úsalo libremente para presentaciones y prototipos.

---

**Desarrollado con ❤️ para demos profesionales de IA**
