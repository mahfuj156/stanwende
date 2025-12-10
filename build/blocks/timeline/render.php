<?php
$heading      = $attributes['heading'] ?? ''; 

$sectionClass      = $attributes['sectionClass'] ?? '';
$sectionBGColor      = $attributes['sectionBGColor'] ?? '';
$paddingTop      = $attributes['paddingTop'] ?? '';
$paddingBottom      = $attributes['paddingBottom'] ?? '';
$sectionMarginTop      = $attributes['sectionMarginTop'] ?? '';
$steps = $attributes["steps"] ?? [];
$colCount = max(1, count($steps));
$buttonText      = $attributes['buttonText'] ?? ''; 
$buttonUrl      = $attributes['buttonUrl'] ?? '';
$bottomLabels = $attributes['bottomLabels'] ?? [];

?>

<section class="hidden md:block  py-16 relative w-full <?= esc_attr($sectionClass); ?>" style=" background-color: <?= esc_attr($sectionBGColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem; margin-top: <?= esc_attr($sectionMarginTop); ?>px;">


   <div class="container mx-auto px-4   relative mb-16 pb-4"> 
      <?php if(!empty($heading)): ?>
        <h2 class="text-h38 leading-114  font-bold text-center mb-2">
            <?= wp_kses_post($heading); ?>
        </h2>
        <?php endif; ?>
      </div>

    <!-- FULL-WIDTH BORDER -->
    <div class="absolute left-0 right-0 h-[2px] bg-timeline-gradient"></div>

    <div class="container mx-auto px-4 grid grid-cols-<?php echo esc_attr($colCount); ?> gap-10 relative"> 
        <?php foreach ($steps as $i => $step): ?>
            <div class="relative text-left">

                <!-- NUMBER CIRCLE -->
                <div class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#70A26B] bg-white text-[#70A26B] font-semibold absolute -top-6 mb-6 mx-auto">
                    <?= esc_html($step["number"]); ?>
                </div>

                <!-- TITLE -->
                <h3 class="mt-8 font-bold text-h22 leading-140 text-custom-black"><?= wp_kses_post($step["title"]); ?></h3>

                <!-- DESCRIPTION -->
                <p class=" text-p16 leading-150 mt-2 text-[#505250] timelime-more"><?= wp_kses_post($step["text"]); ?></p>

            </div>
        <?php endforeach; ?> 


     
    </div>

       <div class="max-w-container-wide mx-auto px-4 gap-y-12">
          <!-- Button to View All Reviews -->
        <div class="flex justify-center mb-10 mt-12">
            <a 
                class="inline-block bg-primary hover:bg-green-1 text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center"
                href="<?= esc_url($buttonUrl); ?>"
            >
                <?= esc_html($buttonText); ?>  
            </a>


             <!-- Bottom Labels -->

          
        </div>

 
        <div class="flex justify-center gap-12 mt-8 text-gray-600 text-sm">
            <?php foreach ($bottomLabels as $label): ?>
                <div class="flex items-center gap-2 text-p-14 leading-150">
                    <i class="fa-regular fa-circle-check  border-green-500 text-green-600  text-md"></i>
 
                    <?php echo esc_html($label); ?>
                </div>
            <?php endforeach; ?>
        </div>


            </div>

</section>


<section class="md:hidden py-16 relative w-full <?= esc_attr($sectionClass); ?>" style=" background-color: <?= esc_attr($sectionBGColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem; margin-top: <?= esc_attr($sectionMarginTop); ?>px;">

    <div class="container mx-auto px-4 py-4 relative">
 
      <?php if(!empty($heading)): ?>
        <h2 class="text-h32 leading-114  font-bold text-center  ml-6 mb-6 pl-6">
            <?= wp_kses_post($heading); ?>
        </h2>
        <?php endif; ?> 

        <!-- Vertical Line -->
        <div class="absolute left-4  bottom-0 w-[2px] h-full  bg-timeline-gradient-mobile   " style='width: 3px; left: 35px; top: -75px'></div>

        <div class="flex flex-col space-y-12">
            <?php foreach ($steps as $i => $step): ?>
                <div class="flex items-start md:items-start relative">
                    
                    <!-- Number Circle -->
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#70A26B] bg-white text-[#70A26B] font-bold text-h22 relative z-10">
                        <?= esc_html($step["number"]); ?>
                    </div>

                    <!-- Content -->
                    <div class="ml-6 md:ml-8">
                        <h3 class="font-bold text-h22 leading-140 text-custom-black"><?= esc_html($step["title"]); ?></h3>
                        <p class="text-p16 leading-150 mt-2 text-[#505250]"><?= esc_html($step["text"]); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Button -->
         <?php  if(!empty($buttonText)): ?>
        <div class="flex justify-center mt-12">
            <a class="inline-block bg-primary hover:bg-green-1 text-white px-5 py-3 text-p16 no-underline rounded-12 shadow-btn-primary text-center"
                href="<?= esc_url($buttonUrl); ?>">
                <?= esc_html($buttonText); ?>
            </a>
        </div>
        <?php endif; ?>

        <!-- Bottom Labels -->
        <div class="flex justify-center gap-4 mt-4 text-gray-600 text-sm flex-wrap">
            <?php foreach ($bottomLabels as $label): ?>
                <div class="flex items-center gap-2 text-p-14 leading-150">
                    <i class="fa-regular fa-circle-check border-green-500 text-green-600 text-md"></i>
                    <?= esc_html($label); ?>
                </div>
            <?php endforeach; ?>
        </div>

    </div>
</section>
