<?php 

$eyebrow       = $attributes['eyebrow'] ?? '';
$title         = $attributes['title'] ?? '';
$subtitle         = $attributes['subtitle'] ?? '';
$description   = $attributes['description'] ?? '';
$stat1         = $attributes['stat1'] ?? '';
$stat1_label   = $attributes['stat1_label'] ?? '';
$stat2         = $attributes['stat2'] ?? '';
$stat2_label   = $attributes['stat2_label'] ?? '';
$chartUrl      = $attributes['chartUrl'] ?? ''; 
$subtitleIcon      = $attributes['subtitleIcon'] ?? ''; 
$sectionColor  = $attributes['sectionColor'] ?? '#E4ECE5';
$paddingTop    = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$titleFontSize = $attributes['titleFontSize'] ?? 38;
$subtitleFontSize = $attributes['subtitleFontSize'] ?? 16;
$imagePosition = $attributes['imagePosition'] ?? 'right';
$bullets = $attributes['bullets'] ?? [];

$buttonText          = $attributes['buttonText'];
$buttonUrl           = $attributes['buttonUrl'] ?? '#';
$secondaryButtonText = $attributes['secondaryButtonText'];
$secondaryButtonUrl  = $attributes['secondaryButtonUrl'] ?? '#';
$maxContainerWidth   = $attributes['maxContainerWidth'] ?? '';
$eyebrowIcon   = $attributes['eyebrowIcon'] ?? '';
 $bulletIcons = $attributes['bulletIcons'] ?? [];

$cols = $attributes['columns'] ?? 3;

$gridClass =
    $cols == 1 ? 'grid grid-cols-1' :
    ($cols == 2 ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2' :
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3');
?>
 <section 
    class="py-14 md:py-20 scroll-animate scroll-hidden"
    style="background-color: <?= esc_attr($sectionColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem;"
>
<div class="max-w-container-wide mx-auto px-4 md:px-6" style="max-width: <?= esc_attr($maxContainerWidth); ?>px;">

<div class="<?= esc_attr($gridClass); ?> gap-16 md:gap-16 items-center">




<?php  if($imagePosition == 'left'): ?>

<!-- IMAGE (mobile first → order 2, desktop → order 1) -->
       <?php if ($chartUrl): ?>
    <div class="order-1 md:order-1 w-full">
        <div class="rounded-xl   p-4 flex items-center justify-center">
            <?php if ($chartUrl): ?>
                <img 
                    src="<?= esc_url($chartUrl); ?>" 
                    alt="Chart" 
                    class="object-contain w-full h-auto rounded-xl"
                />
            <?php else: ?>
                <div class="text-gray-400"> </div>
            <?php endif; ?>
        </div>
    </div>
     <?php endif; ?>
     

       <!-- TEXT (mobile first → order 1, desktop → order 2) -->
    <div class="order-2 md:order-2 w-full">

      <?php if ($eyebrow): ?>
          <div class="text-p16 text-primary font-semibold mb-2">
              <?= esc_html($eyebrow); ?>
          </div>
      <?php endif; ?>

      <?php if ($title): ?>
          <h2 class="text-h46 md:text-h46 font-bold leading-114 mb-4" style="font-size: <?= esc_attr($titleFontSize); ?>px;">
              <?= wp_kses_post($title); ?>
          </h2>
      <?php endif; ?>

        <?php if ($subtitle): ?>
        <p class="text-info text-h18 font-bold leading-150 mb-4 flex items-center  gap-3"  style="font-size: <?= esc_attr($subtitleFontSize); ?>px;">
            <span>
           <?php if ($subtitleIcon): ?>
                <img 
                    src="<?= esc_url($subtitleIcon); ?>" 
                    alt="Chart" 
                    class=" "
                /> 
            <?php endif; ?>
           </span>
                 <span>
            <?= wp_kses_post($subtitle); ?>
           </span>

         </p>
        <?php endif; ?>

      <?php if ($description): ?>
          <p class="mb-6 text-p18 text-secondary leading-150">
              <?= wp_kses_post($description); ?>
          </p>
      <?php endif; ?>


    <?php if (!empty($bullets)): ?>
        <ul class="list-disc space-y-1 mt-6">
        <?php foreach ($bullets as $index => $item): ?>
            <li class="flex items-center text-p16">
                
                     <?php  if (!empty($item['iconImage']['url'])): ?>
                            <span class="text-green-light mr-2">
                        <img 
                        src="<?= esc_url($item['iconImage']['url']); ?>" 
                        class="  " 
                        alt="icon"
                    /> 
                </span> 
                    <?php
                    endif; ?> 
                    
                 
                     <?php if (!empty($item['title'])): ?>
                                       <span>
                                        <?php if($item['link']): ?>
                                             <a href="<?= esc_url($item['link']); ?>"> <?php endif; ?> 
                                            <?= wp_kses_post($item['title']); ?>
                                             <?php if($item['link']): ?></a> <?php endif; ?> 
                                        </span> 
          <?php endif; ?>

            </li>
        <?php endforeach; ?>
    </ul>
    <?php endif; ?>
    

      <div class="flex flex-wrap gap-12  items-start mb-8">
        <?php if($stat1 || $stat1_label): ?>
          <div class='space-y-2'>
              <?php if($stat1): ?><div><h3  class="text-h38 md:text-h46  font-manrope font-bold leading-114 text-info"><?= esc_html($stat1); ?></h3></div>  <?php endif; ?>
               <?php if($stat1_label): ?>    <div class="text-p16 text-secondary font-lora leading-150"><?= esc_html($stat1_label); ?></div>  <?php endif; ?>
          </div>
           <?php endif; ?>
            <?php if($stat2 || $stat2_label): ?>
            <div  class='space-y-2'>
                <?php if($stat2): ?><div > <h3  class="text-h38 md:text-h46  font-manrope font-bold leading-114 text-info"><?= esc_html($stat2); ?></h3></div>  <?php endif; ?>
                <?php if($stat2_label): ?><div class="text-p16 text-secondary  font-lora leading-150"><?= esc_html($stat2_label); ?></div>  <?php endif; ?>
            </div>
            <?php endif; ?>
      </div>
        
      <?php if($buttonText || $secondaryButtonText): ?>

       <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <?php if($buttonText): ?>
                <a 
                    class="inline-block bg-primary hover:bg-green-1 text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center button-icon"
                    href="<?= esc_url($buttonUrl); ?>"
                > 
                <?= wp_kses_post($buttonText); ?>
                </a>
            <?php endif; ?>
            <?php if($secondaryButtonText): ?>
                <a 
                    class="inline-block text-primary  hover:bg-green-1 hover:shadow-btn-primary hover:text-white rounded-12 font-semibold no-underline px-3 py-3 text-p16 text-center button-icon"
                    href="<?= esc_url($secondaryButtonUrl); ?>"
                >
                <?= wp_kses_post($secondaryButtonText); ?>
                </a>
            <?php endif; ?>
            </div>
        <?php endif; ?>

    </div>


    
<?php else: ?>
    <!-- TEXT (mobile first → order 1, desktop → order 2) -->
    <div class="order-1 md:order-1 w-full">


    
            <?php if ($eyebrowIcon): ?>
                 <img 
                    src="<?= esc_url($eyebrowIcon[0]['url']); ?>" 
                    class="mb-4 rounded-xl w-full break-inside-avoid"
                />
            <?php endif; ?>

      <?php if ($eyebrow): ?>
          <div class="text-h16 text-primary font-semibold mb-2">
              <?= esc_html($eyebrow); ?>
          </div>
      <?php endif; ?>

      <?php if ($title): ?>
          <h2 class="text-h46 md:text-h46 font-bold leading-114 mb-4" style="font-size: <?= esc_attr($titleFontSize); ?>px;">
              <?= wp_kses_post($title); ?>
          </h2>
      <?php endif; ?>

        <?php if ($subtitle): ?>
        <p class="text-info text-h18 font-bold leading-150 mb-4 flex items-center gap-3"  style="font-size: <?= esc_attr($subtitleFontSize); ?>px;">
            <span>
           <?php if ($subtitleIcon): ?>
                <img 
                    src="<?= esc_url($subtitleIcon); ?>" 
                    alt="Chart" 
                    class=" "
                /> 
            <?php endif; ?>
           </span>
                 <span>
            <?= wp_kses_post($subtitle); ?>
           </span>

         </p>
        <?php endif; ?>

      <?php if ($description): ?>
          <p class="mb-6 text-p18 text-secondary leading-150">
              <?= wp_kses_post($description); ?>
          </p>
      <?php endif; ?>


    
    <?php if (!empty($bullets)): ?>
        <ul class="list-disc space-y-1 mt-6">
        <?php foreach ($bullets as $index => $item): ?>
            <li class="flex items-center text-p16">
                
                     <?php  if (!empty($item['iconImage']['url'])): ?>
                            <span class="text-green-light mr-2">
                        <img 
                        src="<?= esc_url($item['iconImage']['url']); ?>" 
                        class="  " 
                        alt="icon"
                    /> 
                </span> 
                    <?php
                    endif; ?> 
                    
                 
                     <?php if (!empty($item['title'])): ?>
                                       <span>
                                        <?php if($item['link']): ?>
                                             <a href="<?= esc_url($item['link']); ?>"> <?php endif; ?> 
                                            <?= wp_kses_post($item['title']); ?>
                                             <?php if($item['link']): ?></a> <?php endif; ?> 
                                        </span> 
          <?php endif; ?>

            </li>
        <?php endforeach; ?>
    </ul>
    <?php endif; ?>
    

      <div class="flex flex-wrap gap-12 items-start mb-8">
        <?php if($stat1 || $stat1_label): ?>
          <div  class='space-y-2'>
              <?php if($stat1): ?><div><h3  class="text-h38 md:text-h46  font-manrope font-bold leading-114 text-info"><?= esc_html($stat1); ?></h3></div>  <?php endif; ?>
               <?php if($stat1_label): ?>    <div class="text-p16 text-secondary font-lora leading-150"><?= esc_html($stat1_label); ?></div>  <?php endif; ?>
          </div>
           <?php endif; ?>
            <?php if($stat2 || $stat2_label): ?>
            <div  class='space-y-2'>
                <?php if($stat2): ?><div><h3  class="text-h38 md:text-h46  font-manrope font-bold leading-114 text-info"><?= esc_html($stat2); ?></h3></div>  <?php endif; ?>
                <?php if($stat2_label): ?><div class="text-p16 text-secondary  font-lora leading-150"><?= esc_html($stat2_label); ?></div>  <?php endif; ?>
            </div>
            <?php endif; ?>
      </div>
        
      <?php if($buttonText || $secondaryButtonText): ?>

       <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <?php   if($buttonText): ?>
                <a 
                    class="inline-block bg-primary hover:bg-green-1 text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center button-icon"
                    href="<?= esc_url($buttonUrl); ?>"
                > 
                <?= wp_kses_post($buttonText); ?>
                </a>
            <?php endif; ?>


            <?php if($secondaryButtonText): ?>
                <a 
                    class="inline-block text-primary  hover:bg-green-1 hover:shadow-btn-primary hover:text-white rounded-12 font-semibold no-underline px-3 py-3 text-p16 text-center button-icon"
                    href="<?= esc_url($secondaryButtonUrl); ?>"
                >
                <?= wp_kses_post($secondaryButtonText); ?>
                </a>
            <?php endif; ?>
            </div>
        <?php endif; ?>

    </div>


    <!-- IMAGE (mobile first → order 2, desktop → order 1) -->
       <?php if ($chartUrl): ?>
    <div class="order-2 md:order-2 w-full">
        <div class="rounded-xl   p-4 flex items-center justify-center">
            <?php if ($chartUrl): ?>
                <img 
                    src="<?= esc_url($chartUrl); ?>" 
                    alt="Chart" 
                    class="object-contain w-full h-auto rounded-xl"
                />
            <?php else: ?>
                <div class="text-gray-400"></div>
            <?php endif; ?>
        </div>
    </div>
     <?php endif; ?>
<?php endif; ?>

  </div>

</div>
</section>
