<?php
$title      = $attributes['title'] ?? '';
$subtitle   = $attributes['subtitle'] ?? '';
$buttonText = $attributes['buttonText'] ?? '';
$buttonUrl  = $attributes['buttonUrl'] ?? '#';
$items      = $attributes['testimonials'] ?? [];
?> 


<section class="py-16 bg-bg4 scroll-animate scroll-hidden">
    <div class="max-w-container-wide mx-auto px-4">
        <!-- Title and Subtitle -->
         <?php if(!empty($title)): ?>
        <h2 class="text-h46 leading-114  font-bold text-center mb-2">
            <?= wp_kses_post($title); ?>
        </h2>
        <?php endif; ?>
        <?php if(!empty($subtitle)): ?>
        <p class="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
            <?= wp_kses_post($subtitle); ?>
        </p>
        <?php endif; ?>

        <!-- Button to View All Reviews -->

        <div class="flex justify-center mb-10">
            <?php if(!empty($buttonText)): ?>
            <a 
                class="inline-block bg-primary hover:bg-green-1  shadow-btn-primary text-white px-5 py-3 text-p16 rounded-12 no-underline  text-center"
                href="<?= esc_url($buttonUrl); ?>"
            >
                <?= esc_html($buttonText); ?>  <i class="fa-solid fa-arrow-right-long pl-3"></i>
            </a>
            <?php endif; ?>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
         
                <?php foreach ($items as $index => $item): ?>
                    <div class="bg-white rounded-xl p-8 shadow flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        
                        <!-- Rating -->
                        <div class="flex text-h22 text-gold mb-3">
                            <?= str_repeat("★", intval($item['rating'])); ?>
                            <?= str_repeat("☆", 5 - intval($item['rating'])); ?>
                        </div>

                        <?php 
                            $text      = $item['text'];
                            $has_more  = strlen($text) > 300;
                            $shortText = substr($text, 0, 300);
                            $restText  = substr($text, 300);
                            ?>

                            <!-- Testimonial Text -->
                            <p class="testimonial-text text-info text-p18 leading-150 mb-4" id="testimonial-<?= $index; ?>">
                                <?= esc_html($shortText); ?>

                                <?php if ($has_more): ?>
                                    <span class="dots">...</span>
                                    <span class="more-text hidden"><?= esc_html($restText); ?></span>

                                    <span class="less-more-btn text-warning inline cursor-pointer ml-1"
                                        onclick="toggleText(<?= $index; ?>)">
                                        Lees meer
                                    </span>
                                <?php endif; ?>
                            </p>



                        <!-- Footer -->
                        <div class="flex items-center mt-auto">
                            <?php if (!empty($item['avatar'])): ?>
                                <img src="<?= esc_url($item['avatar']); ?>"
                                    class="w-12 h-12 rounded-full object-cover mr-3" />
                            <?php endif; ?>

                            <div>
                                <p class="text-p16 font-semibold text-info"><?= esc_html($item['name']); ?></p>
                                <p class="text-828382 text-p16"><?= esc_html($item['role']); ?></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

    </div>
</section>

<!-- JavaScript for "Less More" toggle -->
<script>
    function toggleText(id) {
        const container = document.getElementById('testimonial-' + id);

        const moreText = container.querySelector('.more-text');
        const dots = container.querySelector('.dots');
        const btn = container.querySelector('.less-more-btn');

        const isHidden = moreText.classList.contains('hidden');

        if (isHidden) {
            moreText.classList.remove('hidden');
            dots.classList.add('hidden');
            btn.textContent = "Lees minder";
        } else {
            moreText.classList.add('hidden');
            dots.classList.remove('hidden');
            btn.textContent = "Lees meer";
        }
    }

</script>
