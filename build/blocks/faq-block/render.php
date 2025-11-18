<?php
$title      = $attributes['title'] ?? '';
$items      = $attributes['items'] ?? [];
$buttonText = $attributes['buttonText'] ?? '';
$buttonUrl  = $attributes['buttonUrl'] ?? '';
?>

<section class="py-16 bg-bg4">
    <div class="max-w-container-wide mx-auto px-4">

        <h2 class="text-3xl md:text-4xl font-bold text-center mb-14">
            <?= esc_html($title); ?>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="faq-accordion">
            <?php foreach ($items as $index => $item): ?>
                <div class="faq-item border-b border-t ">
                    <button 
                        type="button"
                        class="w-full flex justify-between items-center text-left font-semibold text-lg py-3 px-4 hover:bg-gray-100 focus:outline-none faq-toggle"
                        data-faq-index="<?= $index ?>"
                    >
                        <span><?= esc_html($item['question'] ?? ''); ?></span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <div class="faq-answer hidden mt-3 text-gray-600">
                        <?= wp_kses_post($item['answer'] ?? ''); ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="flex justify-center mt-12 gap-4">
            <a 
                class="inline-block bg-828382 text-white px-6 py-3 text-p16 rounded-12 no-underline shadow-btn-primary"
                href="<?= esc_url($buttonUrl); ?>"
            >
                <?= esc_html($buttonText); ?> 
            </a>
            <a 
                class="inline-block bg-828382 text-white px-6 py-3 text-p16 rounded-12 no-underline shadow-btn-primary"
                href="<?= esc_url($buttonUrl); ?>"
            >
                <?= esc_html($buttonText); ?> 
            </a>
        </div>

    </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
        const faqButtons = document.querySelectorAll('.faq-toggle');
        
        faqButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentFAQ = this.closest('.faq-item');
                const answer = currentFAQ.querySelector('.faq-answer');
                const icon = this.querySelector('i');

                // Close all other open answers
                faqItems.forEach(item => {
                    if (item !== currentFAQ) {
                        item.querySelector('.faq-answer').classList.add('hidden');
                        item.querySelector('i').classList.remove('fa-chevron-up');
                        item.querySelector('i').classList.add('fa-chevron-down');
                    }
                });

                // Toggle the clicked FAQ
                if (answer.classList.contains('hidden')) {
                    answer.classList.remove('hidden');
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    answer.classList.add('hidden');
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
    });
</script>
