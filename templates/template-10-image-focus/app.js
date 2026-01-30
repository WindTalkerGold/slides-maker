// Minimal HTML tag function for syntax highlighting and processing
export const html = (strings, ...values) => {
    return String.raw({ raw: strings }, ...values);
};

class SlideDeck {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = [
            'page-1.js',
            'page-2.js',
            'page-3.js'
        ];
        this.appElement = document.getElementById('app');
        this.init();
    }

    async init() {
        // Keyboard navigation
        window.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Initial load
        await this.loadSlide(this.currentSlideIndex);
        this.appElement.classList.add('loaded');

        // Optional: Render controls
        this.renderControls();
    }

    async loadSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        this.currentSlideIndex = index;
        const filename = this.slides[index];

        try {
            // Dynamic import cache busting for development
            const module = await import(`./slides/${filename}`);
            const content = module.default;

            // Render content
            this.appElement.innerHTML = `<div class="slide-container">${content}</div>`;

            // Execute onMount lifecycle if defined
            if (module.onMount) {
                try {
                    await module.onMount(this.appElement.querySelector('.slide-container'));
                } catch (e) {
                    console.error('Error in slide onMount:', e);
                }
            }

            // Update URL hash without scrolling
            history.replaceState(null, null, `#${index + 1}`);

        } catch (error) {
            console.error(`Failed to load slide ${filename}:`, error);
            this.appElement.innerHTML = `<div class="error">Error loading slide ${index + 1}</div>`;
        }
    }

    handleKeydown(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            this.next();
        } else if (e.key === 'ArrowLeft') {
            this.prev();
        }
    }

    next() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.loadSlide(this.currentSlideIndex + 1);
        }
    }

    prev() {
        if (this.currentSlideIndex > 0) {
            this.loadSlide(this.currentSlideIndex - 1);
        }
    }

    renderControls() {
        const controls = document.createElement('div');
        controls.className = 'controls';

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.className = 'nav-btn';
        prevBtn.onclick = () => this.prev();

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.className = 'nav-btn';
        nextBtn.onclick = () => this.next();

        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        document.body.appendChild(controls);
    }
}

// Start the app
new SlideDeck();
