<?php
$heading = $attributes['heading'] ?? 'Welke situatie past bij jou?';
$subtitle = $attributes['subtitle'] ?? 'Zo weet je het snelst wat je het beste met je geld kan doen.';
$cards = $attributes['cards'] ?? [];
?>

<section class="max-w-container-wide mx-auto px-4 py-16">
  <h2 class="text-4xl font-bold mb-2 text-center"><?= esc_html($heading); ?></h2>
  <p class="text-gray-700 mb-8 text-2xl  text-center"><?= esc_html($subtitle); ?></p>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <?php foreach ($cards as $card): 
      $url = $card['url'] ?? '#';
    ?>
    <div class="block no-underline bg-[#FFF7EF] rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow">
      <a href="<?= esc_url($url); ?>" target="_blank" rel="noopener noreferrer " class="block no-underline   "> 
        <h5 class="font-semibold text-2xl mb-2 relative items-center"  style='font-size: 18px'>
        <?= esc_html($card['title']); ?>
        <span class="text-black font-bold ml-2" style="position: absolute; right: 0; top: 0">›</span>
        </h5>     
        <p class="text-gray-500 mb-3"><?= esc_html($card['description']); ?></p>
            
      </a>
    </div>
    <?php endforeach; ?>
  </div>
</section>
