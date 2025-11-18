<?php 

$eyebrow       = $attributes['eyebrow'] ?? '';
$title         = $attributes['title'] ?? '';
$description   = $attributes['description'] ?? '';
$stat1         = $attributes['stat1'] ?? '';
$stat1_label   = $attributes['stat1_label'] ?? '';
$stat2         = $attributes['stat2'] ?? '';
$stat2_label   = $attributes['stat2_label'] ?? '';
$chartUrl      = $attributes['chartUrl'] ?? '';
$bgColor       = $attributes['bgColor'] ?? '#E4ECE5';

?>
 <section 
    class="py-14 md:py-20"
    style="background-color: <?= esc_attr($bgColor); ?>;"
>
<div class="max-w-container-wide mx-auto px-4 md:px-6">

  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

    <!-- TEXT (mobile first → order 1, desktop → order 2) -->
    <div class="order-1 md:order-2 w-full">

      <?php if ($eyebrow): ?>
          <div class="text-h18 text-primary font-semibold mb-2">
              <?= esc_html($eyebrow); ?>
          </div>
      <?php endif; ?>

      <?php if ($title): ?>
          <h2 class="text-h38 md:text-h46 font-semibold leading-114 mb-4">
              <?= esc_html($title); ?>
          </h2>
      <?php endif; ?>

      <?php if ($description): ?>
          <p class="mb-6 text-p16 text-secondary leading-150">
              <?= wp_kses_post($description); ?>
          </p>
      <?php endif; ?>

      <div class="flex flex-wrap gap-6 md:gap-8 items-start mb-8">
          <div>
              <div class="text-h38 md:text-h46 font-bold leading-114 text-info"><?= esc_html($stat1); ?></div>
              <div class="text-p16 text-secondary leading-150"><?= esc_html($stat1_label); ?></div>
          </div>

          <div>
              <div class="text-h38 md:text-h46 font-bold leading-114 text-info"><?= esc_html($stat2); ?></div>
              <div class="text-p16 text-secondary leading-150"><?= esc_html($stat2_label); ?></div>
          </div>
      </div>

       <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <a 
            class="inline-block bg-primary text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center"
            href="#"
        >
            <?= esc_html__('Calculate your return', 'zero'); ?>
        </a>

        <a 
            class="inline-block text-primary font-semibold no-underline px-3 py-3 text-p16 text-center"
            href="#"
        >
            <?= esc_html__('Onze rendementen >', 'zero'); ?>
        </a>
    </div>

    </div>


    <!-- IMAGE (mobile first → order 2, desktop → order 1) -->
    <div class="order-2 md:order-1 w-full">
        <div class="rounded-xl bg-white p-4 flex items-center justify-center">
            <?php if ($chartUrl): ?>
                <img 
                    src="<?= esc_url($chartUrl); ?>" 
                    alt="Chart" 
                    class="object-contain w-full h-auto rounded-xl"
                />
            <?php else: ?>
                <div class="text-gray-400">Chart placeholder</div>
            <?php endif; ?>
        </div>
    </div>

  </div>

</div>
</section>
