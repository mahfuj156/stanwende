<?php
$heading = $attributes["heading"] ?? "";
$incomeLabel = $attributes["incomeLabel"] ?? "";
$pensionLabel = $attributes["pensionLabel"] ?? "";
$buttonText = $attributes["buttonText"] ?? "";

$resultRoom = $attributes["resultRoom"] ?? "0";
$resultBack = $attributes["resultBack"] ?? "0";

$incomeExample = $attributes["incomeExample"] ?? "0";
$pensionExample = $attributes["pensionExample"] ?? "0";

$sectionClass      = $attributes['sectionClass'] ?? '';
$sectionBGColor      = $attributes['sectionBGColor'] ?? '#FFF8ED';
$paddingTop      = $attributes['paddingTop'] ?? '';
$paddingBottom      = $attributes['paddingBottom'] ?? '';
$sectionMarginTop      = $attributes['sectionMarginTop'] ?? '';
$containerMaxWidth      = $attributes['containerMaxWidth'] ?? '1024';
?>

<section class="py-16 bg-[#FAF5EB] w-full <?= esc_attr($sectionClass); ?>" style=" background-color: <?= esc_attr($sectionBGColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem; margin-top: <?= esc_attr($sectionMarginTop); ?>px;">
    <div class="max-w-container-wide mx-auto px-4" style="max-width: <?= esc_attr($containerMaxWidth); ?>px;">

        <h2 class="text-h38 leading-150 font-bold mb-10"><?= wp_kses_post($heading); ?></h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

            <!-- LEFT: FORM -->
            <div class="bg-white p-8 rounded-xl shadow-md">
                <h3 class="text-h32 font-bold leading-150 mb-4">Bereken</h3>

                <p class="text-p16 text-gray-700 mb-6">
                    Om te berekenen hoe groot je jaarruimte is hebben we je gegevens van 2024 nodig.
                </p>

                <label class="block text-gray-700 text-p18 font-bold leading-150 mb-2"><?= esc_html($incomeLabel); ?></label>
                <input class="w-full p-2 no-border bg-gray-100  rounded-lg border  focus:border-green-100 mb-4" placeholder="€ 00" />

                <label class="block text-gray-700 text-p18 font-bold leading-150 mb-2"><?= esc_html($pensionLabel); ?></label>
                <input class="w-full p-2 no-border bg-gray-100 rounded-lg border focus:border-green-100 mb-6" placeholder="€ 00" />
                
                <div class="flex justify-center mt-12">
                <button class="w-full bg-primary hover:bg-green-1 text-white px-5 py-3 text-p16 no-underline rounded-12 shadow-btn-primary text-center">
                    <?= esc_html($buttonText); ?>
                </button>
 
                </div>
                
            </div>

            
           <!-- RIGHT: RESULT BOX -->
<div class="bg-info text-white p-8 rounded-xl shadow-md md:min-h-[440px] flex flex-col justify-between">

    <!-- TOP SECTION -->
 
        <div class="grid grid-cols-2 gap-10">
            <div>
                <h3 class="text-h22 font-bold leading-150 mb-2">Jaarruimte</h3>
                <p class="opacity-90 text-p16">Dit kun je dit jaar inleggen.</p>
            </div>

           <div class="col-span-1 flex justify-end" style=''>
                <p class="text-h22 leading-140 font-bold mb-1 justify-end">€ <?= esc_html($resultRoom); ?></p>
            </div>
        </div>

        <!-- Separator line -->
        <div class="w-full h-[1px] bg-[#F8E6D8] my-6" style='background: #F8E6D8; height: 1px'></div>

        <!-- BASED ON -->
        <p class="text-p18 opacity-80 mb-3">Op basis van</p>

         <div class="grid grid-cols-2 gap-2">
            <div> 
                <p class="opacity-90 text-p16">Bruto verzamelinkomen 2024:</p>
            </div>

           <div class="col-span-1 flex justify-end" style=''>
                <p class="text-p16  d mb-1 justify-end flex gap-4"><span><i class="fa-regular fa-circle-question" style='color: #9ABA9D'></i></span> <span>€ <?= esc_html($incomeExample); ?> </span></p>
            </div>
        </div>

         <div class="grid grid-cols-2 gap-2">
            <div class='flex-7' > 
                <p class="opacity-90 text-p16">Pensioenopbouw (Factor A) 2024:</p>
            </div>

           <div class="flex-3 col-span-1 flex justify-end"  >
                <p class="text-p16   mb-1 justify-end  flex gap-4"><span><i class="fa-regular fa-circle-question" style='color: #9ABA9D'></i></span>  <span>€ <?= esc_html($pensionExample); ?> </span></p>
            </div>
        </div>
 
   

       <!-- Separator line -->
              <div class="w-full h-[1px] bg-[#F8E6D8] my-6" style='background: #F8E6D8; height: 1px'></div>


        <!-- BOTTOM SECTION -->
        <div class="mt-6 grid grid-cols-2">
            <div>
                <h3 class="text-h22 font-bold leading-150">Teruggave*</h3>
                <p class="opacity-90 text-p16">Indicatie belastingvoordeel.</p>
            </div>
            <div class="text-right">
                <p class="text-h22 font-bold">€ <?= esc_html($resultBack); ?></p>
            </div>
        </div>

    </div>
 

        </div>

        <p class="text-p14  text-gray-500 mt-12">
           * Disclaimer Copy - Voor de indicatieve belastingteruggave hanteren we de tarieven van 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>

    </div>
</section>
