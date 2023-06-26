/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { pages } from "@microsoft/teams-js";

export function renderTabConfig(elem, theme) {
    const settingsTemplate = document.createElement("template");
    settingsTemplate["innerHTML"] = `
    <div class="wrapper ${theme}">
        <p class="title">Welcome to Flappy bird!</p>
        <p class="text">Press the save button to continue.</p>
    </div>
    `;
    elem.appendChild(settingsTemplate.content.cloneNode(true));

    // Save the configurable tab
    pages.config.registerOnSaveHandler((saveEvent) => {
        pages.config.setConfig({
            websiteUrl: window.location.origin,
            contentUrl: window.location.origin + "?inTeams=1&view=content",
            entityId: "FlappyBird",
            suggestedDisplayName: "Flappy Bird",
        });
        saveEvent.notifySuccess();
    });

    // Enable the Save button in config dialog
    pages.config.setValidityState(true);
}
