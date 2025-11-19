<?php
$title      = $attributes['title'] ?? '';
$metatitle  = $attributes['metatitle'] ?? '';
$subtitle   = $attributes['subtitle'] ?? '';
$category      = $attributes['category'] ?? '';
$numberOfPosts = $attributes['numberOfPosts'] ?? 6;
$order         = $attributes['order'] ?? 'DESC';
$buttonText    = $attributes['buttonText'] ?? '';
$buttonUrl     = $attributes['buttonUrl'] ?? '';

// Set up WP Query to get posts from the selected category
$args = [
    'posts_per_page' => $numberOfPosts,
    'category_name'  => $category,
    'post_status'    => 'publish',
    'order'          => $order,
];
$posts = new WP_Query($args);

// Check if we have posts
if ($posts->have_posts()) :
?>

    <section class="py-20 bg-bg3">
        <div class="max-w-container-wide mx-auto px-4">

          <!-- Title -->

        <?php if ($metatitle): ?>
            <p class="text-center text-lg text-primary font-semibold mb-2">
                <?= wp_kses_post($metatitle); ?>
            </p>
        <?php endif; ?>
        <?php if ($title): ?>
            <h2 class="text-4xl font-bold text-center text-[#0B3B2E]">
                <?= wp_kses_post($title); ?>
            </h2>
        <?php endif; ?>

        <!-- Subtitle -->
        <?php if ($subtitle): ?>
            <p class="text-center text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
                <?= wp_kses_post($subtitle); ?>
            </p>
        <?php endif; ?>


            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                <?php while ($posts->have_posts()) : $posts->the_post(); ?>

                    <article class="bg-white rounded-lg border border-gray-100 hover:shadow-md transition flex flex-col">
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


            
            
            <div class="flex justify-center mb-10 mt-16">
                            
                            <a href="<?= esc_url($buttonUrl); ?>"    class="inline-block faq-button-shadow px-6 py-3 text-p16 font-semibold no-underline rounded-12 shadow-sm"
><?= esc_html($buttonText); ?></a>
 
           </div>

        </div>
    </section>
<?php
    wp_reset_postdata(); // Reset post data
endif;
?>
