<?php
$title       = $attributes['title'] ?? '';
$subtitle    = $attributes['subtitle'] ?? '';

$columns     = $attributes['columns'] ?? []; // last 3 columns
$rows        = $attributes['rows'] ?? [];
?>

<section class="py-16 bg-bg1 scroll-animate scroll-hidden">
    <div class="max-w-7xl mx-auto px-4">
        <!-- Block Title -->
        <?php if ($title): ?>
            <h2 class="text-h46 leading-114 font-bold text-center text-custom-black">
                <?= wp_kses_post($title); ?>
            </h2>
        <?php endif; ?>

         <!-- Subtitle -->
        <?php if ($subtitle): ?>
            <p class="mt-8 text-center text-secondary text-p18 leading-150 max-w-2xl mx-auto mb-12">
                <?= wp_kses_post($subtitle); ?>
            </p>
        <?php endif; ?>

<div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mb-6">
    <div></div> <!-- first column empty -->
    <div class="grid grid-cols-3 gap-2 md:col-span-3">
        <?php foreach ($columns as $col): ?>
            <div class="space-y-2">
                <?php if (!empty($col['icon'])): ?>
                    <img src="<?= esc_url($col['icon']); ?>" alt="" class="mx-auto w-16 md:w-16 object-contain">
                <?php endif; ?>
                <?php if (!empty($col['title'])): ?>
                    <div class="text-h20 font-bold leading-150 text-info"><?= esc_html($col['title']); ?></div>
                <?php endif; ?>
                <?php if (!empty($col['subtitle'])): ?>
                    <div class="text-p16 text-green-1 leading-150"><?= esc_html($col['subtitle']); ?></div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>

        <!-- Rows -->
        <div class="">
            <?php foreach ($rows as $key => $row): ?>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 <?php if($key%2==0) echo 'bg-bg3'; ?> rounded-lg ">
        <!-- First Column (Label) -->
        <div class="text-p16 leading-150 text-info">
            <?= esc_html($row['label'] ?? ''); ?>
        </div>

        <!-- Last 3 Columns -->
        <div class="grid grid-cols-3 gap-2 md:col-span-3 text-center">
            <?php foreach (['col1','col2','col3'] as $colKey): ?>
                <div class="text-p16 leading-150 text-info font-semibold">

               <?php
                $col = $row[$colKey] ?? null;

                if (is_array($col)) {
                    if (($col['type'] ?? '') === 'text') {
                        echo esc_html($col['value'] ?? '');
                    }
                    if (($col['type'] ?? '') === 'icon') {
                        echo '<i class="' . esc_attr($col['value'] ?? '') . ' text-2xl"></i>';
                    }
                }
                ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
<?php endforeach; ?>
        </div>

       
        <!-- Buttons for last 3 columns -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mb-6">
            <div></div> <!-- empty first column -->

            <div class="grid grid-cols-3 gap-2 md:col-span-3">
                <?php foreach ($columns as $col): 
                    $buttonText  = $col['buttonText'] ?? '';
                    $buttonUrl   = $col['buttonUrl'] ?? '';
                    if ($buttonText && $buttonUrl): ?>
                        <div class="flex justify-center mt-2 md:mt-8">
                            <a href="<?= esc_url($buttonUrl); ?>" 
                            class="inline-block faq-button-shadow  hover:bg-green-1 hover:text-white px-6 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm">
                                <?= esc_html($buttonText); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
