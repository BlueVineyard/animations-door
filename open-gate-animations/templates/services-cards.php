<?php
// Service cards data
$services = array(
    array(
        'title' => "CORPORATE VIDEOS\nAND BRANDED FILMS",
        'number' => '01',
        'image' => OGA_PLUGIN_URL . 'assets/images/service-corporate.jpg',
        'description' => 'We dive deep into your brand, audience, and vision to uncover the story worth telling.',
    ),
    array(
        'title' => "CREATIVE AGENCY\nPARTNERSHIPS",
        'number' => '02',
        'image' => OGA_PLUGIN_URL . 'assets/images/service-agency.jpg',
        'description' => 'We dive deep into your brand, audience, and vision to uncover the story worth telling.',
    ),
    array(
        'title' => "SOCIAL & DIGITAL\nCONTENT",
        'number' => '03',
        'image' => OGA_PLUGIN_URL . 'assets/images/service-social.jpg',
        'description' => 'We dive deep into your brand, audience, and vision to uncover the story worth telling.',
    ),
    array(
        'title' => 'ANIMATION',
        'number' => '04',
        'image' => OGA_PLUGIN_URL . 'assets/images/service-animation.jpg',
        'description' => 'We dive deep into your brand, audience, and vision to uncover the story worth telling.',
    ),
);
?>

<div class="oga-services-cards" style="height: 100vh; overflow: hidden; background-color: #0a0a0a;">
    <div class="oga-scroll-area" style="height: 100%; overflow-y: hidden;">
        
        <!-- Cards section -->
        <div style="height: 100vh; display: flex; flex-direction: column; padding: 1.5rem 1.25rem; flex-shrink: 0;">
            
            <!-- Header -->
            <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 2.5rem;">
                <h1 style="color: white; line-height: 0.95; letter-spacing: -0.025em;">
                    <span style="display: block; font-size: 1.875rem; font-weight: 300;">OUR</span>
                    <span style="display: block; font-size: 2.25rem; font-weight: 700;">SERVICES</span>
                </h1>
            </div>

            <!-- Stacking cards area -->
            <div style="position: relative; flex: 1;">
                <?php foreach ($services as $index => $service): ?>
                <div class="oga-service-card" style="position: absolute; top: 0; transition: transform 0.1s ease-out;">
                    <div style="background: linear-gradient(to bottom right, #e5e5e5, #f5f5f5, rgba(229, 229, 229, 0.8)); border-radius: 1rem; padding: 1.25rem; display: flex; gap: 1rem; height: 200px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);">
                        
                        <!-- Left: title, description, button -->
                        <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-width: 0;">
                            <h2 style="color: #171717; font-size: 1.25rem; font-weight: 700; letter-spacing: 0.025em; line-height: 1.25; white-space: pre-line;">
                                <?php echo esc_html($service['title']); ?>
                            </h2>
                            <div>
                                <p style="color: #525252; font-size: 0.75rem; line-height: 1.625; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                    <?php echo esc_html($service['description']); ?>
                                </p>
                                <button style="margin-top: 0.75rem; display: flex; align-items: center; gap: 0.375rem; padding: 0.5rem 1rem; background-color: #171717; border-radius: 9999px; color: white; font-size: 0.625rem; letter-spacing: 0.05em; border: none; cursor: pointer;">
                                    VIEW DETAIL
                                    <svg style="width: 0.75rem; height: 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke-width="1.5"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v8m-4-4h8"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Right: image + number -->
                        <div style="position: relative; width: 45%; border-radius: 0.75rem; overflow: hidden; flex-shrink: 0;">
                            <img src="<?php echo esc_url($service['image']); ?>" alt="<?php echo esc_attr(str_replace('\n', ' ', $service['title'])); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                            <!-- Number overlay -->
                            <div style="position: absolute; top: 0.5rem; right: 0.75rem; font-size: 1.875rem; font-weight: 700; color: rgba(255, 255, 255, 0.8); filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04));">
                                <?php echo esc_html($service['number']); ?>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Next section - scrollable after all cards revealed -->
        <div style="min-height: 100vh; background-color: #171717; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem;">
            <h2 style="font-size: 2.25rem; font-weight: 700; color: white; letter-spacing: -0.025em; text-align: center;">
                Ready for more?
            </h2>
            <p style="margin-top: 1.5rem; color: #a3a3a3; font-size: 1.125rem; max-width: 42rem; text-align: center; line-height: 1.625;">
                This section scrolls naturally after all service cards have been revealed.
            </p>
        </div>
    </div>
</div>

<style>
@media (min-width: 768px) {
    .oga-services-cards .oga-service-card > div {
        height: 240px !important;
        padding: 1.5rem !important;
        gap: 1.5rem !important;
    }
    .oga-services-cards h1 span:first-child {
        font-size: 2.25rem !important;
    }
    .oga-services-cards h1 span:last-child {
        font-size: 3rem !important;
    }
    .oga-services-cards h2 {
        font-size: 1.5rem !important;
    }
    .oga-services-cards p {
        font-size: 0.875rem !important;
    }
    .oga-services-cards button {
        font-size: 0.75rem !important;
    }
    .oga-services-cards .oga-service-card .number {
        font-size: 2.25rem !important;
    }
}

@media (min-width: 1024px) {
    .oga-services-cards .oga-service-card > div {
        height: 260px !important;
    }
    .oga-services-cards h1 span:first-child {
        font-size: 3rem !important;
    }
    .oga-services-cards h1 span:last-child {
        font-size: 3.75rem !important;
    }
    .oga-services-cards h2 {
        font-size: 1.875rem !important;
    }
    .oga-services-cards .oga-service-card > div {
        padding: 1.5rem 2.5rem !important;
    }
}
</style>
