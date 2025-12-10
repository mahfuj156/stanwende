<?php
$heading = $attributes['heading'] ?? 'Welke situatie past bij jou?';
$subtitle = $attributes['subtitle'] ?? 'Zo weet je het snelst wat je het beste met je geld kan doen.';
$cards = $attributes['cards'] ?? [];
$sectionColor = $attributes['sectionColor'] ?? '#ffffff';
$paddingTop = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$titleFontSize = $attributes['titleFontSize'] ?? 46;
$subtitleFontSize = $attributes['subtitleFontSize'] ?? 16;
?>

<section class="max-w-container-wide mx-auto px-4 py-16 scroll-animate scroll-hidden" style="background-color: <?= esc_attr($sectionColor); ?>;  padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem;">
 
<?php
if($heading): ?>
  <h2 class="text-4xl font-bold mb-2 text-center" style="font-size: <?= esc_attr($titleFontSize); ?>px;"><?= wp_kses_post($heading); ?></h2>
<?php endif; ?>

  <?php if($subtitle): ?>
  <p class="text-gray-700 mb-12  text-center" style="font-size: <?= esc_attr($subtitleFontSize); ?>px;"><?= wp_kses_post($subtitle); ?></p>
  <?php endif; ?>


  <?php if($cards): ?>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
    <?php foreach ($cards as $card): 
      $url = $card['url'] ?? '#';
    ?>
    <div class="block no-underline bg-[#FFF7EF] rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow">
      <a href="<?= esc_url($url); ?>" target="_blank" rel="noopener noreferrer " class="block no-underline   "> 
        <h5 class="font-semibold text-2xl relative items-center"  style='font-size: 18px'>
        <?= wp_kses_post($card['title']); ?>
        <span class="text-black font-bold ml-2" style="position: absolute; right: 0; top: 0">›</span>
        </h5>     
        <p class="text-gray-500 "><?= wp_kses_post($card['description']); ?></p>
            
      </a>
    </div>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>
</section>
