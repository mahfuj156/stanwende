<?php 

$title      = $attributes['title'] ?? '';
$leftTitle  = $attributes['leftTitle'] ?? '';
$rightTitle = $attributes['rightTitle'] ?? '';
 
$leftItems  = $attributes['leftItems'] ?? [];
$leftIcons  = $attributes['leftIcons'] ?? [];

$rightItems = $attributes['rightItems'] ?? [];
$rightIcons = $attributes['rightIcons'] ?? []; 

$extraText  = $attributes['extraText'] ?? '';
$buttonText = $attributes['buttonText'] ?? 'Button';
$bgColor    = $attributes['bgColor'] ?? '#F3F7F4';

?>
<section class="py-12 md:py-18 bg-bg1"  >
    <div class="max-w-container-medium mx-auto px-4 md:px-6  py-8"> 

        <h2 class="text-h46 md:text-h46 font-bold leading-114 text-center mb-10">
            <?= wp_kses_post($title); ?>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12">

            <!-- LEFT COLUMN -->
            <div class="bg-white rounded-xl p-6 md:p-8 shadow">
                <h3 class="font-semibold text-h22 leading-140 mb-4"><?= esc_html($leftTitle); ?></h3>

                <?php foreach ($leftItems as $i => $item): ?>
                    <p class="text-p16 mb-2 flex gap-2 items-start">
                        <?php if (!empty($leftIcons[$i])): ?>
                            <i class="<?= esc_attr($leftIcons[$i]); ?> text-red-500 mt-1"></i>
                        <?php endif; ?>
                        <span><?= wp_kses_post($item); ?></span>
                    </p>
                <?php endforeach; ?>
            </div>

            <!-- RIGHT COLUMN -->
            <div class="bg-white rounded-xl p-6 md:p-8 shadow">
                <h3 class="font-semibold text-h22  leading-140 mb-4"><?= esc_html($rightTitle); ?></h3>

                <?php foreach ($rightItems as $i => $item): ?>
                    <p class="text-p16 mb-2 flex gap-2 items-start">
                        <?php if (!empty($rightIcons[$i])): ?>
                            <i class="<?= esc_attr($rightIcons[$i]); ?> text-green-600 mt-1"></i>
                        <?php endif; ?>
                        <span><?= wp_kses_post($item); ?></span>
                    </p>
                <?php endforeach; ?>
            </div>

        </div>

        <p class="text-center mt-10 text-p16 opacity-80">
            <?= esc_html($extraText); ?>
        </p>

        <div class="flex justify-center mt-4"> 
              <a 
                    class="inline-block bg-primary text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center"
                    href="#"
                >
                    <?= esc_html($buttonText); ?>
                </a>


        </div>

    </div>
</section>
