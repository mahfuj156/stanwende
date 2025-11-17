<?php
/**
 * Plugin Name: Zero Theme Blocks
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

// Auto-load all blocks (block.json)
add_action("init", function () {

    $blocks = ["hero", "hero-grid","feature-bar","situation-cards","hero-image-labels"];


    foreach ($blocks as $block) {
        register_block_type(__DIR__ . "/src/blocks/$block");
    }
});
