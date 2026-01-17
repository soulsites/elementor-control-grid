<?php
/**
 * Plugin Name: Elementor Control Grid
 * Description: Fügt ein Grid-Overlay-System zum Elementor Live-Editor hinzu
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: elementor-control-grid
 * Requires Plugins: elementor
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Elementor_Control_Grid {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('elementor/editor/after_enqueue_scripts', [$this, 'enqueue_editor_scripts']);
        add_action('elementor/editor/after_enqueue_styles', [$this, 'enqueue_editor_styles']);
    }

    public function enqueue_editor_scripts() {
        wp_enqueue_script(
            'elementor-control-grid',
            plugins_url('assets/js/control-grid.js', __FILE__),
            ['jquery', 'elementor-editor'],
            '1.0.0',
            true
        );

        // Localize script for translations
        wp_localize_script('elementor-control-grid', 'elementorGridControl', [
            'pluginUrl' => plugins_url('', __FILE__),
        ]);
    }

    public function enqueue_editor_styles() {
        wp_enqueue_style(
            'elementor-control-grid',
            plugins_url('assets/css/control-grid.css', __FILE__),
            [],
            '1.0.0'
        );
    }
}

// Initialize the plugin
Elementor_Control_Grid::get_instance();
