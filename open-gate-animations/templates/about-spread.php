<div class="oga-about-spread" style="height: 100vh; overflow-y: auto; background-color: #0a0a0a;">
    <div class="oga-scroll-area" style="height: 100vh; overflow-y: auto;">
        <div class="oga-section" style="min-height: 250vh;">
            <!-- Sticky section -->
            <div style="position: sticky; top: 0; height: 100vh; overflow: hidden;">
                <div style="height: 100%; display: flex; align-items: center; padding: 0 1.5rem;">
                    <div style="display: flex; align-items: center; width: 100%; max-width: 80rem; margin: 0 auto;">
                        
                        <!-- Left: Title -->
                        <div style="flex-shrink: 0; width: 30%;">
                            <h1 style="font-size: 3rem; font-weight: 900; color: white; line-height: 0.92; letter-spacing: -0.025em;">
                                <span style="display: block;"><?php echo esc_html($atts['title']); ?></span>
                            </h1>
                        </div>

                        <!-- Center: Image cluster -->
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
                            <div style="position: relative; width: 400px; height: 340px;">
                                <!-- Image 1 (Left) -->
                                <div class="oga-image" style="position: absolute; width: 160px; height: 210px; left: 50%; top: 50%; margin-left: -80px; margin-top: -105px; border-radius: 0.375rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); transition: transform 0.1s ease-out; z-index: 1;">
                                    <img src="<?php echo esc_url($atts['image1']); ?>" alt="About image 1" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                
                                <!-- Image 2 (Center) -->
                                <div class="oga-image" style="position: absolute; width: 160px; height: 210px; left: 50%; top: 50%; margin-left: -80px; margin-top: -105px; border-radius: 0.375rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); transition: transform 0.1s ease-out; z-index: 3;">
                                    <img src="<?php echo esc_url($atts['image2']); ?>" alt="About image 2" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                
                                <!-- Image 3 (Right) -->
                                <div class="oga-image" style="position: absolute; width: 160px; height: 210px; left: 50%; top: 50%; margin-left: -80px; margin-top: -105px; border-radius: 0.375rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); transition: transform 0.1s ease-out; z-index: 2;">
                                    <img src="<?php echo esc_url($atts['image3']); ?>" alt="About image 3" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                            </div>
                        </div>

                        <!-- Right: Description + CTA -->
                        <div class="oga-description" style="flex-shrink: 0; width: 22%; display: flex; flex-direction: column; gap: 2rem; opacity: 0.3; transition: opacity 0.3s ease-out;">
                            <p style="color: #a3a3a3; font-size: 0.875rem; line-height: 1.625;">
                                <?php echo esc_html($atts['description']); ?>
                            </p>
                            <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; border: 1px solid #525252; border-radius: 9999px; color: #d4d4d4; font-size: 0.75rem; letter-spacing: 0.1em; background: transparent; cursor: pointer; transition: all 0.3s; width: fit-content; align-self: flex-end;" onmouseover="this.style.backgroundColor='#262626'; this.style.color='white';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#d4d4d4';">
                                <?php echo esc_html($atts['cta']); ?>
                                <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke-width="1.5"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v8m-4-4h8"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
@media (min-width: 768px) {
    .oga-about-spread h1 {
        font-size: 3.75rem !important;
    }
}

@media (min-width: 1024px) {
    .oga-about-spread h1 {
        font-size: 4.5rem !important;
    }
}

@media (min-width: 1280px) {
    .oga-about-spread h1 {
        font-size: 5.5rem !important;
    }
}
</style>
