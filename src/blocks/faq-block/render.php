<?php
$title        = $attributes['title'] ?? '';
$subtitle        = $attributes['subtitle'] ?? '';
$items        = $attributes['items'] ?? [];
$buttonText   = $attributes['buttonText'] ?? '';
$buttonUrl    = $attributes['buttonUrl'] ?? '';
$buttonText2  = $attributes['buttonText2'] ?? '';
$buttonUrl2   = $attributes['buttonUrl2'] ?? '';
$clientName   = $attributes['clientName'] ?? ''; 
$clientImage = $attributes['clientImage'] ?? '';

$sectionClass      = $attributes['sectionClass'] ?? '';
$sectionColor      = $attributes['sectionColor'] ?? '';
$paddingTop        = $attributes['paddingTop'] ?? 6;
$paddingBottom     = $attributes['paddingBottom'] ?? 6;
$sectionMarginTop  = $attributes['sectionMarginTop'] ?? '0';
$maxContainerWidth = $attributes['maxContainerWidth'] ?? 1312;
$cols              = intval($attributes['columns'] ?? 2); 

$clientLayout = $attributes['clientLayout'] ?? 'stacked';
$clientFlex = $clientLayout === 'inline' 
    ? 'flex flex-col md:flex-row md:justify-center md:items-center gap-6'
    : 'flex flex-col items-center gap-6';

 
// Split array
$chunks = array_chunk($items, ceil(count($items) / $cols));

switch ($cols) {
    case 1:
        $gridClass = 'grid grid-cols-1';
        break;
    case 2:
        $gridClass = 'grid grid-cols-1 sm:grid-cols-2';
        break;
    case 3:
        $gridClass = 'grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3';
        break;
    case 4:
        $gridClass = 'grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4';
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

    <?php if($title): ?>
        <h2 class="text-h38 font-bold text-center  <?php if($subtitle):?>mb-4 <?php else: ?> mb-14 <?php endif; ?>">
            <?= wp_kses_post($title); ?>
        </h2>
    <?php endif; ?>

      <?php if($subtitle): ?>
  <p class=" mb-14 text-p16 font-normal text-green-1 text-center" ><?= wp_kses_post($subtitle); ?></p>
  <?php endif; ?>



        <div class="grid grid-cols-1 sm:grid-cols-<?php echo $cols; ?> gap-6">
            <?php foreach ($chunks as $colIndex => $columnItems): ?>
                    <div class="faq-column space-y-6">
                        <?php foreach ($columnItems as $index => $item): ?>
                            <div class="faq-item border-t border-b border-[#CCC4B8]">

                                <button class="w-full flex justify-between items-center text-left font-semibold text-p6 py-3 px-4 faq-toggle">
                                    <span><?= esc_html($item['question']); ?></span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>

                                <div class="faq-answer hidden px-4 py-3 text-gray-600">
                                    <?= wp_kses_post($item['answer']); ?>
                                </div>

                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endforeach; ?>
            </div>

 
        <!-- Client + Buttons --> 

        <div class="<?= esc_attr($clientFlex); ?> mt-12">
    <!-- Client Info -->
    <div class="flex items-center gap-4">
        <?php if ($clientImage): ?>
            <img src="<?php echo esc_url( $clientImage ); ?>" alt="<?php echo esc_attr( $clientName ); ?>" class="faq-client-image" />
 
        <?php endif; ?>
        <?php if ($clientName): ?>
            <p class="font-semibold text-lg"><?= esc_html($clientName); ?></p>
        <?php endif; ?>
    </div>

    <!-- Buttons -->
    <div class="flex flex-wrap justify-center md:justify-end items-center gap-4">
        <?php if($buttonText2): ?>
        <a href="<?= esc_url($buttonUrl); ?>" class="inline-block faq-button-shadow hover:bg-green-1 hover:text-white px-3 py-2 text-p16 font-semibold no-underline rounded-12 shadow-sm"><?= wp_kses_post($buttonText); ?></a>
         <?php endif; ?>
        <?php if($buttonText): ?>

        <span class="text-gray-500 font-medium">Of</span>
        <a href="<?= esc_url($buttonUrl2); ?>" class="inline-block faq-button-shadow hover:bg-green-1 hover:text-white px-3 py-2 font-semibold no-underline text-p16 rounded-12 shadow-sm"><?= wp_kses_post($buttonText2); ?></a>
        <?php endif; ?>
    </div>
</div>

 
    </div>
</section>

<script>


document.addEventListener('DOMContentLoaded', function() {
    const faqButtons = document.querySelectorAll('.faq-toggle');

    faqButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const column = this.closest('.faq-column'); // <-- important
            const answer = item.querySelector('.faq-answer');
            const icon = this.querySelector('i');

            // Close only in the same column
            column.querySelectorAll('.faq-answer').forEach(a => {
                if (a !== answer) a.classList.add('hidden');
            });

            column.querySelectorAll('.faq-toggle i').forEach(i => {
                if (i !== icon) {
                    i.classList.remove('fa-chevron-up');
                    i.classList.add('fa-chevron-down');
                }
            });

            // Toggle clicked item
            answer.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        });
    });
});

 
</script>
