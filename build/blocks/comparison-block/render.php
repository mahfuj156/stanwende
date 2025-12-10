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
$buttonUrl = $attributes['buttonUrl'] ?? '#'; 



$sectionClass = $attributes['sectionClass'] ?? 'mx-auto py-20';
$sectionColor = $attributes['sectionColor'] ?? '#F3F7F4';
$paddingTop = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$sectionMarginTop = $attributes['sectionMarginTop'] ?? 0;
$maxContainerWidth = $attributes['maxContainerWidth'] ?? 1312;

?>
 
<section 
    class="py-14 md:py-20 scroll-animate scroll-hidden"
    style="background-color: <?= esc_attr($sectionColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem; margin-top: <?= esc_attr($sectionMarginTop);  ?>px;"
>
<div class="max-w-container-wide mx-auto px-4 md:px-6  py-8" style="max-width: <?= esc_attr($maxContainerWidth); ?>px;">

        <?php if($title): ?>
        <h2 class="text-h46 md:text-h46 font-bold leading-114 text-center mb-10">
            <?= wp_kses_post($title); ?>
        </h2>
        <?php endif;  ?>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12">

            <!-- LEFT COLUMN -->
            <div class="bg-white rounded-xl p-4 md:p-6 shadow">
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
             
            <div class="bg-white rounded-xl  p-4 md:p-6 shadow">
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
       <?php if($extraText): ?>
            <p class="text-center mt-10 text-p16 opacity-80">
                <?= wp_kses_post($extraText); ?>
            </p>
        <?php endif; ?>

        <?php if($buttonText): ?>
        <div class="flex justify-center mt-4"> 
              <a 
                    class="inline-block bg-primary hover:bg-green-1 text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center"
                    href=" <?= wp_kses_post($buttonUrl); ?>"
                >
                    <?= wp_kses_post($buttonText); ?>
                </a> 
        </div>
        <?php endif; ?>

    </div>
</section>
