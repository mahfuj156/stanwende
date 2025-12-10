<?php  
$titleLeft  = $attributes['titleLeft'] ?? 'Plan kennismaking';
$leftSubtitle  = $attributes['leftSubtitle'] ?? 'Plan kennismaking';
$leftPaneltitle  = $attributes['leftPaneltitle'] ?? 'Plan kennismaking';
$leftPanelSubTitle  = $attributes['leftPanelSubTitle'] ?? 'Plan kennismaking';
 
$clientImage  = $attributes['clientImage']['url'] ?? '';
$clientAlt    = $attributes['clientImage']['alt'] ?? $clientName;

$bullets  = $attributes['bullets'];
$leftContactHeading  = $attributes['leftContactHeading'];
$titleRight = $attributes['titleRight'] ?? 'Stel hier je vraag';
$rightSubtitle = $attributes['rightSubtitle'] ?? 'Stel hier je vraag';
?>

<section class="relative w-full py-16">

    <!-- FULL-WIDTH BACKGROUND SPLIT -->
    <div class="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <div class="bg-primary w-full h-full"></div>
        <div class="bg-bg3 w-full h-full"></div>
    </div>

    <!-- CENTERED 1300px CONTENT -->
    <div class="relative max-w-container-wide mx-auto  grid grid-cols-1 md:grid-cols-2 gap-20 ">

        <!-- LEFT COLUMN CONTENT -->
        <div class=' '>
            <h2 class="text-h46 leading-114 text-white font-bold mb-4"><?= esc_html($titleLeft); ?></h2>
            <p class="text-white text-p16 leading-150 mb-8">
            <?= wp_kses_post($leftSubtitle); ?>
        </p>

            <div class="bg-white p-8 py-10 rounded-xl shadow">

                <h3 class="text-h26 text-060806 leading-150 font-bold mb-1"><?= wp_kses_post($leftPaneltitle); ?></h3>
                <p  class="text-505250 text-p16 leading-150 mb-8">
                   <?= wp_kses_post($leftPanelSubTitle); ?>
                </p>

                <div class="flex items-center gap-3 mb-4"> 
                         <?php if ($clientImage): ?>
                            <img src="<?= esc_url($clientImage); ?>" alt="<?= esc_attr($clientAlt); ?>" class="h-10  rounded-full border-2 border-white shadow-md">
                        <?php endif; ?>
                        
                    <span class="text-sm text-gray-600"></span>
                </div>


                 <?php if (!empty($bullets)): ?>
                    <div class="flex gap-4">
                        <?php foreach ($bullets as $item): ?>
                              <p class="flex items-center text-p16 text-060806 leading-150 mb-4  "> 

                           
                            <?php  if (!empty($item['iconImage']['url'])): ?>
                                <span class="text-green-light mr-2"><img 
                            src="<?= esc_url($item['iconImage']['url']); ?>" 
                           class=" " 
                            alt="icon"
                        /> </span>
                                <?php else:
                                ?>
                             <span class="text-green-light mr-2">     <i class="fa-regular fa-circle-check"></i> </span>
                                <?php
                                endif; ?> 

                                   <?php if (!empty($item['title'])): ?>
                                       <span><?= wp_kses_post($item['title']); ?></span> 
                                     <?php endif; ?>

                            </p>
 

                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>


               
                   
               
               

                <p class="font-bold  text-060806 mb-2 text-p16 leading-150 "><?= wp_kses_post($leftContactHeading); ?></p>

                <label class="flex items-center gap-2 text-060806 text-p16 leading-150  ">
                    <input type="radio" name="contact" class="rounded-full border border-[#E5E9E7]"  > Via Zoom
                </label>

                <label class="flex items-center gap-2 text-060806 text-p16 leading-150 mb-6">
                    <input type="radio" name="contact" class=" rounded-full border border-[#E5E9E7]"> Telefonisch (bel mij)
                </label>

                <button class="px-6 py-3 bg-green-light hover:bg-green-1 text-white rounded-lg no-underline btn-shadow">
                    Volgende
                </button>

            </div>
        </div>

        <!-- RIGHT COLUMN CONTENT -->
        <div> 
 
            <h2 class="text-h46 leading-114 text-secondary font-bold mb-4"><?= wp_kses_post($titleRight); ?></h2>
            <p class="text-secondary text-p16 leading-150 mb-16">
           <?= wp_kses_post($rightSubtitle); ?>  </p>

               <div class="bg-white p-8 py-10 rounded-xl shadow"  style='margin-top: 80px;'>
                <form >

                    <div class="mb-3">
                        <label class="block font-bold text-p18 leading-140 mb-1">Jouw naam *</label>
                        <input type="text" class="w-full border border-gray-300 bg-f3f3f3  rounded-xl p-2" placeholder="Naam">
                    </div>

                    <div class="mb-3">
                        <label class="block font-bold text-p18 leading-140 mb-1">E-mailadres *</label>
                        <input type="email" class="w-full border border-gray-300  bg-f3f3f3 rounded-xl p-2" placeholder="voorbeeld@email.com">
                    </div>

                    <div class="mb-3">
                        <label class="block font-bold text-p18 leading-140 mb-1">Bericht *</label>
                        <textarea class="w-full border border-gray-300 rounded-xl  bg-f3f3f3 p-2 h-28" placeholder="Type hier je bericht..."></textarea>
                    </div>

                    <button  class="px-6  py-3 bg-green-light hover:bg-green-1 text-white rounded-lg no-underline btn-shadow">
                        Versturen
                    </button>

                </form>
            </div>
        </div>

    </div>

</section>
