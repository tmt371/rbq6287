// File: 04-core-code/ui/left-panel-component.js

import { DOM_IDS } from '../config/constants.js';

/**
 * @fileoverview A dedicated component for managing and rendering the Left Panel UI.
 */
export class LeftPanelComponent {
    constructor(panelElement) {
        if (!panelElement) {
            throw new Error("Panel element is required for LeftPanelComponent.");
        }
        this.panelElement = panelElement;
        this.panelToggle = document.getElementById(DOM_IDS.LEFT_PANEL_TOGGLE);

        // Cache all DOM elements in the constructor.
        // [REMOVED] K1 DOM Caching moved to K1TabComponent
        this.fabricColorButton = document.getElementById('btn-focus-fabric');
        this.lfButton = document.getElementById('btn-light-filter');
        this.lfDelButton = document.getElementById('btn-lf-del');
        // [NEW] Cache the SSet button
         this.k2SSetButton = document.getElementById('btn-k2-sset');
        // [REMOVED] K3 DOM Caching moved to K3TabComponent
        // [REMOVED] K4 DOM Caching moved to K4TabComponent
        // [REMOVED] K5 DOM Caching moved to K5TabComponent
        this.tabButtons = this.panelElement.querySelectorAll('.tab-button');
        this.tabContents = this.panelElement.querySelectorAll('.tab-content');
        
        console.log("LeftPanelComponent Initialized.");
    }

    render(uiState, quoteData) {
        this._updateTabStates(uiState);
        this._updatePanelButtonStates(uiState, quoteData);
    }

    _updateTabStates(uiState) {
        const { activeEditMode, activeTabId, dualChainMode, driveAccessoryMode } = uiState;
        const isInEditMode = activeEditMode !== null || dualChainMode !== null || driveAccessoryMode !== null;
        const activeTabButton = document.getElementById(activeTabId);
        const activeContentTarget = activeTabButton ? activeTabButton.dataset.tabTarget : null;

        this.tabButtons.forEach(button => {
            const isThisButtonActive = button.id === activeTabId;
            button.classList.toggle('active', isThisButtonActive);
            button.disabled = isInEditMode && !isThisButtonActive;
        });

        if (this.panelToggle) {
            this.panelToggle.style.pointerEvents = isInEditMode ? 'none' : 'auto';
            this.panelToggle.style.opacity = isInEditMode ? '0.5' : '1';
        }

        this.tabContents.forEach(content => {
            const isThisContentActive = activeContentTarget && `#${content.id}` === activeContentTarget;
            content.classList.toggle('active', isThisContentActive);
        });
        
        const panelBgColors = {
            'k1-tab': 'var(--k1-bg-color)',
            'k2-tab': 'var(--k2-bg-color)',
            'k3-tab': 'var(--k3-bg-color)',
            'k4-tab': 'var(--k4-bg-color)',
            'k5-tab': 'var(--k5-bg-color)',
        };
        this.panelElement.style.backgroundColor = panelBgColors[activeTabId] || 'var(--k1-bg-color)';
    }

    _updatePanelButtonStates(uiState, quoteData) {
        const { 
            activeEditMode, locationInputValue,
            dualChainMode, targetCell, dualChainInputValue,
            driveAccessoryMode, driveRemoteCount, driveChargerCount, driveCordCount,
            driveWinderTotalPrice, driveMotorTotalPrice, driveRemoteTotalPrice, driveChargerTotalPrice, driveCordTotalPrice,
            driveGrandTotal,
            summaryWinderPrice, summaryMotorPrice,
            summaryRemotePrice, summaryChargerPrice, summaryCordPrice, summaryAccessoriesTotal
        } = uiState;

        // [CORRECTED] Read lfModifiedRowIndexes from its new location in quoteData.uiMetadata.
        const lfModifiedRowIndexes = quoteData.uiMetadata?.lfModifiedRowIndexes || [];
        
        const currentProductKey = quoteData.currentProduct;
        const productData = quoteData.products[currentProductKey];
        const items = productData.items;
        const accessoriesSummary = productData.summary.accessories || {};

        // --- K1 Location Input State ---
        // [REMOVED] K1 rendering logic moved to K1TabComponent
        
        // [MODIFIED] Implement strict mutual exclusion for K2 buttons
        const isFCMode = activeEditMode === 'K2';
        const isLFSelectMode = activeEditMode === 'K2_LF_SELECT';
        const isLFDeleteMode = activeEditMode === 'K2_LF_DELETE_SELECT';
        const isSSetMode = activeEditMode === 'K2_SSET_SELECT';
        const isAnyK2ModeActive = isFCMode || isLFSelectMode || isLFDeleteMode || isSSetMode;

        // [REMOVED] K1 button logic moved to K1TabComponent
        
        if (this.fabricColorButton) {
            this.fabricColorButton.classList.toggle('active', isFCMode);
            this.fabricColorButton.disabled = isAnyK2ModeActive && !isFCMode;
        }
        if (this.lfButton) {
            this.lfButton.classList.toggle('active', isLFSelectMode);
            this.lfButton.disabled = isAnyK2ModeActive && !isLFSelectMode;
        }
         if (this.lfDelButton) {
            const hasLFModified = lfModifiedRowIndexes.length > 0;
            this.lfDelButton.classList.toggle('active', isLFDeleteMode);
            // Button is disabled if ANY K2 mode is active (and it's not this one), OR if no LF-modified rows exist
            this.lfDelButton.disabled = (isAnyK2ModeActive && !isLFDeleteMode) || !hasLFModified;
        }
        if (this.k2SSetButton) {
             this.k2SSetButton.classList.toggle('active', isSSetMode);
            this.k2SSetButton.disabled = isAnyK2ModeActive && !isSSetMode;
        }

        // --- K3 Button Active/Disabled States ---
        // [REMOVED] K3 rendering logic moved to K3TabComponent

        const formatPrice = (price) => (typeof price === 'number') ? `$${price.toFixed(0)}` : '';

        // --- K4 (Drive/Accessories) States ---
        // [REMOVED] K4 rendering logic moved to K4TabComponent

        // --- K5 (Dual/Chain & Summary) States ---
        // [REMOVED] K5 rendering logic moved to K5TabComponent
    }
}