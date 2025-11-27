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

$sectionClass      = $attributes['sectionClass'] ?? '';
$sectionColor      = $attributes['sectionColor'] ?? '';
$paddingTop        = $attributes['paddingTop'] ?? 6;
$paddingBottom     = $attributes['paddingBottom'] ?? 6;
$sectionMarginTop  = $attributes['sectionMarginTop'] ?? '0';
$maxContainerWidth = $attributes['maxContainerWidth'] ?? 768;
$cols              = intval($attributes['columns'] ?? 3);


$clientLayout = $attributes['clientLayout'] ?? 'stacked';
$clientFlex = $clientLayout === 'inline' 
    ? 'flex flex-col md:flex-row md:justify-between md:items-center gap-6'
    : 'flex flex-col items-center gap-6';


switch ($cols) {
    case 1:
        $gridClass = 'grid grid-cols-1';
        break;
    case 2:
        $gridClass = 'grid grid-cols-1 sm:grid-cols-2';
        break;
    case 3:
        $gridClass = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
        break;
    case 4:
        $gridClass = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
        break;
    default:
        $gridClass = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
        break;
}
?>

<section 
    class="scroll-animate scroll-hidden <?= esc_attr($sectionClass); ?>"
    style="
        margin-top: <?= esc_attr($sectionMarginTop); ?>px;
        padding-top: <?= esc_attr($paddingTop); ?>rem;
        padding-bottom: <?= esc_attr($paddingBottom); ?>rem;
        background-color: <?= esc_attr($sectionColor); ?>;
    "
>
    <div class="max-w-container-wide mx-auto px-4  " style="max-width: <?= esc_attr($maxContainerWidth); ?>px;">

        <h2 class="text-3xl md:text-4xl font-bold text-center mb-14">
            <?= esc_html($title); ?>
        </h2>

        <div class="<?= esc_attr($gridClass); ?> gap-6" id="faq-accordion">
            <?php foreach ($items as $index => $item): ?>
                <div class="faq-item border-b border-t border-color-[#CCC4B8]" >
                    <button 
                        class="w-full flex justify-between items-center text-left font-semibold text-lg py-3 px-4   faq-toggle"
                        data-faq-index="<?= esc_attr($index); ?>"
                    >
                        <span><?= esc_html($item['question'] ?? ''); ?></span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <div class="faq-answer hidden px-4 py-3 text-gray-600">
                        <?= wp_kses_post($item['answer'] ?? ''); ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Client + Buttons -->

        <div class="<?= esc_attr($clientFlex); ?> mt-12">
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
        <a href="<?= esc_url($buttonUrl); ?>" class="inline-block faq-button-shadow hover:bg-green-1 hover:text-white px-6 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm"><?= esc_html($buttonText); ?></a>
        <span class="text-gray-500 font-medium">Of</span>
        <a href="<?= esc_url($buttonUrl2); ?>" class="inline-block faq-button-shadow hover:bg-green-1 hover:text-white px-6 py-3 font-semibold no-underline text-p16 rounded-12 shadow-sm"><?= esc_html($buttonText2); ?></a>
    </div>
</div>

 
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const faqButtons = document.querySelectorAll('.faq-toggle');

    faqButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.faq-item');
            const answer = parent.querySelector('.faq-answer');
            const icon   = this.querySelector('i');

            document.querySelectorAll('.faq-answer').forEach(a => {
                if (a !== answer) a.classList.add('hidden');
            });
            document.querySelectorAll('.faq-toggle i').forEach(i => {
                if (i !== icon) {
                    i.classList.remove('fa-chevron-up');
                    i.classList.add('fa-chevron-down');
                }
            });

            answer.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        });
    });
});
</script>
