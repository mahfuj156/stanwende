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
$sectionColor   = $attributes['sectionColor'] ?? '#ffffff';
$paddingTop   = $attributes['paddingTop'] ?? 0;
$paddingBottom   = $attributes['paddingBottom'] ?? 0;
$titleFontSize   = $attributes['titleFontSize'] ?? 46;
$subtitleFontSize   = $attributes['subtitleFontSize'] ?? 16;
 
?>
 
<section class="px-4 py-20 bg-custom-bg scroll-animate scroll-hidden" style="background-color: <?= esc_attr($sectionColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem;">
  <div class="max-w-container-wide mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      <!-- IMAGE on mobile first order 1, on desktop order 2 -->
      <div class="order-1 md:order-2 relative">
        <?php if ($mainImage): ?>
          <img src="<?= esc_url($mainImage); ?>" class="rounded-xl w-full object-cover" alt="">
        <?php endif; ?>

        

       <?php if ($videoUrl): ?>
          <!-- Play button -->
          <button id="video-play-btn" type="button"
                  class="absolute inset-0 flex items-center justify-center focus:outline-none">
            <div class="w-20 h-20 bg-black-500 bg-opacity-80 text-white hover:bg-opacity-700 rounded-full shadow-lg flex items-center justify-center text-4xl cursor-pointer transition-all duration-300">
              ▶
            </div>
          </button>
        <?php endif; ?>
      </div>

      <!-- TEXT on mobile first order 2, on desktop order 1 -->
      <div class="order-2 md:order-1">
        <h2 class="text-h46 md:text-h46 font-bold leading-114 mb-4"><?= wp_kses_post($heading); ?></h2>
        <p class="text-info text-h18 font-bold leading-150 mb-4"><?= wp_kses_post($subtitle); ?></p>
        <p class="text-gray-700 mb-6"><?= wp_kses_post($content); ?></p>

        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a class="inline-block bg-primary text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center"
             href="<?= esc_url($buttonUrl); ?>">
            <?= wp_kses_post($buttonText); ?>
          </a>

          <a class="inline-block text-primary font-semibold no-underline px-3 py-3 text-p16 text-center"
             href="<?= esc_url($secondaryButtonUrl); ?>">
            <?= wp_kses_post($secondaryButtonText); ?> 
          </a>
        </div>
      </div>

    </div>
  </div>

  <!-- Video Modal -->
  <?php if ($videoUrl): ?>
  <div id="video-modal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden z-50">
    <div class="relative w-full max-w-3xl mx-4">
      <button id="video-close-btn" class="absolute top-2 right-2 text-white text-2xl font-bold">&times;</button>
      <div class="aspect-w-16 aspect-h-9">
        <iframe id="video-iframe" class="w-full h-full rounded-lg" style='height: 450px' src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  </div>
  <?php endif; ?>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const playBtn = document.getElementById('video-play-btn');
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('video-close-btn');
  const iframe = document.getElementById('video-iframe');

  <?php if ($videoUrl): ?>
  const videoUrl = "<?= esc_url($videoUrl); ?>";

  playBtn?.addEventListener('click', () => {
    iframe.src = videoUrl + "?autoplay=1";
    modal.classList.remove('hidden');
  });

  closeBtn?.addEventListener('click', () => {
    iframe.src = ""; // Stop video
    modal.classList.add('hidden');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      iframe.src = ""; // Stop video
      modal.classList.add('hidden');
    }
  });
  <?php endif; ?>
});
</script>
