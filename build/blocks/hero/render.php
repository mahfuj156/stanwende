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

<section class="<?= esc_attr($sectionClass); ?>">
    <div class="max-w-container-wide mx-auto">
    <div class="flex flex-col md:flex-row gap-16 justify-center items-center">

        <!-- LEFT (2/3) -->
        <div class="  md:w-2/3 <?= $imagePosition === 'left' ? 'order-last md:order-first' : '' ?>">
            <h1 class="text-6xl text-custom-black font-bold line-height-loose"><?= esc_html($heading); ?></h1>
            <p class="mt-6 text-lg"><?= wp_kses_post($subheading); ?></p>

            <ul class="<?= esc_attr($bulletListClass); ?>">
                <?php foreach ($bullets as $i => $b): ?>
                    <li class="<?= esc_attr($bulletItemClass); ?>">
                        <span class="text-green-light mr-2">
                            <i class="fa-regular fa-circle-check  "   ></i>
                        </span> 
                        <?= esc_html($b); ?>
                    </li>
                <?php endforeach; ?>
            </ul>

            <div class="mt-8 flex gap-4">
                <a class="px-6 py-3 bg-green-light text-white rounded-lg no-underline btn-shadow"><?= esc_html($buttonPrimary); ?></a>
                <a class="px-6 py-3 bg-gray-200 rounded-lg no-underline btn-offset-shadow font-bold"><?= esc_html($buttonSecondary); ?></a>
            </div>
        </div>

        <!-- RIGHT (1/3 + masonry) -->
        <div class=" md:w-1/3 custom-column <?= $imagePosition === 'left' ? 'order-first md:order-last' : '' ?>">
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
</section>
