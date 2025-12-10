<?php
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$items = $attributes['items'] ?? [];

$sectionClass = $attributes['sectionClass'] ?? 'mx-auto py-20';
$sectionColor = $attributes['sectionColor'] ?? '#F3F7F4';
$paddingTop = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$sectionMarginTop = $attributes['sectionMarginTop'] ?? 0;



$buttonText   = $attributes['buttonText'] ?? '';
$buttonUrl    = $attributes['buttonUrl'] ?? '';
$buttonText2  = $attributes['buttonText2'] ?? '';
$buttonUrl2   = $attributes['buttonUrl2'] ?? '';
$clientName   = $attributes['clientName'] ?? '';
$clientImage  = $attributes['clientImage']['url'] ?? '';
$clientAlt    = $attributes['clientImage']['alt'] ?? $clientName;

$titleFontSize   = $attributes['titleFontSize'] ?? 46;
$subTitleFontSize   = $attributes['subTitleFontSize'] ?? 36;
$panelTitleFontSize   = $attributes['panelTitleFontSize'] ?? 16;
$titleMarginBottom   = $attributes['titleMarginBottom'] ?? 16;
$panelTitleTag   = $attributes['panelTitleTag'] ?? "h3";
$linkStyle   = $attributes['linkStyle'];
 
 

$clientLayout = $attributes['clientLayout'] ?? 'stacked';
$clientFlex = $clientLayout === 'inline' 
    ? 'flex flex-col md:flex-row md:justify-center md:items-center gap-6'
    : 'flex flex-col items-center gap-6';


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
    <div class="max-w-container-wide mx-auto px-4 ">

        <!-- Heading Section -->
        <div class="text-left   mb-<?php echo $titleMarginBottom; ?>">
            <?php if ($heading): ?>
               <h2 class="text-h46 leading-114 font-bold text-left text-custom-black"  style="font-size: <?= esc_attr($titleFontSize); ?>px;">
                    <?= wp_kses_post($heading); ?>
                </h2>
            <?php endif; ?>

            <?php if ($subheading): ?>
                    <p class="mt-8 text-left text-secondary text-p18 leading-150   mb-16"  style="font-size: <?= esc_attr($subTitleFontSize); ?>px;">
                    <?= wp_kses_post($subheading); ?>
                </p>
            <?php endif; ?>
        </div>

    
        <!-- Cards Grid -->
        <div class="<?= $gridClass; ?>  mb-16">

            <?php foreach ($items as $item): ?>
                <div class="  transition-all flex flex-col transition-transform duration-300 hover:scale-105  ">

                    <!-- Icon -->
                    <?php if (!empty($item['iconImage']['url'])): ?>
                        <img 
                            src="<?= esc_url($item['iconImage']['url']); ?>" 
                            class="w-12 h-12 object-contain mb-4" style="margin-top: <?= esc_html($sectionMarginTop ?? 0); ?>px "
                            alt="icon"
                        />
                    <?php endif; ?>

                    <!-- Title -->
                     <?php if($panelTitleTag=="p"):
                        ?>
                         <p class="text-p16   leading-114 text-212F22"  style="font-size: <?= esc_attr($panelTitleFontSize); ?>px;">
                        <?= wp_kses_post($item['title'] ?? ''); ?>
                         </p>
                    <?php
                     else:
                     ?>
                      <h3 class="text-h38   font-bold  leading-114 text-212F22"  style="font-size: <?= esc_attr($panelTitleFontSize); ?>px;">
                        <?= wp_kses_post($item['title'] ?? ''); ?>
                    </h3>
                    <?php
                     endif;?>
                   

                    <!-- Description -->
                     <?php if($item['description']): ?>
                    <p class="text-gray-600 mt-2  text-p16 leading-150">
                        <?= wp_kses_post($item['description'] ?? ''); ?>
                    </p>
 <?php
                     endif;?>
                    <!-- Sub Items -->
                    <?php if (!empty($item['subItems'])): ?>
                        <ul class="mt-4 space-y-1">
                            <?php foreach ($item['subItems'] as $sub):
                               $link =  esc_attr($sub['link']);
                                ?>
                                <li class="flex gap-2 items-start text-060806 text-p16 leading-150">
                                    <span> <i class="<?= esc_attr($sub['icon']); ?> text-green-1 text-p14"></i></span>
                                    <span>
                                        <?php if($link): ?><a href="<?php echo $link; ?>" class='<?php echo $linkStyle; ?>'> <?php endif; ?> <?= esc_html($sub['text']); ?>  <?php if($link): ?></a><?php endif; ?></span>
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
                                <?= wp_kses_post($item['buttonText']); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                </div>
            <?php endforeach; ?>

        </div>


           <!-- Client + Buttons -->
    <div class="clear  mb-16"> </div>
        <div class="<?= esc_attr($clientFlex); ?> mt-16">
    <!-- Client Info -->
    <div class="flex items-center gap-4">
        <?php if ($clientImage): ?>
            <img src="<?= esc_url($clientImage); ?>" alt="<?= esc_attr($clientAlt); ?>" class="h-10  rounded-full border-2 border-white shadow-md">
        <?php endif; ?>
        <?php if ($clientName): ?>
            <p class="font-semibold text-lg"><?= esc_html($clientName); ?></p>
        <?php endif; ?>
    </div>

    <!-- Buttons -->
    <div class="flex flex-wrap justify-center md:justify-end items-center gap-4">
         <?php 
          
         
         if($buttonText): ?>
        <a href="<?= esc_url($buttonUrl); ?>" class="inline-block faq-button-shadow hover:bg-green-1 hover:text-white px-6 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm"><?= wp_kses_post($buttonText); ?></a>
        <?php
        endif;
        if($buttonText2): ?>
        <span class="text-gray-500 font-medium">Of</span>
        <a href="<?= esc_url($buttonUrl2); ?>" class="inline-block faq-button-shadow hover:bg-green-1 hover:text-white px-6 py-3 font-semibold no-underline text-p16 rounded-12 shadow-sm"><?= wp_kses_post($buttonText2); ?></a>
        <?php endif; ?>
    </div>
</div>

    </div>
</section>
