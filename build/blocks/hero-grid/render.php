<?php
$eyebrowIcon = $attributes['eyebrowIcon'] ?? '';
$heading = $attributes['heading'] ?? '';
$eyebrow = $attributes['eyebrow'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$bullets = $attributes['bullets'] ?? [];
$buttonPrimary = $attributes['buttonPrimary'] ?? '';
$buttonSecondary = $attributes['buttonSecondary'] ?? '';
$buttonPrimaryUrl = $attributes['buttonPrimaryUrl'] ?? '';
$buttonSecondaryUrl = $attributes['buttonSecondaryUrl'] ?? '';
$images = $attributes['images'] ?? [];
$imagePosition = $attributes['imagePosition'] ?? 'right';
$sectionColor = $attributes['sectionColor'] ?? '#F3F7F4';
$sectionClass = $attributes['sectionClass'] ?? 'mx-auto py-20';
$paddingTop = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$titleFontSize = $attributes['titleFontSize'] ?? 46; 
?>
 
<section class="mx-auto px-4 scroll-animate scroll-hidden <?= esc_attr($sectionClass); ?>" 
         style="background-color: <?= esc_attr($sectionColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem;">
    <div class="max-w-container-wide mx-auto flex flex-col md:flex-row gap-16 justify-center items-center">

        <?php if($imagePosition === 'left'): ?>
            <!-- IMAGES -->
            <div class="w-full md:w-5/12">
                <?php if (!empty($images)): ?>
                <div x-data="{
                        current: 0,
                        next() { this.current = (this.current + 1) % <?= count($images); ?> },
                        prev() { this.current = (this.current - 1 + <?= count($images); ?>) % <?= count($images); ?> }
                    }" class="relative w-full overflow-hidden rounded-xl md:hidden">

                    <!-- Slides -->
                    <template x-for="(img, index) in <?= json_encode($images); ?>" :key="index">
                        <div x-show="current === index" class="transition-all duration-500">
                            <img :src="img.url" class="w-full rounded-xl" />
                        </div>
                    </template>

                    <!-- Arrows -->
                    <button @click="prev()" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-lg">&#8592;</button>
                    <button @click="next()" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-lg">&#8594;</button>

                    <!-- Dots -->
                    <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                        <template x-for="(img, index) in <?= json_encode($images); ?>" :key="index">
                            <span class="w-3 h-3 rounded-full cursor-pointer"
                                  :class="current === index ? 'bg-green-500' : 'bg-gray-300'"
                                  @click="current = index"></span>
                        </template>
                    </div>
                </div>

                <!-- Desktop Masonry -->
                <div class="hidden md:block columns-2 gap-4">
                    <?php foreach ($images as $img): ?>
                        <img src="<?= esc_url($img['url']); ?>" class="mb-4 rounded-xl w-full break-inside-avoid" />
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>

            <!-- TEXT -->
            <div class="flex flex-col w-full md:w-7/12 gap-3">
           
             <?php if ($eyebrowIcon): ?>
                <img src="<?= esc_url($eyebrowIcon); ?>" alt="Eyebrow Icon" class="w-16 mb-2 rounded-lg">
            <?php endif; ?>


            <?php if ($eyebrow): ?>
                <div class="text-h18 text-primary font-semibold mb-2">
                    <?= esc_html($eyebrow); ?>
                </div>
             <?php endif; ?>
                
                <?php if($heading): ?>
                    <h1 class="text-3xl sm:text-4xl md:text-6xl text-custom-black font-bold leading-snug"
                        style="font-size: <?= esc_attr($titleFontSize); ?>px;">
                        <?= wp_kses_post($heading); ?>
                    </h1>
                <?php endif; ?>

                <?php if ($subheading): ?>
                    <p class="mt-4 text-base sm:text-lg"><?= wp_kses_post($subheading); ?></p>
                <?php endif; ?>

                 <?php if (!empty($bullets)): ?>
                    <ul class="list-disc space-y-2 mt-6">
                        <?php foreach ($bullets as $item): ?>
                            <li class="flex items-center text-base sm:text-lg">
 <?php  if (!empty($item['iconImage']['url'])): ?>
                                <span class="text-green-light mr-2"><img 
                            src="<?= esc_url($item['iconImage']['url']); ?>" 
                           class="  " 
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

                            </li>
 

                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>

                <?php if ($buttonPrimary || $buttonSecondary): ?>
                    <div class="mt-6 flex gap-4 flex-wrap">
                        <?php if ($buttonPrimary): ?>
                            <a href="<?= esc_url($buttonPrimaryUrl); ?>"
                               class="px-6 py-3 bg-green-light hover:bg-green-1 text-white rounded-lg no-underline btn-shadow">
                               <?= wp_kses_post($buttonPrimary); ?>
                            </a>
                        <?php endif; ?>
                        <?php if ($buttonSecondary): ?>
                            <a href="<?= esc_url($buttonSecondaryUrl); ?>"
                               class="px-6 py-3 bg-gray-200 rounded-lg hover:bg-green-1 hover:text-white no-underline btn-offset-shadow">
                               <?= wp_kses_post($buttonSecondary); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>

        <?php else: ?>
            <!-- TEXT FIRST -->
            <div class="flex flex-col w-full md:w-7/12 gap-3">

 
                <?php if ($eyebrowIcon): ?>
                <img src="<?= esc_url($eyebrowIcon); ?>" alt="Eyebrow Icon" class="w-16 mb-2 rounded-lg">
            <?php endif; ?>


            <?php if ($eyebrow): ?>
                <div class="text-h18 text-primary font-semibold mb-2">
                    <?= esc_html($eyebrow); ?>
                </div>
             <?php endif; ?>

                <?php if($heading): ?>
                    <h1 class="text-3xl sm:text-4xl md:text-6xl text-custom-black font-bold leading-snug"
                        style="font-size: <?= esc_attr($titleFontSize); ?>px;">
                        <?= wp_kses_post($heading); ?>
                    </h1>
                <?php endif; ?>

                <?php if ($subheading): ?>
                    <p class="mt-4 text-base sm:text-lg"><?= wp_kses_post($subheading); ?></p>
                <?php endif; ?>

                <?php if (!empty($bullets)): ?>
                    <ul class="list-disc space-y-2 mt-6">
                        <?php foreach ($bullets as $item): ?>
                            <li class="flex items-center text-base sm:text-lg">
 <?php  if (!empty($item['iconImage']['url'])): ?>
                                <span class="text-green-light mr-2"><img 
                            src="<?= esc_url($item['iconImage']['url']); ?>" 
                           class="  " 
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

                            </li>
 

                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>

                <?php if ($buttonPrimary || $buttonSecondary): ?>
                    <div class="mt-6 flex gap-4 flex-wrap">
                        <?php if ($buttonPrimary): ?>
                            <a href="<?= esc_url($buttonPrimaryUrl); ?>"
                               class="px-6 py-3 bg-green-light hover:bg-green-1 text-white rounded-lg no-underline btn-shadow">
                               <?= wp_kses_post($buttonPrimary); ?>
                            </a>
                        <?php endif; ?>
                        <?php if ($buttonSecondary): ?>
                            <a href="<?= esc_url($buttonSecondaryUrl); ?>"
                               class="px-6 py-3 bg-gray-200 rounded-lg hover:bg-green-1 hover:text-white no-underline btn-offset-shadow">
                               <?= wp_kses_post($buttonSecondary); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- IMAGES -->
            <div class="w-full md:w-5/12">
                <?php if (!empty($images) && sizeof($images) > 1){  ?>


                  <div x-data='{
                        current: 0,
                        images: <?= json_encode(array_map(fn($i) => ['url' => $i['url']], $images)); ?>,
                        next() { this.current = (this.current + 2) % this.images.length },
                        prev() { this.current = (this.current - 2 + this.images.length) % this.images.length }
                    

                    }' class="relative w-full overflow-hidden rounded-xl md:hidden">

                        <!-- Slides as 2-column grid -->
                        <template x-for="i in Math.ceil(images.length / 2)" :key="i">
                            <div class="grid grid-cols-2 gap-2">
                                <template x-for="j in 2" :key="j">
                                    <div x-show="current === (i-1)" class="transition-all duration-500">
                                        <img :src="images[(i-1)*2 + j-1]?.url" class="w-full rounded-xl" />
                                    </div>
                                </template>
                            </div>
                        </template>

                        <!-- Arrows -->
                        <button @click="prev()" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-lg">&#8592;</button>
                        <button @click="next()" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-lg">&#8594;</button>

                        <!-- Dots -->
                        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                            <template x-for="(img, index) in images" :key="index">
                                <span class="w-3 h-3 rounded-full cursor-pointer"
                                    :class="current === index ? 'bg-green-500' : 'bg-gray-300'"
                                    @click="current = index"></span>
                            </template>
                        </div>
                    </div>

                <!-- Desktop Masonry -->
                <div class="hidden md:block columns-2 gap-4">
                    <?php foreach ($images as $img): ?>
                        <img src="<?= esc_url($img['url']); ?>" class="mb-4 rounded-xl w-full break-inside-avoid" />
                    <?php endforeach; ?>
                </div>
                
            </div>

              <?php  } else { ?>
                  <img 
                    src="<?= esc_url($images[0]['url']); ?>" 
                    class="mb-4 rounded-xl w-full break-inside-avoid"
                />
                <!-- NO IMAGES -->

        <?php };
        
              endif; ?>

    </div>
</section>

<!-- Alpine.js -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
