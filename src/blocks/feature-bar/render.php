<?php
$items = $attributes['items'] ?? [];
$logos = $attributes['logos'] ?? [];
$sectionClass = $attributes['sectionClass'] ?? 'container mx-auto py-10 bg-white rounded-xl';
?>

<section class="<?= esc_attr($sectionClass); ?> relative custom-neg-mt z-50 px-4 md:px-0">

    <div class="max-w-container-wide mx-auto feature-bar-box bg-white rounded-xl px-4 sm:px-6 md:px-10 py-8"> 
        <div class="flex flex-col gap-8 text-center">

            <!-- Feature Items -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-center gap-6">

                <?php foreach ($items as $item): ?>
                    <div class="flex items-start gap-3 text-left md:text-center">
                        <i class="<?= esc_attr($item['icon']); ?> text-green-600 text-xl"></i>
                        <span class="text-base sm:text-lg leading-snug">
                            <?= wp_kses_post($item['text']); ?>
                        </span>
                    </div>
                <?php endforeach; ?>

            </div>

            <hr class="w-full border-gray-200" />

            <!-- Logos -->
            <div class="flex flex-col items-center gap-4">

                <div class="text-center font-bold text-gray-700">
                    Bekend van:
                </div>

               <div class="mobile-logos">
                    <?php foreach ($logos as $logo): ?>
                        <div class="mobile-logo-item">
                            <img src="<?= esc_url($logo['url']); ?>" class="h-6 sm:h-8 object-contain" />
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        </div>

    </div>

</section>