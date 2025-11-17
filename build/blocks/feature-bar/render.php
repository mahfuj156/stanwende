<?php
$items = $attributes['items'] ?? [];
$logos = $attributes['logos'] ?? [];
$sectionClass = $attributes['sectionClass'] ?? 'container mx-auto py-10 bg-white rounded-xl';
?>

<section class="<?= esc_attr($sectionClass); ?> relative -mt-[100px] z-50" style="margin-top: -78px;">
  
                <div class="max-w-container-wide mx-auto feature-bar-box bg-white rounded-xl px-6 ">
                <div >
    <div class="flex flex-col  gap-6 justify-center items-center   py-6 ">

            <!-- Feature Items -->
            <div class="flex flex-col md:flex-row md:items-center gap-8 text-center">
                <?php foreach ($items as $item): ?>
                    <div class="flex items-center gap-2 text-lg">
                        <i class="<?= esc_attr($item['icon']); ?> text-green-600"></i>
                        <span><?= wp_kses_post($item['text']); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>

            <hr class="w-full border-gray-200" />

            <!-- Logos -->
            <div class="flex flex-wrap">
                <div class="text-center font-bold text-gray-700 ">
                    Bekend van:
                </div>

                <div class="flex flex-wrap justify-center gap-6">
                    <?php foreach ($logos as $logo): ?>
                        <img
                            src="<?= esc_url($logo['url']); ?>"
                            class=" object-contain  "
                        />
                    <?php endforeach; ?>
            </div>
            </div>
        </div>
        </div>
    </div>
</section>
