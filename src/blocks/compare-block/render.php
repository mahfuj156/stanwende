<?php
$title      = $attributes['title'] ?? ''; 
$subtitle      = $attributes['subtitle'] ?? ''; 
$buttonText      = $attributes['buttonText'] ?? ''; 
$buttonUrl      = $attributes['buttonUrl'] ?? ''; 
$items      = $attributes['items'] ?? [];
?>

<section class="py-16 bg-bg4">
    <div class="max-w-container-wide mx-auto px-4 gap-y-12">
        <h2 class="text-3xl md:text-4xl font-bold text-center   mb-16">
            <?= wp_kses_post($title); ?>
        </h2>

        <div class="columns-1 sm:columns-2 md:columns-3 gap-x-12  gap-y-12 items-stretch">
            <?php foreach ($items as $item): ?>
                <div class="bg-white rounded-xl p-6 mb-12 shadow flex flex-col h-full after-beforeblock">
                    <!-- avatar and name inline, centered -->
                    <div class="text-center mb-4" style="    margin-top: -46px;">
                        <span class="inline-flex items-center bg-white px-4 py-1 rounded-full font-semibold text-lg">
                            <?php if (!empty($item['avatar'])): ?>
                                <img src="<?= esc_url($item['avatar']); ?>"
                                     class="w-8 h-8 rounded-full mr-3 object-cover border-2 border-white shadow-sm"
                                     alt="<?= esc_attr($item['name'] ?? '') ?>" />
                            <?php endif; ?>
                            <?= esc_html($item['name'] ?? ''); ?>
                        </span>
                    </div>

                    <div class="text-info text-p18 leading-140 mt-2">
                        <p class="text-warning  text-p16   leading-150 mb-3">
                            <i class="fa-regular fa-circle-xmark mr-2"></i>
                            <?= wp_kses_post($item['before']); ?>
                        </p>
                        <p class="text-info text-p16   leading-150">
                            <i class="fa-regular fa-circle-check mr-2"></i>
                            <?= wp_kses_post($item['after']); ?>
                        </p>
                    </div>
                </div>
            <?php endforeach; ?>
         </div>


            <p class="text-center text-gray-600 mb-6 max-w-2xl mx-auto mt-10">
            <?= wp_kses_post($subtitle); ?>
        </p>

        <!-- Button to View All Reviews -->
        <div class="flex justify-center mb-10">
            <a 
                class="inline-block bg-primary text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center"
                href="<?= esc_url($buttonUrl); ?>"
            >
                <?= esc_html($buttonText); ?>  <i class="fa-solid fa-arrow-right-long pl-3"></i>
            </a>
        </div>

    </div>
</section>
