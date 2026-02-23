<div class="oga-home-animation" style="position: fixed; inset: 0; overflow: hidden; cursor: default; user-select: none; background-color: white;">
    
    <!-- Section 1: White background with OPEN [door] GATE -->
    <div class="oga-section-1" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        
        <!-- Main text with door shape -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
            <span class="oga-text" style="font-size: 5rem; font-weight: 900; letter-spacing: -0.025em; color: black;">
                OPEN
            </span>

            <!-- 3D Door Shape Container -->
            <div class="oga-door-shape" style="perspective: 150px; perspective-origin: center center; z-index: 10;">
                <div style="transform-style: preserve-3d; width: 120px; height: 92px; position: relative;">
                    <!-- Left Door -->
                    <div class="oga-door-left" style="position: absolute; left: 0; top: 0; width: 50%; height: 100%; background-color: black; transform-origin: left center; backface-visibility: visible;"></div>
                    
                    <!-- Right Door -->
                    <div class="oga-door-right" style="position: absolute; right: 0; top: 0; width: 50%; height: 100%; background-color: black; transform-origin: right center; backface-visibility: visible;"></div>
                </div>
            </div>

            <span class="oga-text" style="font-size: 5rem; font-weight: 900; letter-spacing: -0.025em; color: black;">
                GATE
            </span>
        </div>

        <!-- Scroll indicator -->
        <div class="oga-scroll-indicator" style="position: absolute; bottom: 3rem; display: flex; align-items: center; justify-content: center;">
            <div style="width: 1.5rem; height: 1.5rem; border: 1px solid rgba(0, 0, 0, 0.3); border-radius: 9999px; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 0.75rem; height: 0.75rem; color: rgba(0, 0, 0, 0.5); animation: bounce 1s infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
            </div>
        </div>
    </div>

    <!-- Section 2: Black background with OPEN GATE title, subtitle, and video -->
    <div class="oga-section-2" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; padding-top: 2.5rem; padding-left: 1rem; padding-right: 1rem; opacity: 0;">
        
        <!-- Text section -->
        <div class="oga-text-section" style="position: relative; z-index: 10;">
            <!-- Main heading -->
            <h1 style="font-size: 10vw; font-weight: 700; letter-spacing: -0.025em; color: white; line-height: 1; text-align: center;">
                OPEN GATE
            </h1>

            <!-- Subtitle row -->
            <div style="display: flex; align-items: center; justify-content: center; width: 100%; max-width: 64rem; margin-top: 1rem; margin-left: auto; margin-right: auto;">
                <span style="color: rgba(255, 255, 255, 0.6); font-size: 1rem; letter-spacing: 0.1em;">
                    <?php echo esc_html(explode(' ', $atts['highlight'])[0]); ?>
                </span>
                <div style="flex: 1; height: 1px; background-color: rgba(255, 255, 255, 0.3); margin-left: 2rem; margin-right: 2rem;"></div>
                <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.5rem; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 9999px; color: white; font-size: 0.875rem; letter-spacing: 0.1em; white-space: nowrap; cursor: pointer; background: transparent; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
                    <?php echo esc_html($atts['cta']); ?>
                    <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </button>
                <div style="flex: 1; height: 1px; background-color: rgba(255, 255, 255, 0.3); margin-left: 2rem; margin-right: 2rem;"></div>
                <span style="color: rgba(255, 255, 255, 0.6); font-size: 1rem; letter-spacing: 0.1em;">
                    <?php echo esc_html(explode(' ', $atts['highlight'])[1]); ?>
                </span>
            </div>
        </div>

        <!-- Video section -->
        <div class="oga-video-section" style="position: relative; width: 100%; max-width: 72rem; flex: 1; margin-top: 1.5rem; margin-bottom: 1rem; border-radius: 0.5rem; overflow: hidden;">
            <!-- Video thumbnail -->
            <div style="width: 100%; height: 100%; background: linear-gradient(to bottom right, #262626, #171717); display: flex; align-items: center; justify-content: center;">
                <span style="color: #525252; font-size: 0.875rem;">Video Thumbnail</span>
            </div>
            <!-- Play button -->
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                <div style="width: 6rem; height: 6rem; background-color: rgba(0, 0, 0, 0.3); backdrop-filter: blur(4px); border-radius: 9999px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.2); transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='rgba(0,0,0,0.4)'" onmouseout="this.style.backgroundColor='rgba(0,0,0,0.3)'">
                    <svg style="width: 2.5rem; height: 2.5rem; color: white; margin-left: 0.25rem;" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Progress dots -->
    <div style="position: fixed; top: 2rem; right: 2rem; z-index: 20; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="oga-progress-dot" style="height: 0.5rem; width: 0.5rem; border-radius: 9999px; background-color: #000; transition: all 0.3s;"></div>
        <div class="oga-progress-dot" style="height: 0.5rem; width: 0.5rem; border-radius: 9999px; background-color: #000; opacity: 0.3; transition: all 0.3s;"></div>
    </div>
</div>

<style>
@keyframes bounce {
    0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}

@media (min-width: 768px) {
    .oga-home-animation .oga-text {
        font-size: 7rem !important;
    }
}

@media (min-width: 1024px) {
    .oga-home-animation .oga-text {
        font-size: 8rem !important;
    }
}
</style>
