<?php
/**
 * Plugin Name: SWende Theme Blocks
 * Description: Custom Gutenberg blocks using Tailwind CSS.
 * Version: 1.0
 */

if (!defined('ABSPATH')) exit;

/**
 * Register JS & CSS for Gutenberg Blocks
 */

function ztb_register_block_assets() {
    $js_file = plugin_dir_path(__FILE__) . 'build/index.js';
    $style_file = plugin_dir_path(__FILE__) . 'build/style.css';

    if (file_exists($js_file)) {
        wp_register_script(
            'ztb-blocks-js',
            plugins_url('build/index.js', __FILE__),
            ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'],
            filemtime($js_file)
        );
    }

    if (file_exists($style_file)) {
        wp_register_style(
            'ztb-blocks-css',
            plugins_url('build/style.css', __FILE__),
            [],
            filemtime($style_file)
        );
    }
}
add_action('init', 'ztb_register_block_assets');

function enqueue_font_awesome() {
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        [],
        '6.4.0'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_font_awesome');
add_action('enqueue_block_editor_assets', 'enqueue_font_awesome');
 
 function ztb_enqueue_scroll_animation() {
    wp_add_inline_script(
        'ztb-blocks-js', // attach to your main JS file
        '
        document.addEventListener("DOMContentLoaded", function () {
            const elements = document.querySelectorAll(".scroll-animate");

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fadeUp");
                        entry.target.classList.remove("scroll-hidden");
                        obs.unobserve(entry.target); // stop observing after animation
                    }
                });
            }, { threshold: 0.2 });

            elements.forEach(el => observer.observe(el));
        });
        '
    );
}
add_action('wp_enqueue_scripts', 'ztb_enqueue_scroll_animation');

function ztb_add_inline_styles() {
    $icon_url = plugins_url('src/uploads/arrow-icon.png', __FILE__);

    $css = "
      .after-beforeblock::after { 
        background-image: url('{$icon_url}'); 
      }
    ";

    wp_add_inline_style('ztb-blocks-css', $css);
}
add_action('wp_enqueue_scripts', 'ztb_add_inline_styles');
add_action('enqueue_block_editor_assets', 'ztb_add_inline_styles');


// Auto-load all blocks (block.json)
add_action("init", function () {

    $blocks = ["hero", "hero-grid","feature-bar","situation-cards","hero-image-labels","performance-section",
    "comparison-block"
    ,"testimonial-block",
    "compare-block",
    "faq-block",
    "blog-cards",
    "invest-compare",
    "investment-selector",
    "calculator",
    "special-layout-table",
    "performance-graphs",
    "investment-calculator",
    "contact-us",
    "documents",
    "timeline"
];


    foreach ($blocks as $block) {
        register_block_type(__DIR__ . "/src/blocks/$block");
    }
});

 

/**
 * AJAX: Load category posts for blog block
 */
add_action('wp_ajax_load_category_posts', 'ztb_load_category_posts');
add_action('wp_ajax_nopriv_load_category_posts', 'ztb_load_category_posts');

function ztb_load_category_posts() {

    check_ajax_referer('ztb-ajax-nonce', 'nonce');

    $category = sanitize_text_field($_POST['category']);

    $args = [
        'posts_per_page' => 6,
        'category_name'  => $category,
        'post_status'    => 'publish'
    ];

    $query = new WP_Query($args);

    ob_start();

    if ($query->have_posts()) :
        while ($query->have_posts()) : 
            $query->the_post();
            ?>

            <article class="bg-white rounded-lg border border-gray-100 hover:shadow-xl transition-transform duration-300 hover:scale-105 flex flex-col">

                <?php if (has_post_thumbnail()): ?>
                    <div>
                        <img src="<?= get_the_post_thumbnail_url(); ?>" 
                             class="w-full object-cover rounded-t-lg"
                             alt="<?= esc_attr(get_the_title()); ?>">
                    </div>
                <?php endif; ?>

                <div class="p-6 flex-1 flex flex-col">
                    <?php
                    $categories = get_the_category();
                    $primaryCat = $categories ? $categories[0]->name : '';
                    ?>
                    <div class="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span class="px-3 py-1 rounded-md bg-gray-100 text-info text-p16">
                            <?= esc_html($primaryCat); ?>
                        </span>
                        <span class="text-828382 text-p14 font-bold">
                            <?= get_the_date('j M Y'); ?>
                        </span>
                    </div>

                    <h4 class="font-bold text-h22 text-custom-black"><?= get_the_title(); ?></h4>
                    <p class="text-custom-black text-p16 mt-2">
                        <?= wp_trim_words(get_the_excerpt(), 20); ?>
                    </p>
                </div>
            </article>

            <?php
        endwhile;
    else:
        echo '<p class="text-center text-gray-500 col-span-3">No posts found in this category.</p>';
    endif;

    echo ob_get_clean();
    wp_die();
}

/**
 * Enqueue JS for AJAX category filter
 */
add_action('wp_enqueue_scripts', 'ztb_enqueue_ajax_filter_script');
function ztb_enqueue_ajax_filter_script() {

    wp_enqueue_script(
        'ztb-ajax-category',
        plugin_dir_url(__FILE__) . 'ajax-category.js',
        [],
        null,
        true
    );

    wp_localize_script('ztb-ajax-category', 'ztb_ajax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('ztb-ajax-nonce')
    ]);
}
