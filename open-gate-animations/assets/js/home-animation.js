/**
 * Open Gate Animations - Home Animation
 * Door animation with wheel/keyboard/touch navigation
 */

(function() {
    'use strict';

    const ANIMATION_DURATION = 2200; // ms

    class HomeAnimation {
        constructor(container) {
            this.container = container;
            this.activeSection = 0;
            this.isAnimating = false;
            this.animationProgress = 0;
            this.animationFrame = null;
            this.startTime = null;

            this.init();
        }

        init() {
            this.setupEventListeners();
            this.render();
        }

        setupEventListeners() {
            // Wheel event
            this.container.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (this.isAnimating) return;

                const direction = e.deltaY > 0 ? 1 : -1;

                if (direction > 0 && this.activeSection === 0) {
                    this.animateToSection(1);
                } else if (direction < 0 && this.activeSection === 1) {
                    this.animateToSection(0);
                }
            }, { passive: false });

            // Keyboard events
            window.addEventListener('keydown', (e) => {
                if (this.isAnimating) return;

                if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') && this.activeSection === 0) {
                    e.preventDefault();
                    this.animateToSection(1);
                } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && this.activeSection === 1) {
                    e.preventDefault();
                    this.animateToSection(0);
                }
            });

            // Touch events
            let touchStartY = 0;

            this.container.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            this.container.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });

            this.container.addEventListener('touchend', (e) => {
                if (this.isAnimating) return;

                const touchEndY = e.changedTouches[0].clientY;
                const diff = touchStartY - touchEndY;

                if (Math.abs(diff) > 30) {
                    if (diff > 0 && this.activeSection === 0) {
                        this.animateToSection(1);
                    } else if (diff < 0 && this.activeSection === 1) {
                        this.animateToSection(0);
                    }
                }
            }, { passive: true });
        }

        animateToSection(targetSection) {
            if (this.isAnimating) return;

            this.isAnimating = true;
            this.startTime = null;

            const startProgress = this.animationProgress;
            const endProgress = targetSection === 1 ? 1 : 0;

            const animate = (timestamp) => {
                if (this.startTime === null) {
                    this.startTime = timestamp;
                }

                const elapsed = timestamp - this.startTime;
                const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

                // Easing function (ease-in-out cubic)
                const eased = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                this.animationProgress = startProgress + (endProgress - startProgress) * eased;

                this.render();

                if (progress < 1) {
                    this.animationFrame = requestAnimationFrame(animate);
                } else {
                    this.activeSection = targetSection;
                    this.isAnimating = false;
                    this.animationFrame = null;
                }
            };

            this.animationFrame = requestAnimationFrame(animate);
        }

        render() {
            // Animation phases:
            // 0-0.4: Shape scales up
            // 0.4-0.7: Door closes
            // 0.7-1: Fade to black and reveal

            const shapeScaleProgress = Math.min(this.animationProgress / 0.4, 1);
            const doorCloseProgress = Math.max(0, Math.min((this.animationProgress - 0.4) / 0.3, 1));
            const fadeProgress = Math.max(0, Math.min((this.animationProgress - 0.7) / 0.3, 1));

            const shapeScale = 1 + shapeScaleProgress * 49;
            const doorOffset = doorCloseProgress * 50;

            // Background color transition
            const bgValue = Math.round(255 - 255 * Math.min(1, (this.animationProgress - 0.3) / 0.7));
            const bgColor = `rgb(${bgValue}, ${bgValue}, ${bgValue})`;

            // Update container background
            this.container.style.backgroundColor = bgColor;

            // Update section 1 (white background)
            const section1 = this.container.querySelector('.oga-section-1');
            if (section1) {
                section1.style.opacity = 1 - fadeProgress;
                section1.style.pointerEvents = (this.activeSection === 0 && !this.isAnimating) ? 'auto' : 'none';

                // Update text opacity
                const textElements = section1.querySelectorAll('.oga-text');
                textElements.forEach(el => {
                    el.style.opacity = 1 - shapeScaleProgress;
                });

                // Update door shape
                const shapeContainer = section1.querySelector('.oga-door-shape');
                if (shapeContainer) {
                    shapeContainer.style.transform = `scale(${shapeScale})`;
                }

                if (this.animationProgress < 0.4) {
                    const leftDoor = section1.querySelector('.oga-door-left');
                    const rightDoor = section1.querySelector('.oga-door-right');

                    if (leftDoor) {
                        leftDoor.style.transform = `rotateY(${44 - doorCloseProgress * 44}deg)`;
                    }
                    if (rightDoor) {
                        rightDoor.style.transform = `rotateY(${-44 + doorCloseProgress * 44}deg)`;
                    }
                }

                // Update scroll indicator
                const scrollIndicator = section1.querySelector('.oga-scroll-indicator');
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = 1 - this.animationProgress;
                }
            }

            // Update section 2 (black background)
            const section2 = this.container.querySelector('.oga-section-2');
            if (section2) {
                section2.style.opacity = fadeProgress;
                section2.style.pointerEvents = (this.activeSection === 1 && !this.isAnimating) ? 'auto' : 'none';

                const textSection = section2.querySelector('.oga-text-section');
                const videoSection = section2.querySelector('.oga-video-section');

                if (textSection) {
                    textSection.style.transform = `translateY(${(1 - fadeProgress) * 30}vh)`;
                }
                if (videoSection) {
                    videoSection.style.transform = `translateY(${(1 - fadeProgress) * -20}vh)`;
                }
            }

            // Update progress dots
            const dots = this.container.querySelectorAll('.oga-progress-dot');
            dots.forEach((dot, index) => {
                const dotColor = this.animationProgress < 0.5 ? '#000' : '#fff';
                dot.style.backgroundColor = dotColor;
                dot.style.opacity = (this.activeSection === index && !this.isAnimating) ? 1 : 0.3;
                dot.style.transform = (this.activeSection === index && !this.isAnimating) ? 'scale(1.25)' : 'scale(1)';
            });
        }

        destroy() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
        }
    }

    // Initialize on DOM ready
    function init() {
        const containers = document.querySelectorAll('.oga-home-animation');
        containers.forEach(container => {
            new HomeAnimation(container);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
