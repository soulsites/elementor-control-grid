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
        // Elementor Editor
        add_action('elementor/editor/after_enqueue_scripts', [$this, 'enqueue_editor_scripts']);
        add_action('elementor/editor/after_enqueue_styles', [$this, 'enqueue_editor_styles']);

        // Frontend for logged in users
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_scripts']);
        add_action('admin_bar_menu', [$this, 'add_admin_bar_item'], 100);
    }

    public function enqueue_editor_scripts() {
        wp_enqueue_script(
            'elementor-control-grid',
            plugins_url('assets/js/control-grid.js', __FILE__),
            ['jquery'],
            '1.0.1',
            true
        );

        wp_localize_script('elementor-control-grid', 'elementorGridControl', [
            'pluginUrl' => plugins_url('', __FILE__),
            'isEditor' => true,
            'isFrontend' => false,
        ]);
    }

    public function enqueue_editor_styles() {
        wp_enqueue_style(
            'elementor-control-grid',
            plugins_url('assets/css/control-grid.css', __FILE__),
            [],
            '1.0.1'
        );
    }

    public function enqueue_frontend_scripts() {
        // Only load for logged in users
        if (!is_user_logged_in()) {
            return;
        }

        wp_enqueue_script(
            'elementor-control-grid-frontend',
            plugins_url('assets/js/control-grid.js', __FILE__),
            ['jquery'],
            '1.0.1',
            true
        );

        wp_localize_script('elementor-control-grid-frontend', 'elementorGridControl', [
            'pluginUrl' => plugins_url('', __FILE__),
            'isEditor' => false,
            'isFrontend' => true,
        ]);

        wp_enqueue_style(
            'elementor-control-grid-frontend',
            plugins_url('assets/css/control-grid.css', __FILE__),
            [],
            '1.0.1'
        );
    }

    public function add_admin_bar_item($admin_bar) {
        if (!is_user_logged_in()) {
            return;
        }

        $admin_bar->add_menu([
            'id'    => 'elementor-grid-control',
            'title' => '<span class="ab-icon dashicons dashicons-grid-view"></span><span class="ab-label">Grid Overlay</span>',
            'href'  => '#',
            'meta'  => [
                'title' => 'Grid Overlay anzeigen',
                'class' => 'elementor-grid-control-admin-bar',
            ],
        ]);
    }
}

// Initialize the plugin
Elementor_Control_Grid::get_instance();
