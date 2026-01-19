(function($) {
    'use strict';

    class ElementorGridControl {
        constructor() {
            this.settings = {
                enabled: false,
                rows: 12,
                columns: 12,
                padding: 20,
                fixed: true,
                color: '#ff0000',
                opacity: 0.3,
                lineWidth: 1
            };

            this.isEditor = window.elementorGridControl && window.elementorGridControl.isEditor;
            this.isFrontend = window.elementorGridControl && window.elementorGridControl.isFrontend;
            this.initialized = false;

            this.init();
        }

        init() {
            if (this.isEditor) {
                // Elementor Editor Mode
                this.initEditor();
            } else if (this.isFrontend) {
                // Frontend Mode
                this.initFrontend();
            }
        }

        initEditor() {
            // Try multiple methods to ensure compatibility
            const tryInit = () => {
                if (this.initialized) return;

                // Method 1: Wait for elementor fully loaded
                if (window.elementor && window.elementor.on) {
                    console.log('Elementor Grid: Initializing via elementor.on');
                    this.createGridIcon();
                    this.loadSettings();
                    this.initialized = true;
                    return;
                }

                // Method 2: Wait for jQuery and try again
                if (typeof $ !== 'undefined' && $('#elementor-preview-iframe').length > 0) {
                    console.log('Elementor Grid: Initializing via iframe detection');
                    this.createGridIcon();
                    this.loadSettings();
                    this.initialized = true;
                    return;
                }
            };

            // Try immediately
            $(document).ready(() => {
                tryInit();
            });

            // Try with elementor:init event
            $(window).on('elementor:init', () => {
                console.log('Elementor Grid: elementor:init event fired');
                tryInit();
            });

            // Fallback: Try after a delay
            setTimeout(() => {
                tryInit();
            }, 1000);

            // Final fallback: Try after longer delay
            setTimeout(() => {
                tryInit();
            }, 3000);
        }

        initFrontend() {
            $(document).ready(() => {
                // Hook into admin bar item
                $('#wp-admin-bar-elementor-grid-control a').on('click', (e) => {
                    e.preventDefault();
                    if (!this.initialized) {
                        this.createGridIcon();
                        this.loadSettings();
                        this.initialized = true;
                    }
                    this.toggleModal();
                });

                // Auto-initialize if grid was enabled before
                this.loadSettings();
                if (this.settings.enabled) {
                    this.createGridIcon();
                    this.initialized = true;
                    this.updateGrid();
                }
            });
        }

        createGridIcon() {
            // Check if icon already exists
            if ($('#elementor-grid-control-icon').length > 0) {
                console.log('Elementor Grid: Icon already exists');
                return;
            }

            const $icon = $(`
                <div id="elementor-grid-control-icon" class="elementor-grid-control-icon" title="Grid Overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
            `);

            // Try to add to Elementor panel footer first
            if ($('#elementor-panel-footer-tools').length > 0) {
                console.log('Elementor Grid: Adding icon to panel footer');
                $('#elementor-panel-footer-tools').prepend($icon);
            } else {
                // Fallback: Add as floating button
                console.log('Elementor Grid: Adding icon as floating button');
                $('body').append($icon);
            }

            // Create modal
            this.createModal();

            // Icon click handler
            $icon.on('click', (e) => {
                e.stopPropagation();
                this.toggleModal();
            });

            console.log('Elementor Grid: Icon created successfully');
        }

        createModal() {
            // Check if modal already exists
            if ($('#elementor-grid-control-modal').length > 0) {
                return;
            }

            const $modal = $(`
                <div id="elementor-grid-control-modal" class="elementor-grid-control-modal">
                    <div class="elementor-grid-control-modal-content">
                        <div class="modal-header">
                            <h3>Grid Overlay Einstellungen</h3>
                            <button class="modal-close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="control-group">
                                <label>
                                    <input type="checkbox" id="grid-enabled" ${this.settings.enabled ? 'checked' : ''}>
                                    Grid aktivieren
                                </label>
                            </div>

                            <div class="control-group">
                                <label for="grid-rows">Zeilen (Rows):</label>
                                <input type="number" id="grid-rows" min="1" max="50" value="${this.settings.rows}">
                            </div>

                            <div class="control-group">
                                <label for="grid-columns">Spalten (Columns):</label>
                                <input type="number" id="grid-columns" min="1" max="50" value="${this.settings.columns}">
                            </div>

                            <div class="control-group">
                                <label for="grid-padding">Padding (px):</label>
                                <input type="number" id="grid-padding" min="0" max="200" value="${this.settings.padding}">
                            </div>

                            <div class="control-group">
                                <label for="grid-color">Farbe:</label>
                                <input type="color" id="grid-color" value="${this.settings.color}">
                            </div>

                            <div class="control-group">
                                <label for="grid-opacity">Transparenz:</label>
                                <input type="range" id="grid-opacity" min="0" max="1" step="0.1" value="${this.settings.opacity}">
                                <span class="opacity-value">${this.settings.opacity}</span>
                            </div>

                            <div class="control-group">
                                <label for="grid-line-width">Linienstärke (px):</label>
                                <input type="number" id="grid-line-width" min="1" max="5" value="${this.settings.lineWidth}">
                            </div>

                            <div class="control-group">
                                <label>
                                    <input type="radio" name="grid-position" value="fixed" ${this.settings.fixed ? 'checked' : ''}>
                                    Fixed (bleibt beim Scrollen)
                                </label>
                                <label>
                                    <input type="radio" name="grid-position" value="absolute" ${!this.settings.fixed ? 'checked' : ''}>
                                    Absolute (scrollt mit)
                                </label>
                            </div>

                            <div class="control-actions">
                                <button class="btn-apply">Anwenden</button>
                                <button class="btn-reset">Zurücksetzen</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            $('body').append($modal);

            // Modal event handlers
            $modal.find('.modal-close').on('click', () => this.closeModal());
            $modal.on('click', (e) => {
                if ($(e.target).hasClass('elementor-grid-control-modal')) {
                    this.closeModal();
                }
            });

            // Control event handlers
            $modal.find('#grid-enabled').on('change', (e) => {
                this.settings.enabled = e.target.checked;
                this.updateGrid();
            });

            $modal.find('#grid-rows').on('input', (e) => {
                this.settings.rows = parseInt(e.target.value);
                this.updateGrid();
            });

            $modal.find('#grid-columns').on('input', (e) => {
                this.settings.columns = parseInt(e.target.value);
                this.updateGrid();
            });

            $modal.find('#grid-padding').on('input', (e) => {
                this.settings.padding = parseInt(e.target.value);
                this.updateGrid();
            });

            $modal.find('#grid-color').on('input', (e) => {
                this.settings.color = e.target.value;
                this.updateGrid();
            });

            $modal.find('#grid-opacity').on('input', (e) => {
                this.settings.opacity = parseFloat(e.target.value);
                $modal.find('.opacity-value').text(this.settings.opacity);
                this.updateGrid();
            });

            $modal.find('#grid-line-width').on('input', (e) => {
                this.settings.lineWidth = parseInt(e.target.value);
                this.updateGrid();
            });

            $modal.find('input[name="grid-position"]').on('change', (e) => {
                this.settings.fixed = e.target.value === 'fixed';
                this.updateGrid();
            });

            $modal.find('.btn-apply').on('click', () => {
                this.saveSettings();
                this.closeModal();
            });

            $modal.find('.btn-reset').on('click', () => {
                this.resetSettings();
            });
        }

        toggleModal() {
            const $modal = $('#elementor-grid-control-modal');
            $modal.toggleClass('active');
        }

        closeModal() {
            $('#elementor-grid-control-modal').removeClass('active');
        }

        updateGrid() {
            this.removeGrid();

            if (this.settings.enabled) {
                this.createGrid();
            }

            this.saveSettings();
        }

        createGrid() {
            let $target;

            if (this.isEditor) {
                // In editor, target the preview iframe
                const $preview = $('#elementor-preview-iframe');
                if ($preview.length > 0) {
                    $target = $preview.contents().find('body');
                } else {
                    console.error('Elementor Grid: Preview iframe not found');
                    return;
                }
            } else {
                // In frontend, target the body directly
                $target = $('body');
            }

            // Create canvas for grid
            const canvas = document.createElement('canvas');
            canvas.id = 'elementor-grid-overlay';
            canvas.style.position = this.settings.fixed ? 'fixed' : 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '999999';

            $target.append(canvas);

            this.drawGrid(canvas);

            // Redraw on window resize
            const resizeHandler = () => this.drawGrid(canvas);
            $(window).off('resize.gridControl').on('resize.gridControl', resizeHandler);

            console.log('Elementor Grid: Grid created successfully');
        }

        drawGrid(canvas) {
            let width, height;

            if (this.isEditor) {
                const $preview = $('#elementor-preview-iframe').contents();
                width = $preview.width();
                height = $preview.height();
            } else {
                width = $(window).width();
                height = $(document).height();
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);

            // Set style
            ctx.strokeStyle = this.settings.color;
            ctx.globalAlpha = this.settings.opacity;
            ctx.lineWidth = this.settings.lineWidth;

            const padding = this.settings.padding;
            const usableWidth = width - (padding * 2);
            const usableHeight = height - (padding * 2);

            // Draw vertical lines (columns)
            const columnWidth = usableWidth / this.settings.columns;
            for (let i = 0; i <= this.settings.columns; i++) {
                const x = padding + (i * columnWidth);
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, height - padding);
                ctx.stroke();
            }

            // Draw horizontal lines (rows)
            const rowHeight = usableHeight / this.settings.rows;
            for (let i = 0; i <= this.settings.rows; i++) {
                const y = padding + (i * rowHeight);
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }
        }

        removeGrid() {
            if (this.isEditor) {
                const $preview = $('#elementor-preview-iframe').contents();
                $preview.find('#elementor-grid-overlay').remove();
            } else {
                $('#elementor-grid-overlay').remove();
            }
            $(window).off('resize.gridControl');
        }

        saveSettings() {
            localStorage.setItem('elementor-grid-control-settings', JSON.stringify(this.settings));
            console.log('Elementor Grid: Settings saved', this.settings);
        }

        loadSettings() {
            const saved = localStorage.getItem('elementor-grid-control-settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                console.log('Elementor Grid: Settings loaded', this.settings);
                if (this.settings.enabled && this.initialized) {
                    this.updateGrid();
                }
            }
        }

        resetSettings() {
            this.settings = {
                enabled: false,
                rows: 12,
                columns: 12,
                padding: 20,
                fixed: true,
                color: '#ff0000',
                opacity: 0.3,
                lineWidth: 1
            };

            // Update modal inputs
            const $modal = $('#elementor-grid-control-modal');
            $modal.find('#grid-enabled').prop('checked', this.settings.enabled);
            $modal.find('#grid-rows').val(this.settings.rows);
            $modal.find('#grid-columns').val(this.settings.columns);
            $modal.find('#grid-padding').val(this.settings.padding);
            $modal.find('#grid-color').val(this.settings.color);
            $modal.find('#grid-opacity').val(this.settings.opacity);
            $modal.find('.opacity-value').text(this.settings.opacity);
            $modal.find('#grid-line-width').val(this.settings.lineWidth);
            $modal.find('input[name="grid-position"][value="fixed"]').prop('checked', true);

            this.updateGrid();
        }
    }

    // Initialize the grid control
    new ElementorGridControl();

})(jQuery);
