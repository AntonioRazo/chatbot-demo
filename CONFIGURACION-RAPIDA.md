# 🚀 GUÍA RÁPIDA DE CONFIGURACIÓN

## Paso a Paso para Poner en Marcha la Demo

### 1️⃣ DESCARGAR Y EXTRAER
- Descarga el archivo `chatbot-demo.zip`
- Extrae los archivos en una carpeta
- Abre `index.html` en tu navegador

### 2️⃣ OBTENER CREDENCIALES DE AZURE SPEECH

#### Opción A: Azure Portal (Si tienes cuenta Azure)
1. Ve a https://portal.azure.com
2. Busca "Speech Services" en la barra de búsqueda
3. Haz clic en "Create" / "Crear"
4. Completa los datos:
   - Subscription: Tu suscripción
   - Resource Group: Crea uno nuevo o usa existente
   - Region: Elige una (ej: East US)
   - Name: Un nombre único (ej: liverpool-speech-demo)
   - Pricing Tier: Free F0 (¡Incluye 5 millones de caracteres gratis!)
5. Haz clic en "Review + Create"
6. Una vez creado, ve a "Keys and Endpoint"
7. Copia:
   - KEY 1 → Este es tu `Speech Key`
   - Location/Region → Este es tu `Speech Region` (ej: eastus)

#### Opción B: Azure Free Trial (Si no tienes cuenta)
1. Ve a https://azure.microsoft.com/free/
2. Crea una cuenta gratuita (requiere tarjeta pero NO te cobra)
3. Sigue los pasos de la Opción A

**IMPORTANTE:** El tier gratuito de Azure Speech incluye:
- 5 millones de caracteres TTS gratis/mes
- 5 horas de STT gratis/mes
- ¡Perfecto para demos!

### 3️⃣ OBTENER API KEY DE IA

Elige UNO de estos proveedores:

#### OPCIÓN A: OpenAI (Recomendado para empezar)
1. Ve a https://platform.openai.com
2. Crea una cuenta / Inicia sesión
3. Ve a https://platform.openai.com/api-keys
4. Haz clic en "Create new secret key"
5. Copia la key (guárdala bien, solo se muestra una vez)
6. Agrega crédito a tu cuenta:
   - Ve a "Billing" → "Add payment method"
   - Carga al menos $5 USD para pruebas

**Modelos recomendados:**
- `gpt-4` - Mejor calidad (más caro)
- `gpt-4-turbo` - Balance calidad/precio
- `gpt-3.5-turbo` - Más económico

**Costo aproximado por conversación:**
- GPT-4: ~$0.03 por mensaje
- GPT-3.5-turbo: ~$0.001 por mensaje

#### OPCIÓN B: Anthropic Claude
1. Ve a https://console.anthropic.com
2. Crea una cuenta
3. Ve a "API Keys"
4. Crea una nueva API key
5. Copia la key
6. Agrega crédito (similar a OpenAI)

**Modelo recomendado:**
- `claude-3-5-sonnet-20241022` - Excelente calidad

**Costo aproximado:**
- ~$0.003 por mensaje

### 4️⃣ CONFIGURAR EL CHATBOT

1. Abre `index.html` en tu navegador
2. Haz clic en el botón flotante para abrir el chat
3. Haz clic en el ícono de engranaje (⚙️)
4. Rellena los campos:

```
Azure Speech Services
├── Speech Key: [Tu KEY de Azure]
├── Speech Region: [Tu region, ej: eastus]
└── Voz: [Elige una voz, ej: Dalia (Femenino - MX)]

Configuración de IA
├── API Provider: [OpenAI / Anthropic]
├── API Key: [Tu API Key]
└── Modelo: [gpt-4 / claude-3-5-sonnet-20241022]

System Prompt
└── [Edita o deja el default]
```

5. Haz clic en "Guardar Configuración"

### 5️⃣ PROBAR LA DEMO

**Prueba de Texto:**
1. Escribe "Hola" en el chat
2. Si responde, ¡funciona! ✅

**Prueba de Voz:**
1. Haz clic en el ícono del micrófono 🎤
2. Permite el acceso al micrófono
3. Di "¿Qué servicios ofrece Liverpool?"
4. Deberías ver el texto reconocido y la respuesta

### 6️⃣ PERSONALIZAR PARA EL CLIENTE

#### Cambiar el sitio de fondo:
Edita `index.html`, línea 25:
```html
<iframe id="client-website" src="https://WWW.CLIENTE.COM/" frameborder="0"></iframe>
```

#### Cambiar el nombre:
Edita `index.html`, línea 42:
```html
<h5 class="mb-0">Asistente [NOMBRE DEL CLIENTE]</h5>
```

#### Personalizar el System Prompt:
En el panel de configuración, edita el System Prompt para que se ajuste al negocio del cliente.

Ejemplo para una tienda de tecnología:
```
Eres un asistente virtual experto en [NOMBRE DE LA TIENDA], especializada en productos tecnológicos.

Tu objetivo es:
- Ayudar a encontrar el producto perfecto según necesidades
- Explicar características técnicas de forma simple
- Informar sobre garantías y soporte técnico
- Recomendar accesorios complementarios

Personalidad:
- Técnicamente competente pero amigable
- Paciente al explicar conceptos
- Entusiasta de la tecnología
- Honesto sobre limitaciones de productos
```

## 🎯 CHECKLIST ANTES DE LA DEMO

- [ ] Credenciales de Azure configuradas
- [ ] API Key de IA configurada y con crédito
- [ ] System Prompt personalizado para el cliente
- [ ] Sitio del cliente en el iframe (o imagen de fondo)
- [ ] Nombre del asistente personalizado
- [ ] Probado texto y voz
- [ ] Conexión a Internet estable
- [ ] Navegador actualizado (Chrome/Edge recomendado)
- [ ] Casos de uso preparados
- [ ] Laptop con buena batería / conectada

## 📱 PRESENTAR EN MÓVIL

La demo es responsive. Para presentar en móvil/tablet:
1. Sube los archivos a un hosting (GitHub Pages, Netlify, Vercel)
2. O usa un servidor local: `python -m http.server 8000`
3. Accede desde el móvil a la URL

## 💰 ESTIMACIÓN DE COSTOS PARA DEMO

Para una demo de 30 minutos con ~20 interacciones:

**Azure Speech:**
- Gratis (tier gratuito cubre perfectamente)

**OpenAI (GPT-4):**
- ~$0.50 - $1.00 USD total

**Anthropic (Claude):**
- ~$0.10 - $0.20 USD total

**Total: < $2 USD por demo** 🎉

## 🆘 TROUBLESHOOTING RÁPIDO

**"No responde"**
→ Revisa la consola del navegador (F12)
→ Verifica las API keys

**"Micrófono no funciona"**
→ Usa HTTPS o localhost
→ Da permisos al navegador

**"El iframe está en blanco"**
→ Algunos sitios bloquean iframes
→ Usa una captura de pantalla como fondo

**"Error 429 / Rate Limit"**
→ Estás sin crédito en OpenAI/Anthropic
→ Recarga tu cuenta

## 📞 CONTACTO Y SOPORTE

Si tienes problemas, verifica:
1. Consola del navegador (F12) para mensajes de error
2. README.md para documentación completa
3. Azure Portal para estado de servicios

---

**¡Listo para impresionar! 🚀**
