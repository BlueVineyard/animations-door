/**
 * Open Gate Animations - Approach Timeline
 * Scroll-driven timeline animation showing business phases
 */

(function() {
    'use strict';

    const GOLD = '#C8A24E';

    class ApproachTimeline {
        constructor(container) {
            this.container = container;
            this.scrollProgress = 0;
            this.scrollArea = container.querySelector('.oga-scroll-area');
            this.section = container.querySelector('.oga-section');
            this.steps = container.querySelectorAll('.oga-timeline-step');
            this.totalSteps = this.steps.length;
            this.timelineFill = container.querySelector('.oga-timeline-fill');
            this.dots = container.querySelectorAll('.oga-timeline-dot');

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
                const timelineHeight = this.section
                    ? this.section.offsetHeight - this.scrollArea.clientHeight
                    : this.scrollArea.scrollHeight - this.scrollArea.clientHeight;

                if (timelineHeight <= 0) return;

                this.scrollProgress = Math.min(Math.max(scrollTop / timelineHeight, 0), 1);
                this.render();
            }, { passive: true });

            // Initial render
            this.render();
        }

        getStepProgress(index) {
            const stepSize = 1 / this.totalSteps;
            const stepStart = index * stepSize;
            const stepEnd = (index + 1) * stepSize;
            return Math.min(Math.max((this.scrollProgress - stepStart) / (stepEnd - stepStart), 0), 1);
        }

        render() {
            // Update timeline fill
            if (this.timelineFill) {
                this.timelineFill.style.transform = `translateX(-50%) scaleY(${this.scrollProgress})`;
            }

            // Update each step
            this.steps.forEach((step, index) => {
                const stepProgress = this.getStepProgress(index);
                const isActive = stepProgress > 0.1;

                // Update image card opacity
                const imageCard = step.querySelector('.oga-image-card');
                if (imageCard) {
                    imageCard.style.opacity = isActive ? 1 : 0.4;
                }

                // Update image title color
                const imageTitle = step.querySelector('.oga-image-title');
                if (imageTitle) {
                    imageTitle.style.color = isActive ? '#fff' : '#999';
                }

                // Update description opacity
                const description = step.querySelector('.oga-description');
                if (description) {
                    description.style.opacity = isActive ? 1 : 0.3;
                }

                // Update description text colors
                const boldText = step.querySelector('.oga-bold-text');
                const normalText = step.querySelector('.oga-normal-text');
                if (boldText) {
                    boldText.style.color = isActive ? '#fff' : '#666';
                }
                if (normalText) {
                    normalText.style.color = isActive ? 'rgba(255,255,255,0.6)' : '#444';
                }

                // Update dot
                const dot = this.dots[index];
                if (dot) {
                    dot.style.borderColor = isActive ? GOLD : '#525252';
                    dot.style.backgroundColor = isActive ? GOLD : 'transparent';
                }
            });
        }
    }

    // Initialize on DOM ready
    function init() {
        const containers = document.querySelectorAll('.oga-approach-timeline');
        containers.forEach(container => {
            new ApproachTimeline(container);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
