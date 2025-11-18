<?php
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$bullets = $attributes['bullets'] ?? [];
$bulletIcons = $attributes['bulletIcons'] ?? [];
$buttonPrimary = $attributes['buttonPrimary'] ?? '';
$buttonSecondary = $attributes['buttonSecondary'] ?? '';
$images = $attributes['images'] ?? [];
$styleType = $attributes['styleType'] ?? 'light';
$imagePosition = $attributes['imagePosition'] ?? 'right';
$sectionClass = $attributes['sectionClass'] ?? 'mx-auto py-20';
$bulletListClass = $attributes['bulletListClass'] ?? 'list-disc pl-5 space-y-2';
$bulletItemClass = $attributes['bulletItemClass'] ?? '';
?>

 <section class="mx-auto py-14 md:py-0 px-4 md:px-0 <?= esc_attr($sectionClass); ?>">
    <div class="max-w-container-wide mx-auto">
        <div class="flex flex-col md:flex-row gap-16 justify-center items-center">

            <!-- LEFT -->
            <div class="w-full md:w-2/3 <?= $imagePosition === 'left' ? 'order-last md:order-first' : '' ?>">
                <h1 class="text-3xl sm:text-4xl md:text-6xl text-custom-black font-bold leading-snug">
                    <?= esc_html($heading); ?>
                </h1>
                <p class="mt-4 text-base sm:text-lg"><?= wp_kses_post($subheading); ?></p>

                <ul class="list-disc pl-5 space-y-2 mt-6">
                    <?php foreach ($bullets as $b): ?>
                        <li class="flex items-center text-base sm:text-lg">
                            <span class="text-green-light mr-2">
                                <i class="fa-regular fa-circle-check"></i>
                            </span> 
                            <?= esc_html($b); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>

                <div class="mt-6 flex gap-4 flex-wrap">
                    <a class="px-6 py-3 bg-green-light text-white rounded-lg no-underline btn-shadow">
                        <?= esc_html($buttonPrimary); ?>
                    </a>
                    <a class="px-6 py-3 bg-gray-200 rounded-lg no-underline btn-offset-shadow font-bold">
                        <?= esc_html($buttonSecondary); ?>
                    </a>
                </div>
            </div>

            <!-- RIGHT -->
            <div class="w-full md:w-1/3 <?= $imagePosition === 'left' ? 'order-first md:order-last' : '' ?>">

                <!-- MOBILE SLIDER -->
                <div class="md-hidden-custom swiper mySwiper">
                    <div class="swiper-wrapper">
                        <?php foreach ($images as $img): ?>
                            <div class="swiper-slide">
                                <img src="<?= esc_url($img['url']); ?>" class="rounded-xl w-full" />
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <!-- Slider dots -->
                    <div class="swiper-pagination mt-4"></div>
                </div>

                <!-- DESKTOP MASONRY -->
                <div class="hidden md:block">
                    <div class="columns-2 gap-4 hero-gallery">
                        <?php foreach ($images as $img): ?>
                            <img 
                                src="<?= esc_url($img['url']); ?>" 
                                class="mb-4 rounded-xl w-full break-inside-avoid"
                            />
                        <?php endforeach; ?>
                    </div>
                </div>

            </div>

        </div>
    </div>
</section>
