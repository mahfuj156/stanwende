<?php 
$title    = $attributes['title'] ?? ''; 
$subtitle = $attributes['subtitle'] ?? ''; 
$footerTxt = $attributes['footerTxt'] ?? ''; 
$columns  = $attributes['columns'] ?? []; 
$rows     = $attributes['rows'] ?? [];  

if (!is_array($columns)) $columns = []; 
if (!is_array($rows)) $rows = []; 



$sectionColor = $attributes['sectionColor'] ?? '#ffffff';
$paddingTop = $attributes['paddingTop'] ?? 0;
$paddingBottom = $attributes['paddingBottom'] ?? 0;
$titleFontSize = $attributes['titleFontSize'] ?? 46;
$subtitleFontSize = $attributes['subtitleFontSize'] ?? 16;


?>

<section class="py-16 bg-bg2" style="background-color: <?= esc_attr($sectionColor); ?>;  padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem;">
    <div class="max-w-7xl mx-auto px-4">

        <?php if ($title): ?>
            <h2 class="text-h26 font-bold text-custom-black text-left mb-3" style="font-size: <?= esc_attr($titleFontSize); ?>px;">
                <?= wp_kses_post($title); ?>
            </h2>
        <?php endif; ?>

        <?php if ($subtitle): ?>
            <p class="text-left text-p16 text-505250 mb-8  mx-auto  text-custom-black " style="font-size: <?= esc_attr($subtitleFontSize); ?>px;">
                <?= wp_kses_post($subtitle); ?>
              
            </p>
        <?php endif; ?>

        <!-- Table Wrapper -->
        <div class="overflow-x-auto  border-radious-20">
            <table class="w-full min-w-max  bg-white rounded-md shadow-sm  border-bottom-color">
                
                <!-- Header -->
                <thead class="text-center text-sm md:text-base text-gray-700">
                    <tr class="bg-bg1 border-top-color">
                        <?php foreach ($columns as $col): ?>
                            <th class="p-2   align-top">
                                 <div class="flex items-center  text-left">

    <div class="flex flex-col p-2">
        <?php if (!empty($col['title'])): ?>
            <div class="font-bold text-p16 text-secondary leading-150">
                <?= esc_html($col['title']); ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($col['subtitle'])): ?>
            <div class=" text-p16 text-secondary leading-150">
                <?= esc_html($col['subtitle']); ?>
            </div>
        <?php endif; ?>
    </div>

    <div class="ml-2 flex items-center px-2">
        <?php if (!empty($col['iconType']) && $col['iconType'] === 'icon' && !empty($col['icon'])): ?>
            <i class="<?= esc_attr($col['icon']); ?> text-p16 text-secondary leading-150" aria-hidden="true"></i>

        <?php elseif (!empty($col['iconType']) && $col['iconType'] === 'image' && !empty($col['icon'])): ?>
            <img src="<?= esc_url($col['icon']); ?>"
                 class="w-10 md:w-14 h-10 md:h-14 object-contain"
                 alt="">
        <?php endif; ?>
    </div>

</div>

                            </th>
                        <?php endforeach; ?>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody>
                    <?php if (empty($rows)): ?>
                        <tr>
                            <td colspan="<?= max(1, count($columns)); ?>" 
                                class="p-6 text-center text-gray-400 italic">
                                
                            </td>
                        </tr>
                    <?php endif; ?>

                    <?php foreach ($rows as $rIndex => $row): ?>
                        <tr class="border-top-color <?= $rIndex % 2 === 0 ? 'bg-white' : 'bg-FFFDFA'; ?>">
                            <?php 
                                $cells = $row['cells'] ?? [];
                                for ($c = 0; $c < count($columns); $c++): 
                                    $cell = $cells[$c] ?? ['type' => 'text', 'value' => ''];
                            ?>
                                <td class="p-3 md:p-4  text-left whitespace-nowrap text-custom-black <?php if($c==0){echo "font-bold"; }  ?>">

                                    <?php if (($cell['type'] ?? '') === 'text'): ?>
                                        <span class="<?php if($c==0){echo "font-bold"; }  ?>">
                                            <?= esc_html($cell['value'] ?? ''); ?>
                                        </span>

                                    <?php elseif (($cell['type'] ?? '') === 'icon'): ?>
                                        <i class="<?= esc_attr($cell['value']); ?> text-p16 "></i>

                                    <?php else: ?>
                                        <?= esc_html($cell['value'] ?? ''); ?>
                                    <?php endif; ?>

                                </td>
                            <?php endfor; ?>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <?php if($footerTxt): ?>
        <!-- Footer Disclaimer -->
        <p class="text-p14 text-4C4945 mt-6 mb-6 leading-150">   <?= wp_kses_post($footerTxt); ?>
         
        </p>
        <?php endif; ?>

    </div>
</section>
