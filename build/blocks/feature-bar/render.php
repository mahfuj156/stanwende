<?php
$items = $attributes['items'] ?? [];
$logos = $attributes['logos'] ?? [];
$logoTitle = $attributes['logoTitle'] ?? "Bekend van:";
$cols = (int) ($attributes['columns'] ?? 3); 

$showDivider      = $attributes['showDivider'] ?? 'Yes';
$sectionClass      = $attributes['sectionClass'] ?? '';
$sectionColor      = $attributes['sectionColor'] ?? '';
$paddingTop        = $attributes['paddingTop'] ?? 6;
$paddingBottom     = $attributes['paddingBottom'] ?? 6;
$sectionMarginTop  = $attributes['sectionMarginTop'] ?? '0';
$maxContainerWidth = $attributes['maxContainerWidth'] ?? 1312;

$isTwoCols = ($cols === 2);
$gridColsClass = $isTwoCols
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
?>
<section class="<?= esc_attr($sectionClass); ?> relative custom-neg-mt- z-50 md:px-0 scroll-animate scroll-hidden"
      
            style="
        margin-top: <?= esc_attr($sectionMarginTop); ?>px;
        padding-top: <?= esc_attr($paddingTop); ?>rem;
        padding-bottom: <?= esc_attr($paddingBottom); ?>rem;
        background-color: <?= esc_attr($sectionColor); ?>;
    "
    >
  <div class="max-w-container-wide mx-auto feature-bar-box bg-white rounded-xl px-4 sm:px-6 md:px-10 py-6" style="max-width: <?= esc_attr($maxContainerWidth); ?>px;">
    <div class="flex flex-col gap-6 text-center justify-center rounded-xl">

      <?php if (!empty($items)): ?>
        <div class="grid <?= $gridColsClass; ?> justify-center justify-items-center gap-2 text-center <?= $isTwoCols ? 'grid-2cols' : ''; ?>">
          <?php foreach ($items as $item): ?>
            <div class="grid-item gap-3">
              <span class="text-p16 leading-150  ">
                <?php if (!empty($item['image'])): ?>
                  <img src="<?= esc_url($item['image']); ?>" alt="" class="mx-auto rounded-lg" />
                <?php endif; ?>
                <?php if (!empty($item['icon'])): ?>
                  <i class="<?= esc_attr($item['icon']); ?> text-green-600 text-xl"></i>
                <?php endif; ?>
                </span>
              <span class="text-p16 leading-150 text-060806">
                <?= wp_kses_post($item['text']); ?>
              </span>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>



      
            <?php if(!empty($logos)): ?>
            <?php if($showDivider =='Yes'): ?>
          
            <hr class="w-full border-gray-200" />
            <?php endif; ?>

            <!-- Logos -->
            <div class="flex flex-col md:flex-row md:items-center  md:justify-center gap-4 my-4">

                <div class="text-center text-p16 font-bold text-gray-700">
                  <?php echo $logoTitle; ?>
                </div>

               <div class="mobile-logos">
                    <?php foreach ($logos as $logo): ?>
                        <div class="mobile-logo-item">
                            <img src="<?= esc_url($logo['url']); ?>" class="h-6 sm:h-8 object-contain" />
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

    </div>
  </div>
</section>

<?php if ($isTwoCols): ?>
<!-- Only apply this when 2‑column layout -->
<style>
  /* When container has class grid-2cols, center the last item */
  .grid-2cols > .grid-item:last-child {
    grid-column: 1 / -1;
    justify-self: center;
  }
</style>
<?php endif; ?>
