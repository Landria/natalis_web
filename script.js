class AuroraEffect {
    constructor() {
        this.canvas = document.getElementById('auroraCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.waves = [];
        this.time = 0;

        this.init();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    init() {
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        // Создаем волны aurora
        for (let i = 0; i < 5; i++) {
            this.waves.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 200 + 100,
                color: this.getAuroraColor(),
                opacity: Math.random() * 0.3 + 0.1,
                phase: Math.random() * Math.PI * 2
            });
        }

        // Создаем светящиеся частицы
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                color: this.getParticleColor(),
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    getAuroraColor() {
        const colors = [
            'rgba(16, 185, 129, 0.15)',    // European Green
            'rgba(6, 182, 212, 0.15)',     // Freedom Blue  
            'rgba(139, 92, 246, 0.15)',    // Aurora Purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    getParticleColor() {
        const colors = [
            'rgba(16, 185, 129, 0.8)',
            'rgba(6, 182, 212, 0.8)',
            'rgba(139, 92, 246, 0.8)',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.01;

        // Рисуем aurora волны
        this.waves.forEach(wave => {
            // Обновляем позицию
            wave.x += wave.speedX;
            wave.y += wave.speedY;
            wave.phase += 0.02;

            // Bounce off edges
            if (wave.x < -wave.size || wave.x > this.canvas.width + wave.size) {
                wave.speedX *= -1;
            }
            if (wave.y < -wave.size || wave.y > this.canvas.height + wave.size) {
                wave.speedY *= -1;
            }

            // Рисуем gradient волну
            const gradient = this.ctx.createRadialGradient(
                wave.x, wave.y, 0,
                wave.x, wave.y, wave.size
            );

            const dynamicOpacity = wave.opacity * (0.5 + 0.5 * Math.sin(wave.phase));
            gradient.addColorStop(0, wave.color.replace('0.15', dynamicOpacity.toString()));
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                wave.x - wave.size, 
                wave.y - wave.size, 
                wave.size * 2, 
                wave.size * 2
            );
        });

        // Рисуем светящиеся частицы
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.pulse += 0.05;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Pulsing effect
            const pulsedOpacity = particle.opacity * (0.3 + 0.7 * Math.sin(particle.pulse));
            const pulsedSize = particle.size * (0.8 + 0.4 * Math.sin(particle.pulse * 0.7));

            // Glow effect
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = particle.color;

            this.ctx.globalAlpha = pulsedOpacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, pulsedSize, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.shadowBlur = 0;
            this.ctx.globalAlpha = 1;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Управление Privacy Notice с нейромаркетинговым подходом
class PrivacyNoticeManager {
    constructor() {
        this.notice = document.getElementById('privacyNotice');
        if (!this.notice) return;

        // Показываем notice через 3 секунды для создания доверия
        setTimeout(() => this.showNotice(), 3000);
    }

    showNotice() {
        this.notice.classList.add('show');

        // Добавляем пульсацию для привлечения внимания
        setTimeout(() => {
            this.notice.classList.add('pulse-element');
        }, 500);
    }

    closeNotice() {
        this.notice.classList.add('closing');
        setTimeout(() => {
            this.notice.style.display = 'none';
        }, 300);
    }
}

// Scroll-triggered анимации для нейромаркетингового эффекта
class ScrollAnimationManager {
    constructor() {
        this.elements = document.querySelectorAll('.pulse-element:not(.hero-title)');
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.init();
    }

    init() {
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');

                // Добавляем небольшую задержку для создания волнового эффекта
                const delay = Math.random() * 200;
                setTimeout(() => {
                    entry.target.style.animationDelay = '0s';
                }, delay);
            }
        });
    }
}

// Enhanced пульсирующие эффекты для ключевых элементов
class PulseEnhancer {
    constructor() {
        this.enhanceKeyElements();
        this.addHoverEffects();
    }

    enhanceKeyElements() {
        // Усиливаем пульсацию для CTA кнопок
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.animationDuration = '1.5s';
            });

            button.addEventListener('mouseleave', () => {
                button.style.animationDuration = '4s';
            });
        });

        // Особая пульсация для статистики
        const statNumbers = document.querySelectorAll('.stat-item .number');
        statNumbers.forEach(number => {
            number.style.animation = 'key-pulse 2s ease-in-out infinite';
        });
    }

    addHoverEffects() {
        const valueProps = document.querySelectorAll('.value-prop');
        valueProps.forEach(prop => {
            prop.addEventListener('mouseenter', () => {
                prop.style.transform = 'translateY(-8px) scale(1.02)';
                prop.style.boxShadow = '0 15px 50px rgba(16, 185, 129, 0.3)';
            });

            prop.addEventListener('mouseleave', () => {
                prop.style.transform = 'translateY(0) scale(1)';
                prop.style.boxShadow = 'none';
            });
        });
    }
}

// Эффект печатания для hero subtitle (нейромаркетинг)
class TypewriterEffect {
    constructor() {
        this.subtitle = document.querySelector('.hero-subtitle');
        if (!this.subtitle) return;

        this.originalText = this.subtitle.textContent;
        this.subtitle.textContent = '';
        this.currentIndex = 0;

        // Начинаем печатание через 1 секунду после загрузки
        setTimeout(() => this.startTyping(), 1000);
    }

    startTyping() {
        if (this.currentIndex < this.originalText.length) {
            this.subtitle.textContent += this.originalText[this.currentIndex];
            this.currentIndex++;

            // Варьируем скорость для естественности
            const delay = Math.random() * 50 + 30;
            setTimeout(() => this.startTyping(), delay);
        } else {
            // Добавляем мигающий курсор
            this.addCursor();
        }
    }

    addCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        this.subtitle.appendChild(cursor);

        // Убираем курсор через 3 секунды
        setTimeout(() => {
            cursor.remove();
        }, 3000);
    }
}

// Функция для закрытия Privacy Notice (глобальная для HTML)
function closePrivacyNotice() {
    const notice = document.getElementById('privacyNotice');
    if (notice) {
        notice.classList.add('closing');
        setTimeout(() => {
            notice.style.display = 'none';
        }, 300);
    }
}

// Инициализация всех эффектов при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, поддерживает ли браузер необходимые API
    if (window.IntersectionObserver && window.requestAnimationFrame) {
        new AuroraEffect();
        new PrivacyNoticeManager();
        new ScrollAnimationManager();
        new PulseEnhancer();

        // Typewriter эффект только на desktop для производительности
        if (window.innerWidth > 768) {
            new TypewriterEffect();
        }
    }

    // Добавляем CSS для typing cursor
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        .typing-cursor {
            color: var(--european-green);
            font-weight: 300;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization - приостанавливаем анимации при скрытой вкладке
document.addEventListener('visibilitychange', () => {
    const canvas = document.getElementById('auroraCanvas');
    if (canvas) {
        if (document.hidden) {
            canvas.style.animationPlayState = 'paused';
        } else {
            canvas.style.animationPlayState = 'running';
        }
    }
});

// Простая аналитика без внешних скриптов (демонстрация privacy-first подхода)
const trackEvent = (eventName) => {
    // Локальное логирование для демонстрации (без отправки данных)
    console.log(`Privacy-safe event: ${eventName} at ${new Date().toISOString()}`);
};

// Отслеживание взаимодействий с CTA (локально)
document.addEventListener('click', (e) => {
    if (e.target.matches('.cta-primary, .cta-secondary')) {
        trackEvent('CTA_Click: ' + e.target.textContent.trim());
    }
});
