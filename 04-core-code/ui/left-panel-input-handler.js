// File: 04-core-code/ui/left-panel-input-handler.js

import { EVENTS, DOM_IDS } from '../config/constants.js';

/**
 * @fileoverview A dedicated input handler for all user interactions within the Left Panel.
 */
export class LeftPanelInputHandler {
    constructor(eventAggregator) {
         this.eventAggregator = eventAggregator;
        console.log("LeftPanelInputHandler Initialized.");
    }

    initialize() {
        this._setupNavigationToggle();
        this._setupTabButtons();
        // [REMOVED] _setupK1Inputs() call moved to K1TabInputHandler
        this._setupK2Inputs();
        // [REMOVED] _setupK3Inputs() call moved to K3TabInputHandler
        // [REMOVED] _setupK4Inputs() (K5 logic) call moved to K5TabInputHandler
        // [REMOVED] _setupK5Inputs() (K4 logic) call moved to K4TabInputHandler
    }

    _setupNavigationToggle() {
        const leftPanelToggle = document.getElementById(DOM_IDS.LEFT_PANEL_TOGGLE);
        if (leftPanelToggle) {
            leftPanelToggle.addEventListener('click', () => {
                this.eventAggregator.publish(EVENTS.USER_NAVIGATED_TO_DETAIL_VIEW);
             });
        }
    }

    _setupTabButtons() {
        const tabContainer = document.querySelector('#left-panel .tab-container');
        if (tabContainer) {
            tabContainer.addEventListener('click', (event) => {
                const target = event.target.closest('.tab-button');
                if (target && !target.disabled) {
                     this.eventAggregator.publish(EVENTS.USER_SWITCHED_TAB, { tabId: target.id });
                }
            });
        }
    }

    // [REMOVED] _setupK1Inputs() method has been cut and moved to K1TabInputHandler.

    _setupK2Inputs() {
        const fabricButton = document.getElementById('btn-focus-fabric');
        if (fabricButton) {
             fabricButton.addEventListener('click', () => {
                 this.eventAggregator.publish(EVENTS.USER_REQUESTED_FOCUS_MODE, { column: 'fabric' });
            });
        }
        const lfButton = document.getElementById('btn-light-filter');
        if (lfButton) {
            lfButton.addEventListener('click', () => {
                this.eventAggregator.publish(EVENTS.USER_REQUESTED_LF_EDIT_MODE);
            });
        }
         const lfDelButton = document.getElementById('btn-lf-del');
        if (lfDelButton) {
            lfDelButton.addEventListener('click', () => {
                this.eventAggregator.publish(EVENTS.USER_REQUESTED_LF_DELETE_MODE);
            });
        }

        // [NEW] Add listener for SSet button
        const sSetButton = document.getElementById('btn-k2-sset');
        if (sSetButton) {
             sSetButton.addEventListener('click', () => {
                this.eventAggregator.publish(EVENTS.USER_REQUESTED_SSET_MODE);
            });
        }


        const batchTable = document.getElementById(DOM_IDS.FABRIC_BATCH_TABLE);
        if (batchTable) {
            batchTable.addEventListener('keydown', (event) => {
                 if (event.key === 'Enter' && event.target.matches('.panel-input')) {
                    event.preventDefault();
                    const input = event.target;
                    this.eventAggregator.publish(EVENTS.PANEL_INPUT_ENTER_PRESSED, {
                         type: input.dataset.type,
                        field: input.dataset.field,
                        value: input.value
                     });
                }
            });
            batchTable.addEventListener('blur', (event) => {
                if (event.target.matches('.panel-input')) {
                    this.eventAggregator.publish(EVENTS.PANEL_INPUT_BLURRED, {
                         type: event.target.dataset.type,
                        field: event.target.dataset.field,
                        value: event.target.value
                    });
                 }
            }, true);
        }
    }

    // [REMOVED] _setupK3Inputs() method has been cut and moved to K3TabInputHandler.

    // [REMOVED] _setupK4Inputs() method (K5 logic) has been cut and moved to K5TabInputHandler.

    // [REMOVED] _setupK5Inputs() method (K4 logic) has been cut and moved to K4TabInputHandler.
}