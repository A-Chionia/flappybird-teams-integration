/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { meeting } from "@microsoft/teams-js";

export async function renderMeetingSidePanel(container, elem, theme) {
    const sideBarTemplate = document.createElement("template");
    sideBarTemplate["innerHTML"] = `
    <div class="wrapper ${theme}">
        <h1>Let's get started</h1>
        <p class="text">Press the share to meeting button to play flappy bird</p>
        <button class="share">Share to meeting</button>
        <div class="divider"></div>
    </div>
    `;
    elem.appendChild(sideBarTemplate.content.cloneNode(true));
    const shareButton = elem.querySelector(".share");

    // Set the value at our dataKey with a random number between 1 and 6.
    shareButton.onclick = shareToStage;
}

// Share dice roller to the meeting stage
function shareToStage() {
    const urlToShare = window.location.origin + "?inTeams=1&view=stage";
    meeting.shareAppContentToStage((error, result) => {
        if (!error) {
            console.log("Started sharing, sharedToStage result");
        } else {
            console.warn("SharingToStageError", error);
        }
    }, urlToShare);
}

