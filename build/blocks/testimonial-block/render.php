<?php
$title      = $attributes['title'] ?? '';
$subtitle   = $attributes['subtitle'] ?? '';
$buttonText = $attributes['buttonText'] ?? '';
$buttonUrl  = $attributes['buttonUrl'] ?? '#';
$items      = $attributes['testimonials'] ?? [];
?> 


<section class="py-16 bg-bg4">
    <div class="max-w-container-wide mx-auto px-4">
        <!-- Title and Subtitle -->
        <h2 class="text-h46 leading-114  font-bold text-center mb-2">
            <?= wp_kses_post($title); ?>
        </h2>
        <p class="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
            <?= wp_kses_post($subtitle); ?>
        </p>

        <!-- Button to View All Reviews -->
        <div class="flex justify-center mb-10">
            <a 
                class="inline-block bg-primary text-white px-5 py-3 text-p16 rounded-12 no-underline shadow-btn-primary text-center"
                href="<?= esc_url($buttonUrl); ?>"
            >
                <?= esc_html($buttonText); ?>  <i class="fa-solid fa-arrow-right-long pl-3"></i>
            </a>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <?php foreach ($items as $index => $item): ?>
                    <div class="bg-white rounded-xl p-8 shadow flex flex-col h-full">
                        
                        <!-- Rating -->
                        <div class="flex text-h22 text-gold mb-3">
                            <?= str_repeat("★", intval($item['rating'])); ?>
                            <?= str_repeat("☆", 5 - intval($item['rating'])); ?>
                        </div>

                        <?php 
                            $text      = $item['text'];
                            $has_more  = strlen($text) > 313;
                            $shortText = substr($text, 0, 313);
                            $restText  = substr($text, 313);
                            ?>

                            <!-- Testimonial Text -->
                            <p class="testimonial-text text-info text-p18 leading-140 mb-4" id="testimonial-<?= $index; ?>">
                                <?= esc_html($shortText); ?>

                                <?php if ($has_more): ?>
                                    <span class="dots">...</span>
                                    <span class="more-text"><?= esc_html($restText); ?></span>
                                <?php endif; ?>
                            </p>

                            <?php if ($has_more): ?>
                                <button class="text-primary display-inline less-more-btn" onclick="toggleText(<?= $index; ?>)">Lees meer</button>
                            <?php endif; ?>
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
        const textElement = document.getElementById('testimonial-' + id);
        const moreText = textElement.querySelector('.more-text');
        const dots = textElement.querySelector('.dots');
        const btn = textElement.nextElementSibling;

        if (moreText.style.display === "none") {
            moreText.style.display = "inline";
            dots.style.display = "none";
            btn.textContent = "Lees minder";
        } else {
            moreText.style.display = "none";
            dots.style.display = "inline";
            btn.textContent = "Lees meer";
        }
    }
</script>
