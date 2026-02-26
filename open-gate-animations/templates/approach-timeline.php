<?php
// Get approach steps from Custom Post Type
// Falls back to hardcoded data if no CPT entries exist
$steps = oga_get_approach_steps();

// Fallback to default data if no steps found
if (empty($steps)) {
    $steps = array(
        array(
            'title' => 'DISCOVER',
            'boldPart' => 'WE DIVE DEEP INTO YOUR BRAND AND AUDIENCE, UNCOVER THE STORY WORTH ',
            'description' => 'TELLING AND HELP YOU SHAPE YOUR VISION',
            'image' => OGA_PLUGIN_URL . 'assets/images/approach-discover.jpg',
        ),
        array(
            'title' => 'CREATE',
            'boldPart' => 'FROM SCRIPTING AND PROJECT MANAGING LOGISTICS, THROUGH TO CREATIVE ',
            'description' => 'ON-SET PRODUCTION, WE SHAPE COMPELLING VISUALS THAT EMOTIONALLY RESONATE.',
            'image' => OGA_PLUGIN_URL . 'assets/images/approach-create.jpg',
        ),
        array(
            'title' => 'REFINE',
            'boldPart' => 'OUR POLISHED EDITING ELEVATES EVERY FRAME ',
            'description' => 'AND ALIGNS WITH YOUR MESSAGE AND GOALS.',
            'image' => OGA_PLUGIN_URL . 'assets/images/approach-refine.jpg',
        ),
        array(
            'title' => 'DELIVER',
            'boldPart' => 'HIGH-QUALITY ASSETS DELIVERED WITH PRECISION, READY TO MAKE AN ',
            'description' => 'IMPACT ACROSS ANY PLATFORM.',
            'image' => OGA_PLUGIN_URL . 'assets/images/approach-deliver.jpg',
        ),
    );
}
?>

<div class="oga-approach-timeline" style="height: 100vh; overflow-y: auto; background-color: #0a0a0a;">
    <div class="oga-scroll-area" style="height: 100vh; overflow-y: auto;">
        <div class="oga-section" style="min-height: 400vh;">
            <!-- Sticky container -->
            <div style="position: sticky; top: 0; height: 100vh; overflow: hidden;">
                <div style="height: 100%; display: flex; flex-direction: column; padding: 0.5rem 1.5rem;">
                    
                    <!-- Header -->
                    <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 0.75rem;">
                        <h1 style="font-size: 2.25rem; font-weight: 700; color: white; line-height: 0.95; letter-spacing: -0.025em;">
                            OUR<br>APPROACH
                        </h1>
                    </div>

                    <!-- Timeline content: Images | Timeline | Descriptions -->
                    <div style="flex: 1; display: flex; gap: 0; min-height: 0;">
                        
                        <!-- Left column: Image cards -->
                        <div style="display: flex; flex-direction: column; justify-content: space-between; width: 38%; gap: 0.125rem; padding: 0.125rem 0;">
                            <?php foreach ($steps as $index => $step): ?>
                            <div class="oga-timeline-step">
                                <div class="oga-image-card" style="position: relative; border-radius: 0.5rem; overflow: hidden; flex: 1; opacity: 0.4; transition: opacity 0.6s ease;">
                                    <img src="<?php echo esc_url($step['image']); ?>" alt="<?php echo esc_attr($step['title']); ?> phase" style="width: 100%; height: 100%; object-fit: cover;">
                                    <!-- Title overlay -->
                                    <div style="position: absolute; inset: 0 0 0 0; background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent); padding: 0.75rem;">
                                        <div style="position: absolute; bottom: 0.75rem; left: 0.75rem;">
                                            <span class="oga-image-title" style="font-size: 1.125rem; font-weight: 700; letter-spacing: 0.025em; color: #999; transition: color 0.6s ease;">
                                                <?php echo esc_html($step['title']); ?>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>

                        <!-- Center: Timeline line + dots -->
                        <div style="position: relative; width: 2.5rem; flex-shrink: 0;">
                            <!-- Background line (gray) -->
                            <div style="position: absolute; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); width: 1px; background-color: #404040;"></div>
                            <!-- Gold fill line -->
                            <div class="oga-timeline-fill" style="position: absolute; top: 0; left: 50%; width: 1px; transform-origin: top; background-color: #C8A24E; height: 100%; transform: translateX(-50%) scaleY(0);"></div>
                            <!-- Dots -->
                            <?php foreach ($steps as $index => $step): 
                                $yPos = ($index / count($steps)) * 100 + (100 / count($steps)) / 2;
                            ?>
                            <div class="oga-timeline-dot" style="position: absolute; left: 50%; width: 0.625rem; height: 0.625rem; border-radius: 9999px; border: 2px solid #525252; background-color: transparent; top: <?php echo $yPos; ?>%; transform: translate(-50%, -50%); transition: all 0.5s ease;"></div>
                            <?php endforeach; ?>
                        </div>

                        <!-- Right column: Descriptions -->
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 0.25rem 0;">
                            <?php foreach ($steps as $step): ?>
                            <div class="oga-timeline-step">
                                <div class="oga-description" style="display: flex; align-items: center; flex: 1; opacity: 0.3; transition: opacity 0.6s ease;">
                                    <p style="font-size: 0.75rem; line-height: 1.625; letter-spacing: 0.025em; text-transform: uppercase;">
                                        <span class="oga-bold-text" style="font-weight: 700; color: #666; transition: color 0.6s ease;">
                                            <?php echo esc_html($step['boldPart']); ?>
                                        </span>
                                        <span class="oga-normal-text" style="color: #444; transition: color 0.6s ease;">
                                            <?php echo esc_html($step['description']); ?>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <!-- Bottom button -->
                    <div style="display: flex; justify-content: center; margin-top: 0.75rem;">
                        <button style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: 1px solid #525252; border-radius: 9999px; color: #a3a3a3; font-size: 0.75rem; letter-spacing: 0.1em; background: transparent; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.backgroundColor='#262626'; this.style.color='white';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#a3a3a3';">
                            VIEW ABOUT US
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

<style>
@media (min-width: 768px) {
    .oga-approach-timeline h1 {
        font-size: 3rem !important;
    }
    .oga-approach-timeline .oga-image-title {
        font-size: 1.25rem !important;
    }
    .oga-approach-timeline .oga-description p {
        font-size: 0.875rem !important;
    }
    .oga-approach-timeline button {
        font-size: 0.875rem !important;
    }
}

@media (min-width: 1024px) {
    .oga-approach-timeline h1 {
        font-size: 3.75rem !important;
    }
    .oga-approach-timeline .oga-image-title {
        font-size: 1.5rem !important;
    }
    .oga-approach-timeline .oga-description p {
        font-size: 1rem !important;
    }
}
</style>
