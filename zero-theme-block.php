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
    "invest-compare",
    "investment-selector",
    "calculator",
    "timeline"
];


    foreach ($blocks as $block) {
        register_block_type(__DIR__ . "/src/blocks/$block");
    }
});

 