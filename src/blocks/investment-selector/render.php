<?php
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$items = $attributes['items'] ?? [];

$sectionClass = $attributes['sectionClass'] ?? 'mx-auto py-20';
$sectionColor = $attributes['sectionColor'] ?? '#F3F7F4';
$paddingTop = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$sectionMarginTop = $attributes['sectionMarginTop'] ?? 0;

$cols = $attributes['columns'] ?? 4; // your design uses 4 columns
 

$itemCount = count($items);

switch ($itemCount) {
    case 4:
        $gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8";
        $containerPadding = "py-16"; // huge vertical padding
        break;
    case 3:
        $gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8";
        $containerPadding = "py-16";
        break;
    case 2:
        $gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8";
        $containerPadding = "py-16";
        break;
    default:
        $gridClass = "grid grid-cols-1 sm:grid-cols-1 gap-8";
        $containerPadding = "py-16";
        break;
}

?>

<section class="py-16 bg-[#EEF5EF] scroll-animate scroll-hidden   <?= esc_attr($sectionClass); ?>"  style="background-color: <?= esc_attr($sectionColor);  ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem;"> <!-- soft green background -->
    <div class="max-w-container-wide mx-auto px-4">

        <!-- Heading Section -->
        <div class="text-left   mb-16">
            <?php if ($heading): ?>
               <h2 class="text-h46 leading-114 font-bold text-left text-custom-black">
                    <?= wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>

            <?php if ($subheading): ?>
                    <p class="mt-8 text-left text-secondary text-p18 leading-150   mb-16">
                    <?= wp_kses_post($subheading); ?>
                </p>
            <?php endif; ?>
        </div>

        <!-- Cards Grid -->
        <div class="<?= $gridClass; ?> mt-16 mb-4">

            <?php foreach ($items as $item): ?>
                <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">

                    <!-- Icon -->
                    <?php if (!empty($item['iconImage']['url'])): ?>
                        <img 
                            src="<?= esc_url($item['iconImage']['url']); ?>" 
                            class="w-12 h-12 object-contain mb-4" style="margin-top: <?= esc_html($sectionMarginTop ?? 0); ?>px "
                            alt="icon"
                        />
                    <?php endif; ?>

                    <!-- Title -->
                    <h3 class="text-p16 font-semibold leading-150 text-[#0B2E13]">
                        <?= esc_html($item['title'] ?? ''); ?>
                    </h3>

                    <!-- Description -->
                    <p class="text-gray-600 mt-2  text-p16 leading-150">
                        <?= esc_html($item['description'] ?? ''); ?>
                    </p>

                    <!-- Sub Items -->
                    <?php if (!empty($item['subItems'])): ?>
                        <ul class="mt-4 space-y-2">
                            <?php foreach ($item['subItems'] as $sub): ?>
                                <li class="flex gap-3 items-start text-gray-700 text-p16 leading-150">
                                    <i class="<?= esc_attr($sub['icon']); ?> text-green-600 text-lg"></i>
                                    <span><?= esc_html($sub['text']); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>

                    <!-- Button -->
                    <?php if (!empty($item['buttonText'])): ?>
                         <div class="mt-auto pt-6">
                            <a 
                                href="<?= esc_url($item['buttonUrl'] ?? '#'); ?>" 
                                class="block w-full text-center faq-button-shadow hover:bg-green-1 hover:text-white px-6 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm"
                            >
                                <?= esc_html($item['buttonText']); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                </div>
            <?php endforeach; ?>

        </div>
    </div>
</section>
