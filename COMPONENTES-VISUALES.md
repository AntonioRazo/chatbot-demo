# 🎨 COMPONENTES VISUALES DEL CHATBOT

## Vista General de la Interfaz

```
┌─────────────────────────────────────────────────────────┐
│  🌐 SITIO DEL CLIENTE (Liverpool.com.mx)                │
│                                                           │
│  [Toda la página del cliente en iframe de fondo]        │
│                                                           │
│                                                           │
│                                                           │
│                                    ┌──────────────────┐  │
│                                    │  💬 CHAT PANEL   │  │
│                                    │  ┌────────────┐  │  │
│                                    │  │🤖 Liverpool│  │  │
│                                    │  └────────────┘  │  │
│                                    │                  │  │
│                                    │  💬 Mensajes     │  │
│                                    │  del chat aquí   │  │
│                                    │                  │  │
│                                    │  [  🎤 | ✉️ | ➤]│  │
│                                    └──────────────────┘  │
│                                          🔴 Botón        │
│                                          Flotante        │
└─────────────────────────────────────────────────────────┘
```

## 1. BOTÓN FLOTANTE

```
    ┌─────────────┐
    │      💬     │  ← Botón circular flotante
    │             │     Color: Gradiente morado
    │   65x65px   │     Posición: Esquina inferior derecha
    └─────────────┘     Efecto: Pulse ring animado
         ↓
    [Click aquí]
         ↓
    Abre el panel del chat
```

**Características:**
- Tamaño: 65x65 píxeles
- Color: Gradiente lineal (#667eea → #764ba2)
- Animación: Anillo pulsante continuo
- Hover: Escala 1.1x con sombra aumentada
- Siempre visible hasta que se abre el chat

## 2. PANEL DE CHAT

```
┌─────────────────────────────────────┐
│ 🤖 Asistente Liverpool        ⚙️  ❌ │ ← Header (gradiente morado)
├─────────────────────────────────────┤
│                                     │
│ 🤖  Hola! Soy tu asistente...      │ ← Mensaje del bot
│     10:30                            │
│                                     │
│              Hola, necesito ayuda  │ ← Mensaje del usuario
│              10:31              👤 │
│                                     │
│ 🤖  Por supuesto, ¿en qué te...    │
│     10:31                            │
│                                     │
│ [Estado: Procesando...]             │ ← Indicador de estado
│                                     │
├─────────────────────────────────────┤
│  🎤  [Escribe tu mensaje...]    ➤  │ ← Input area
└─────────────────────────────────────┘
```

**Dimensiones:**
- Ancho: 420px
- Alto: 650px
- Posición: Esquina inferior derecha
- Border radius: 20px
- Sombra: Profunda (0 20px 60px)

**Header:**
- Avatar animado con partículas
- Nombre del asistente
- Botón de configuración (⚙️)
- Botón de cerrar (❌)

## 3. MENSAJES

### Mensaje del Bot
```
┌──────────────────────────────────┐
│ 🤖 │ Hola! ¿En qué puedo...     │
│    │ ayudarte hoy?              │
│    │ 10:30                       │
└──────────────────────────────────┘
```
- Avatar circular con ícono de robot
- Fondo blanco
- Alineado a la izquierda
- Timestamp abajo

### Mensaje del Usuario
```
┌──────────────────────────────────┐
│     Necesito ayuda con... │ 👤   │
│     una devolución        │      │
│     10:31                 │      │
└──────────────────────────────────┘
```
- Avatar circular con ícono de persona
- Fondo con gradiente morado
- Texto blanco
- Alineado a la derecha

### Indicador de Escritura (Typing)
```
┌──────────────────────────────────┐
│ 🤖 │ ● ● ●                       │
└──────────────────────────────────┘
```
- Tres puntos animados
- Bouncing effect

## 4. PANEL DE CONFIGURACIÓN

```
┌──────────────────────────────────────────┐
│ ⚙️ Configuración de IA            ❌     │
├──────────────────────────────────────────┤
│                                          │
│ 🔵 Azure Cognitive Services              │
│ ┌──────────────────────────────────────┐ │
│ │ Speech Key: ******************      │ │
│ └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐ │
│ │ Speech Region: eastus                │ │
│ └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐ │
│ │ Voz: ▼ Dalia (Femenino - MX)        │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ⭐ Configuración de IA                   │
│ ┌──────────────────────────────────────┐ │
│ │ API Provider: ▼ OpenAI               │ │
│ └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐ │
│ │ API Key: ************************    │ │
│ └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐ │
│ │ Modelo: gpt-4                        │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ 📝 System Prompt                         │
│ ┌──────────────────────────────────────┐ │
│ │ Eres un asistente virtual...         │ │
│ │                                      │ │
│ │ [Área de texto grande]               │ │
│ │                                      │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │   ✅ Guardar Configuración           │ │
│ └──────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

**Características:**
- Se desliza desde la derecha
- Ancho: 450px
- Alto: 100% de la pantalla
- Todos los campos editables
- Guarda en localStorage

## 5. VISUALIZADOR DE VOZ

Cuando se activa el micrófono:

```
┌─────────────────────────────────────┐
│                                     │
│           /\    /\    /\            │
│          /  \  /  \  /  \           │
│         /    \/    \/    \          │
│        /                  \         │
│       /                    \        │
│      └──────────────────────┘       │
│                                     │
│       🎤  Escuchando...             │
│                                     │
└─────────────────────────────────────┘
```

**Animación:**
- Ondas de sonido circulares
- 64 barras animadas
- Colores: Gradiente arcoíris
- Canvas 300x200px
- Rotación continua

## 6. AVATAR ANIMADO DE IA

En el header del chat:

```
  ╔══════╗
  ║ ● ●  ║  ← Partículas flotantes
  ║  ● ● ║     orbitando en círculo
  ║ ●  ● ║     
  ╚══════╝
  45x45px
```

**Características:**
- 30 partículas blancas
- Movimiento orbital
- Efecto de profundidad
- Animación continua

## 7. ESTADOS VISUALES

### Estado: Idle (Esperando)
- Input habilitado
- Botón de enviar activo
- Sin indicadores de estado

### Estado: Escuchando (Micrófono)
```
🎤 [ROJO pulsante]
+ Overlay completo con visualizador
+ Texto: "Escuchando..."
```

### Estado: Procesando (Pensando)
```
[Barra de estado visible]
⏳ Procesando...
+ Indicador de typing en el chat
+ Input deshabilitado
```

### Estado: Hablando (Text-to-Speech)
```
[Barra de estado visible]
🔊 Hablando...
```

## 8. ANIMACIONES

### Entrada del Panel
- Transform: translateY(50px) → translateY(0)
- Scale: 0.9 → 1.0
- Opacity: 0 → 1
- Duración: 0.4s
- Easing: cubic-bezier

### Mensajes Nuevos
- Slide in from bottom
- Duration: 0.3s
- Fade in effect

### Botones Hover
- Scale: 1.0 → 1.1
- Shadow increase
- Smooth transition

### Pulse Ring (Botón flotante)
- Scale: 1.0 → 1.3
- Opacity: 0.6 → 0
- Duration: 2s
- Loop infinito

## 9. RESPONSIVE

### Desktop (> 768px)
- Panel: 420x650px
- Posición: Esquina inferior derecha
- Settings: Sidebar derecho

### Mobile (< 768px)
- Panel: Full screen
- Botón: Más pequeño (60x60px)
- Settings: Full screen overlay

## 10. COLORES Y TEMA

### Paleta Principal
```
Primary:     #667eea (Azul-violeta)
Secondary:   #764ba2 (Púrpura)
Success:     #28a745 (Verde)
Danger:      #dc3545 (Rojo)
Light:       #f8f9fa (Gris claro)
Dark:        #495057 (Gris oscuro)
```

### Gradientes
```
Main:        linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Voice:       linear-gradient(135deg, #f093fb 0%, #4facfe 100%)
```

### Sombras
```
Soft:        0 2px 5px rgba(0, 0, 0, 0.05)
Medium:      0 5px 15px rgba(102, 126, 234, 0.4)
Deep:        0 20px 60px rgba(0, 0, 0, 0.3)
```

---

## 🎯 PERSONALIZACIÓN RÁPIDA

Para adaptar a tu marca:

1. **Colores:** Busca y reemplaza `#667eea` y `#764ba2`
2. **Logo:** Cambia el emoji 💬 en el botón flotante
3. **Nombre:** Edita "Asistente Liverpool"
4. **Avatar:** Personaliza el ícono del bot (🤖)
5. **Fondo:** Cambia la URL del iframe

¡Todo está diseñado para ser fácilmente personalizable! 🎨
