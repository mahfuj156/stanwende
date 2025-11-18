<?php
$title        = $attributes['title'] ?? '';
$items        = $attributes['items'] ?? [];
$buttonText   = $attributes['buttonText'] ?? '';
$buttonUrl    = $attributes['buttonUrl'] ?? '';
$buttonText2  = $attributes['buttonText2'] ?? '';
$buttonUrl2   = $attributes['buttonUrl2'] ?? '';
$clientName   = $attributes['clientName'] ?? '';
$clientImage  = $attributes['clientImage']['url'] ?? '';
$clientAlt    = $attributes['clientImage']['alt'] ?? $clientName;
?>

<section class="py-16 bg-bg4">
    <div class="max-w-container-wide mx-auto px-4">

        <!-- Title -->
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-14">
            <?= esc_html($title); ?>
        </h2>

        <!-- FAQ List -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="faq-accordion">
            <?php foreach ($items as $index => $item): ?>
                <div class="faq-item border-b border-t">
                    <button 
                        type="button"
                        class="w-full flex justify-between items-center text-left font-semibold text-lg py-3 px-4 hover:bg-gray-100 focus:outline-none faq-toggle"
                        data-faq-index="<?= esc_attr($index); ?>"
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


        <!-- Toch nog vragen? -->
         <div class="mt-16 text-center"> 
            <!-- Profile images --> 
             <div class="flex justify-center items-center mb-8 gap-4"> 
                <div class=" mb-3"> 
                     <?php if ($clientImage): ?>
                    <img 
                        src="<?= esc_url($clientImage); ?>" 
                        alt="<?= esc_attr($clientAlt); ?>" 
                        class=" h-10 rounded-full border-2 border-white shadow-md -mr-3"
                    >
                <?php endif; ?>

                    
                 </div> 
                 <!-- Title --> 
                  <?php if ($clientName): ?>
                   <p class="font-semibold text-lg mb-4"><?= esc_html($clientName); ?></p>
                    <?php endif; ?> 
                </div> 
                <!-- Buttons --> 
                 <div class="flex justify-center items-center gap-4"> 
                    <a class="inline-block faq-button-shadow px-6 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm" href="<?= esc_url($buttonUrl); ?>" > <?= esc_html($buttonText); ?> </a>
                     <span class="text-gray-500 font-medium">Of</span> 
                     <a class="inline-block faq-button-shadow text-black px-6 py-3 font-semibold no-underline text-p16 rounded-12 shadow-sm" href="<?= esc_url($buttonUrl2); ?>" > <?= esc_html($buttonText2); ?> </a> 
                    </div>
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

            // Close others
            faqItems.forEach(item => {
                if (item !== currentFAQ) {
                    item.querySelector('.faq-answer').classList.add('hidden');
                    item.querySelector('i').classList.remove('fa-chevron-up');
                    item.querySelector('i').classList.add('fa-chevron-down');
                }
            });

            // Toggle this one
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
