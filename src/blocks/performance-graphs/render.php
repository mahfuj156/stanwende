<?php
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? ''; 
$items = $attributes['items'] ?? [];
$columns = $attributes['columns'] ?? 1;

$sectionColor = $attributes['sectionColor'] ?? '#ffffff';
$paddingTop = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$titleFontSize = $attributes['titleFontSize'] ?? 46;
$subtitleFontSize = $attributes['subtitleFontSize'] ?? 16;


$buttonText      = $attributes['buttonText'] ?? ''; 
$buttonUrl      = $attributes['buttonUrl'] ?? '';
$bottomLabels = $attributes['bottomLabels'] ?? [];

if (!is_array($items)) $items = [];
?>

<section class="py-16 bg-bg2" style="background-color: <?= esc_attr($sectionColor); ?>;  padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem;">

  <div class="max-w-7xl mx-auto px-4">


   <?php if ($heading): ?>
            <h2 class="text-38 font-bold text-custom-black text-left mb-3" style="font-size: <?= esc_attr($titleFontSize); ?>px;">
                <?= wp_kses_post($heading); ?>
            </h2>
        <?php endif; ?>

        <?php if ($subheading): ?>
            <p class="text-left text-p16 text-505250 mb-8  mx-auto  text-custom-black " style="font-size: <?= esc_attr($subtitleFontSize); ?>px;">
                <?= wp_kses_post($subheading); ?>
              
            </p>
        <?php endif; ?>

           
    <div class="grid gap-12 <?= $columns === 1 ? 'grid-cols-1' : ($columns === 2 ? 'grid-cols-2' : 'grid-cols-3'); ?>">
      <?php foreach ($items as $item): ?>
        <div class="   rounded-18 overflow-hidden  py-4">


         <!-- Icon -->
                    <?php  if (!empty($item['iconImage']['url'])): ?>
                        <img 
                            src="<?= esc_url($item['iconImage']['url']); ?>" 
                           class="w-full h-auto rounded-2xl mb-4" 
                            alt="icon"
                        />
                    <?php endif; ?> 

          <?php if (!empty($item['title'])): ?>
            <div class="   border-l-2 text-060806 text-p14 leading-150 px-3"><?= esc_html($item['title']); ?></div>
          <?php endif; ?>

        </div>
      <?php endforeach; ?>
    </div>



    
        <!-- Button -->
         <?php  if(!empty($buttonText)): ?>
        <div class="flex justify-center mt-12">
            <a class="inline-block bg-primary hover:bg-green-1 text-white px-5 py-3 text-p16 no-underline rounded-12 shadow-btn-primary text-center"
                href="<?= esc_url($buttonUrl); ?>">
                <?= esc_html($buttonText); ?>
            </a>
        </div>
        <?php endif; ?>

        <!-- Bottom Labels -->
        <div class="flex justify-center gap-4 mt-4 text-gray-600 text-sm flex-wrap">
            <?php foreach ($bottomLabels as $label): ?>
                <div class="flex items-center gap-2 text-p-14 leading-150">
                    <i class="fa-regular fa-circle-check border-green-500 text-green-600 text-md"></i>
                    <?= esc_html($label); ?>
                </div>
            <?php endforeach; ?>
        </div>


        
  </div>
</section>
