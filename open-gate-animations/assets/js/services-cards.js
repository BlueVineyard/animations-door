/**
 * Open Gate Animations - Services Cards
 * Sequential card reveal animation with stacking
 */

(function() {
    'use strict';

    const CARD_ANIMATION_DURATION = 800;

    class ServicesCards {
        constructor(container) {
            this.container = container;
            this.visibleCards = 1;
            this.animProgress = 0;
            this.animDirection = null;
            this.cardsComplete = false;
            this.isAnimating = false;
            this.animFrame = null;
            this.scrollArea = container.querySelector('.oga-scroll-area');
            this.cards = container.querySelectorAll('.oga-service-card');
            this.totalCards = this.cards.length;

            this.init();
        }

        init() {
            this.setupEventListeners();
            this.render();
        }

        setupEventListeners() {
            // Wheel event
            this.container.addEventListener('wheel', (e) => {
                if (this.isAnimating) {
                    e.preventDefault();
                    return;
                }

                const direction = e.deltaY > 0 ? 'forward' : 'backward';

                if (direction === 'forward') {
                    if (this.visibleCards < this.totalCards) {
                        e.preventDefault();
                        this.animateCard('forward');
                    }
                } else {
                    if (this.scrollArea && this.scrollArea.scrollTop > 0) {
                        return;
                    }
                    if (this.cardsComplete) {
                        e.preventDefault();
                        this.cardsComplete = false;
                        this.animateCard('backward');
                    } else if (this.visibleCards > 1) {
                        e.preventDefault();
                        this.animateCard('backward');
                    }
                }
            }, { passive: false });

            // Touch events
            let touchStartY = 0;

            this.container.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                if (this.isAnimating) return;

                const diff = touchStartY - e.changedTouches[0].clientY;
                if (Math.abs(diff) < 30) return;

                const direction = diff > 0 ? 'forward' : 'backward';

                if (direction === 'forward') {
                    if (this.visibleCards < this.totalCards) {
                        this.animateCard('forward');
                    }
                } else {
                    if (this.scrollArea && this.scrollArea.scrollTop > 0) return;
                    if (this.cardsComplete) {
                        this.cardsComplete = false;
                        this.animateCard('backward');
                    } else if (this.visibleCards > 1) {
                        this.animateCard('backward');
                    }
                }
            }, { passive: true });
        }

        animateCard(direction) {
            if (this.isAnimating) return;

            const current = this.visibleCards;
            if (direction === 'forward' && current >= this.totalCards) return;
            if (direction === 'backward' && current <= 1) return;

            this.isAnimating = true;
            this.animDirection = direction;
            const startTime = performance.now();

            if (direction === 'backward') {
                const prev = current - 1;
                this.visibleCards = prev;
                this.animProgress = 1;
            }

            const animate = (timestamp) => {
                const elapsed = timestamp - startTime;
                const rawProgress = Math.min(elapsed / CARD_ANIMATION_DURATION, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - rawProgress, 3);

                if (direction === 'forward') {
                    this.animProgress = eased;
                } else {
                    this.animProgress = 1 - eased;
                }

                this.render();

                if (rawProgress < 1) {
                    this.animFrame = requestAnimationFrame(animate);
                } else {
                    if (direction === 'forward') {
                        const next = current + 1;
                        this.visibleCards = next;
                        this.animProgress = 0;
                        if (next >= this.totalCards) {
                            this.cardsComplete = true;
                            if (this.scrollArea) {
                                this.scrollArea.style.overflowY = 'auto';
                            }
                        }
                    } else {
                        this.animProgress = 0;
                        if (this.cardsComplete) {
                            this.cardsComplete = false;
                            if (this.scrollArea) {
                                this.scrollArea.style.overflowY = 'hidden';
                            }
                        }
                    }
                    this.animDirection = null;
                    this.isAnimating = false;
                    this.animFrame = null;
                    this.render();
                }
            };

            this.animFrame = requestAnimationFrame(animate);
        }

        getCardState(index) {
            const revealed = this.visibleCards;
            const visibleWhenCovered = 105;
            const offScreenY = 700;

            const isFullyRevealed = index < revealed;
            const isAnimatingCard = index === revealed && this.animProgress > 0;
            const isHidden = index > revealed && !(index === revealed && this.animProgress > 0);

            if (isHidden && !isAnimatingCard) {
                return { y: offScreenY, widthPercent: 100, visible: false };
            }

            // Stack Y: how many cards are stacked above this one
            let stackY = index * visibleWhenCovered;

            // Width: shrinks based on how many cards are overlapping this one
            let totalShrink = 0;
            for (let j = index + 1; j < this.totalCards; j++) {
                if (j < revealed) {
                    totalShrink += 4;
                } else if (j === revealed && this.animProgress > 0) {
                    totalShrink += this.animProgress * 4;
                }
            }
            const widthPercent = 100 - totalShrink;

            if (isFullyRevealed) {
                return { y: stackY, widthPercent, visible: true };
            }

            if (isAnimatingCard) {
                const y = stackY + (1 - this.animProgress) * offScreenY;
                return { y, widthPercent: 100, visible: true };
            }

            return { y: offScreenY, widthPercent: 100, visible: false };
        }

        render() {
            this.cards.forEach((card, index) => {
                const state = this.getCardState(index);

                if (!state.visible) {
                    card.style.display = 'none';
                } else {
                    card.style.display = 'block';
                    const horizontalPad = (100 - state.widthPercent) / 2;
                    card.style.left = `${horizontalPad}%`;
                    card.style.right = `${horizontalPad}%`;
                    card.style.transform = `translateY(${state.y}px)`;
                    card.style.zIndex = index + 1;
                }
            });
        }

        destroy() {
            if (this.animFrame) {
                cancelAnimationFrame(this.animFrame);
            }
        }
    }

    // Initialize on DOM ready
    function init() {
        const containers = document.querySelectorAll('.oga-services-cards');
        containers.forEach(container => {
            new ServicesCards(container);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
