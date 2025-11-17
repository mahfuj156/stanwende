<?php
$heading             = $attributes['heading'] ?? '';
$subtitle            = $attributes['subtitle'] ?? '';
$content             = $attributes['content'] ?? '';
$buttonText          = $attributes['buttonText'] ?? '';
$buttonUrl           = $attributes['buttonUrl'] ?? '#';
$secondaryButtonText = $attributes['secondaryButtonText'] ?? '';
$secondaryButtonUrl  = $attributes['secondaryButtonUrl'] ?? '#';

$mainImage = $attributes['mainImage'] ?? '';
$leftLabel = $attributes['leftLabel'] ?? '';
$rightLabel = $attributes['rightLabel'] ?? '';
$videoUrl   = $attributes['videoUrl'] ?? '';
?>

<section class=" px-4 py-20 bg-custom-bg">
  <div class="max-w-container-wide mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      <!-- LEFT SIDE -->
      <div>
        <h2 class="text-4xl font-bold mb-4"><?= esc_html($heading); ?></h2>
        <p class="text-gray-700 mb-4"><?= esc_html($subtitle); ?></p>
        <p class="text-gray-700 mb-6"><?= esc_html($content); ?></p>

        <div class="flex gap-4">
          <a href="<?= esc_url($buttonUrl); ?>" class="bg-green-600 text-white px-4 py-2 rounded no-underline">
            <?= esc_html($buttonText); ?>
          </a>

          <a href="<?= esc_url($secondaryButtonUrl); ?>" class="text-black no-underline">
            <?= esc_html($secondaryButtonText); ?>
          </a>
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="relative">
        <?php if ($mainImage): ?>
          <img src="<?= esc_url($mainImage); ?>" class="rounded-xl w-full object-cover" alt="">
        <?php endif; ?>

        <?php if ($leftLabel): ?>
          <span class="absolute left-4 top-4 bg-white px-3 py-1 rounded shadow">
            <?= esc_html($leftLabel); ?>
          </span>
        <?php endif; ?>

        <?php if ($rightLabel): ?>
          <span class="absolute right-4 top-4 bg-white px-3 py-1 rounded shadow">
            <?= esc_html($rightLabel); ?>
          </span>
        <?php endif; ?>

        <?php if ($videoUrl): ?>
          <a href="<?= esc_url($videoUrl); ?>" target="_blank"
            class="absolute inset-0 flex items-center justify-center">
            <div class="bg-white p-4 rounded-full shadow-lg text-3xl">
              ▶
            </div>
          </a>
        <?php endif; ?>
      </div>

    </div>
  </div>

</section>
