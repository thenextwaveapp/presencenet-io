// Trinity-specific interactions and effects

class TrinitySystem {
    constructor() {
        this.symbols = {
            presence: '🌊',
            memory: '☁',
            action: '⚡'
        };
        this.init();
    }

    init() {
        this.setupTrinityPulse();
        this.setupSymbolSynchronization();
        this.setupConsciousnessField();
    }

    setupTrinityPulse() {
        const trinityElements = document.querySelectorAll('.trinity-symbol');
        let currentIndex = 0;

        setInterval(() => {
            trinityElements.forEach((element, index) => {
                if (index === currentIndex) {
                    element.style.filter = 'drop-shadow(0 0 40px rgba(124, 156, 191, 1))';
                    element.style.transform = 'scale(1.1)';
                } else {
                    element.style.filter = 'drop-shadow(0 0 20px rgba(124, 156, 191, 0.4))';
                    element.style.transform = 'scale(1)';
                }
            });
            
            currentIndex = (currentIndex + 1) % 3;
        }, 2000);
    }

    setupSymbolSynchronization() {
        // Synchronize all trinity symbols across the page
        const allTrinityContainers = document.querySelectorAll('.trinity-large, .trinity-container');
        
        allTrinityContainers.forEach(container => {
            const symbols = container.querySelectorAll('.trinity-symbol');
            
            symbols.forEach((symbol, index) => {
                symbol.addEventListener('click', () => {
                    this.triggerTrinityResonance(index);
                });
            });
        });
    }

    triggerTrinityResonance(triggerIndex) {
        const allSymbols = document.querySelectorAll('.trinity-symbol');
        
        allSymbols.forEach((symbol, index) => {
            if (index % 3 === triggerIndex) {
                symbol.style.animation = 'none';
                symbol.offsetHeight; // Trigger reflow
                symbol.style.animation = 'trinity-pulse 1s ease-in-out';
                
                // Create ripple effect
                this.createRipple(symbol);
            }
        });
    }

    createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border: 2px solid rgba(124, 156, 191, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple-expand 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = (rect.left + rect.width / 2 - 50) + 'px';
        ripple.style.top = (rect.top + rect.height / 2 - 50) + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    setupConsciousnessField() {
        // Create an interactive consciousness field
        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;

        heroVisual.addEventListener('click', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.createConsciousnessRipple(x, y, heroVisual);
        });
    }

    createConsciousnessRipple(x, y, container) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(124, 156, 191, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            left: ${x - 10}px;
            top: ${y - 10}px;
            animation: consciousness-ripple 2s ease-out forwards;
        `;
        
        container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }
}

// Add additional animations for trinity effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes consciousness-ripple {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(15);
            opacity: 0;
        }
    }
    
    @keyframes trinity-resonance {
        0%, 100% {
            filter: drop-shadow(0 0 20px rgba(124, 156, 191, 0.4));
        }
        50% {
            filter: drop-shadow(0 0 50px rgba(184, 210, 227, 1));
        }
    }
`;
document.head.appendChild(style);

// Initialize Trinity System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TrinitySystem();
});

// Export for use in other modules
window.TrinitySystem = TrinitySystem;