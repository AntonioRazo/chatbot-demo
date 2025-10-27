// ==========================================
// VOICE-VISUALIZER.JS - Voice Visualization
// ==========================================

const VoiceVisualizer = {
    
    canvas: null,
    ctx: null,
    animationId: null,
    bars: 64,
    barWidth: 3,
    barGap: 2,
    colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
    
    // Initialize canvas
    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 300;
        this.canvas.height = 200;
    },
    
    // Start animation
    start: function() {
        this.animate();
    },
    
    // Stop animation
    stop: function() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.clear();
    },
    
    // Clear canvas
    clear: function() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },
    
    // Animation loop
    animate: function() {
        this.clear();
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const time = Date.now() * 0.002;
        
        // Draw sound waves
        for (let i = 0; i < this.bars; i++) {
            const angle = (i / this.bars) * Math.PI * 2;
            const radius = 40 + Math.sin(time + i * 0.5) * 20;
            const height = 20 + Math.sin(time * 2 + i * 0.3) * 15;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const endX = centerX + Math.cos(angle) * (radius + height);
            const endY = centerY + Math.sin(angle) * (radius + height);
            
            // Gradient color
            const gradient = this.ctx.createLinearGradient(x, y, endX, endY);
            gradient.addColorStop(0, this.colors[i % this.colors.length]);
            gradient.addColorStop(1, this.colors[(i + 1) % this.colors.length]);
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = this.barWidth;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();
        }
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
};

// AI Avatar Animation
const AIAvatar = {
    
    canvas: null,
    ctx: null,
    animationId: null,
    particles: [],
    particleCount: 30,
    
    // Initialize canvas
    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 45;
        this.canvas.height = 45;
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                angle: (i / this.particleCount) * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5,
                size: 1 + Math.random() * 2,
                offset: Math.random() * Math.PI * 2
            });
        }
        
        this.animate();
    },
    
    // Animation loop
    animate: function() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const time = Date.now() * 0.001;
        
        // Draw particles
        this.particles.forEach(particle => {
            const radius = 10 + Math.sin(time + particle.offset) * 5;
            const x = centerX + Math.cos(particle.angle + time * particle.speed) * radius;
            const y = centerY + Math.sin(particle.angle + time * particle.speed) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
        });
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    },
    
    // Stop animation
    stop: function() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
};

// Initialize on page load
$(document).ready(function() {
    VoiceVisualizer.init('voice-canvas');
    AIAvatar.init('ai-avatar-canvas');
});
