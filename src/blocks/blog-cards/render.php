<?php
$title      = $attributes['title'] ?? '';
$metatitle  = $attributes['metatitle'] ?? '';
$subtitle   = $attributes['subtitle'] ?? '';
$category      = $attributes['category'] ?? '';
$numberOfPosts = $attributes['numberOfPosts'] ?? 6;
$order         = $attributes['order'] ?? 'DESC';
$buttonText    = $attributes['buttonText'] ?? '';
$buttonUrl     = $attributes['buttonUrl'] ?? '';


$sectionClass      = $attributes['sectionClass'] ?? '';
$sectionBGColor      = $attributes['sectionBGColor'] ?? '#E4ECE5';
$paddingTop      = $attributes['paddingTop'] ?? 5;
$paddingBottom      = $attributes['paddingBottom'] ?? 5;
$sectionMarginTop      = $attributes['sectionMarginTop'] ?? '';
$containerMaxWidth      = $attributes['containerMaxWidth'] ?? '1312';
$textAlignment      = $attributes['textAlignment'] ?? '';
$showCategory      = $attributes['showCategory'] ?? '';
$showPagination      = $attributes['showPagination'] ?? '';


$paged = get_query_var('paged') ? get_query_var('paged') : 1;
// Set up WP Query to get posts from the selected category
$args = [
    'posts_per_page' => $numberOfPosts,
    'category_name'  => $category,
    'post_status'    => 'publish',
    'order'          => $order,
    'paged'          => $paged,
];
$posts = new WP_Query($args);

// Check if we have posts
if ($posts->have_posts()) :
?>

    <section class="py-20 bg-bg3 scroll-animate scroll-hidden  <?= esc_attr($sectionClass); ?>" style=" background-color: <?= esc_attr($sectionBGColor); ?>; padding-top: <?= esc_attr($paddingTop); ?>rem; padding-bottom: <?= esc_attr($paddingBottom); ?>rem; margin-top: <?= esc_attr($sectionMarginTop); ?>px;">
        <div class="max-w-container-wide mx-auto px-4"  style="max-width: <?= esc_attr($containerMaxWidth); ?>px;">

          <!-- Title -->

        <?php if ($metatitle): ?>
            <p class="text-<?= esc_html($textAlignment); ?> text-p16 text-primary font-semibold mb-2">
                <?= wp_kses_post($metatitle); ?>
            </p>
        <?php endif; ?>
        <?php if ($title): ?>
            <h2 class="text-h38 leading-120 font-bold text-<?= esc_html($textAlignment); ?> text-[#0B3B2E]">
                <?= wp_kses_post($title); ?>
            </h2>
        <?php endif; ?>

        <!-- Subtitle -->
        <?php if ($subtitle): ?>
            <p class="text-<?= esc_html($textAlignment); ?> text-p18 text-gray-600 mt-6 ">
                <?= wp_kses_post($subtitle); ?>
            </p>
        <?php endif; ?>

        <?php if ($showCategory ==='Yes'): ?>
        <div class="flex flex-wrap justify-<?= esc_html($textAlignment); ?> gap-3 mt-10">
            <?php
            
              $all_categories = get_categories([
                'orderby' => 'name',
                'order'   => 'ASC'
            ]);

            foreach ($all_categories as $cat): ?>
                <button
                    class="cat-btn inline-block faq-button-shadow   hover:bg-green-1    hover:text-white px-5 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm"
               
                    data-category="<?= esc_attr($cat->slug); ?>"
                >
                    <?= esc_html($cat->name); ?>
                </button>
            <?php endforeach; ?>
        </div>
         <?php endif; ?>

        <?php if ($posts->have_posts()): ?>

            <div  id="post-results" class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                <?php while ($posts->have_posts()) : $posts->the_post(); ?>

                    <article class="bg-white rounded-lg border border-gray-100 hover:shadow-md transition flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
  <?php
                    $categories = get_the_category();
                    $primaryCat = $categories ? $categories[0]->name : '';
                    ?>
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="mb-4">
                                <img src="<?= get_the_post_thumbnail_url(); ?>" alt="<?= get_the_title(); ?>" class="w-full  object-cover rounded-t-lg">
                            </div>
                        <?php endif; ?>
                        <div class="p-6 flex-1 flex flex-col">
                              <!-- Category + Date -->
                        <div class="flex items-center gap-3 text-sm text-gray-500 mb-3">
                            <span class="px-3 py-1  rounded-md  light-gray-btn   text-p16 leading-140   text-info">
                                <?= esc_html($primaryCat); ?>
                            </span>
                            <span class="text-828382 text-p14 leading-140 font-bold"><?= get_the_date('j M Y'); ?></span>
                        </div>
                            <h4 class="font-bold text-h22 text-custom-black"><?= get_the_title(); ?></h4>
                            <p class="text-custom-black text-p16 leading-140 mt-2"><?= wp_trim_words(get_the_excerpt(), 20); ?></p>

                        </div>
                    </article>
                <?php endwhile; ?>
            </div>


            
            
             <!-- ========================== -->
            <!-- PAGINATION                 -->
            <!-- ========================== -->
<?php if($showPagination=='Yes'): ?>
           <div class="flex justify-center mt-16 mb-10">
    <ul class="flex items-center gap-4">

        <?php
        $links = paginate_links([
            'total'   => $posts->max_num_pages,
            'current' => $paged,
            'prev_text' => '&lsaquo; Vorige',
            'next_text' => 'Volgende &rsaquo;',
            'type'    => 'array',
        ]);

        if ($links):
            foreach ($links as $link):

                $is_current = strpos($link, 'current') !== false;
                $is_prev    = str_contains($link, 'Vorige');
                $is_next    = str_contains($link, 'Volgende');

                // Extract URL safely (if exists)
                preg_match('/href="([^"]+)"/', $link, $matches);
                $href = $matches[1] ?? null; // <— safe fallback

                // =======================
                // PREV / NEXT BUTTONS
                // =======================
                if ($is_prev || $is_next):

                    // Disabled (no <a>)
                    if (!$href):
                        echo '<li><span    class="inline-block faq-button-shadow  hover:bg-green-1 hover:text-white px-5 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm">'
                                . wp_strip_all_tags($link) .
                             '</span></li>';
                    else:
                        echo '<li><a href="'. esc_url($href) .'" 
                                   class="inline-block faq-button-shadow  hover:bg-green-1 hover:text-white px-5 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm">'
                                . wp_strip_all_tags($link) .
                             '</a></li>';
                    endif;

                    continue;
                endif;


                // =======================
                // CURRENT PAGE
                // =======================
                if ($is_current):
                    echo '<li><span    class="inline-block light-gray-btn  hover:bg-green-1 hover:text-white px-5 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm">'
                            . wp_strip_all_tags($link) .
                         '</span></li>';
                    continue;
                endif;


                // =======================
                // NORMAL PAGE NUMBER
                // =======================
                if ($href):
                    echo '<li><a href="'. esc_url($href) .'"
                            class="text-gray-700 hover:text-black transition  px-5 py-3 text-p16 font-semibold no-underline">'
                            . wp_strip_all_tags($link) .
                         '</a></li>';
                else:
                    // Handles cases like "..." ellipsis
                    echo '<li><span class="text-gray-400">'
                            . wp_strip_all_tags($link) .
                         '</span></li>';
                endif;

            endforeach;
        endif;
        ?>

    </ul>
</div>

<?php endif; ?>

        <?php endif; ?>
<?php if($buttonText): ?>
            <div class="flex justify-center mb-10 mt-16">
                            
                            <a href="<?= esc_url($buttonUrl); ?>"    class="inline-block faq-button-shadow  hover:bg-green-1 hover:text-white px-5 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm"
><?= esc_html($buttonText); ?></a>
 
           </div>
           <?php endif; ?>

        </div>
    </section>
<?php
    wp_reset_postdata(); // Reset post data
endif;
?>
