/**
 * Open Gate Animations - About Spread
 * Scroll-driven image spread animation
 */

(function() {
    'use strict';

    // Spread positions: cascading diagonal, left-high to right-low
    const SPREAD_POSITIONS = [
        { x: -180, y: -80, rotate: -4 },  // left image, high
        { x: 0, y: 0, rotate: 1 },        // center image, middle
        { x: 170, y: 70, rotate: 3 },     // right image, low
    ];

    // Clustered starting positions (tightly stacked)
    const CLUSTER_POSITIONS = [
        { x: -12, y: 6, rotate: -2 },
        { x: 0, y: 0, rotate: 1 },
        { x: 10, y: -4, rotate: 3 },
    ];

    class AboutSpread {
        constructor(container) {
            this.container = container;
            this.scrollProgress = 0;
            this.scrollArea = container.querySelector('.oga-scroll-area');
            this.section = container.querySelector('.oga-section');
            this.images = container.querySelectorAll('.oga-image');
            this.description = container.querySelector('.oga-description');

            this.init();
        }

        init() {
            this.setupScrollListener();
            this.render();
        }

        setupScrollListener() {
            if (!this.scrollArea) return;

            this.scrollArea.addEventListener('scroll', () => {
                const scrollTop = this.scrollArea.scrollTop;
                const sectionHeight = this.section 
                    ? this.section.offsetHeight - this.scrollArea.clientHeight
                    : this.scrollArea.scrollHeight - this.scrollArea.clientHeight;
                
                if (sectionHeight <= 0) return;
                
                this.scrollProgress = Math.min(Math.max(scrollTop / sectionHeight, 0), 1);
                this.render();
            }, { passive: true });

            // Initial render
            this.render();
        }

        easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        getImageStyle(index) {
            const eased = this.easeOutCubic(this.scrollProgress);
            const cluster = CLUSTER_POSITIONS[index];
            const spread = SPREAD_POSITIONS[index];

            const x = cluster.x + (spread.x - cluster.x) * eased;
            const y = cluster.y + (spread.y - cluster.y) * eased;
            const rotate = cluster.rotate + (spread.rotate - cluster.rotate) * eased;

            return {
                transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
            };
        }

        render() {
            // Update image positions
            this.images.forEach((img, index) => {
                const style = this.getImageStyle(index);
                img.style.transform = style.transform;
            });

            // Update description opacity
            if (this.description) {
                this.description.style.opacity = 0.3 + this.scrollProgress * 0.7;
            }
        }
    }

    // Initialize on DOM ready
    function init() {
        const containers = document.querySelectorAll('.oga-about-spread');
        containers.forEach(container => {
            new AboutSpread(container);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
