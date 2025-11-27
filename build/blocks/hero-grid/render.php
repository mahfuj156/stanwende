<?php 
$bullets = $attributes['bullets'] ?? [];
$bulletIcons = $attributes['bulletIcons'] ?? [];
$images = $attributes['images'] ?? [];
$styleType = $attributes['styleType'] ?? 'light';
$imagePosition = $attributes['imagePosition'] ?? 'right';
$sectionClass = $attributes['sectionClass'] ?? 'mx-auto py-20';
$bulletListClass = $attributes['bulletListClass'] ?? 'space-y-2 mt-6';
$bulletItemClass = $attributes['bulletItemClass'] ?? 'text-lg flex items-start gap-2';
?>

<section class="<?= esc_attr($sectionClass); ?> scroll-animate scroll-hidden">
    <div class="max-w-container-wide mx-auto">
        <div class="flex flex-col md:flex-row gap-16 justify-center items-center">

            <div class="md:w-2/3 <?= $imagePosition === 'left' ? 'order-last md:order-first' : '' ?>">
                <ul class="<?= esc_attr($bulletListClass); ?>">
                    <?php foreach ($bullets as $i => $b): ?>
                        <li class="<?= esc_attr($bulletItemClass); ?>">
                            <span class="text-green-light mr-2">
                                <i class="<?= esc_attr($bulletIcons[$i] ?? 'fas fa-check'); ?>"></i>
                            </span>
                            <?= esc_html($b); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <div class="md:w-1/3 custom-column <?= $imagePosition === 'left' ? 'order-first md:order-last' : '' ?>">
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
