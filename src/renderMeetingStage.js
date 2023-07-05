/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { PresenceState, UserMeetingRole } from "@microsoft/live-share";
export async function renderMeetingStage(container, elem, theme) {
    const stageTemplate = document.createElement("template");

//////////////////////////////////////////
    const response = await fetch("game.html");
    const gameTemplate = await response.text();
    stageTemplate.innerHTML = gameTemplate;

    // stageTemplate["innerHTML"] = `
    // <div class="wrapper ${theme} stage">
      
    // </div>
    // `;

    const {presence } = container.initialObjects;

    elem.appendChild(stageTemplate.content.cloneNode(true));
    const wrapperElem = elem.querySelector(".wrapper");
    // await renderScreen(elem, wrapperElem);
    await renderPresenceDiceList(presence, wrapperElem);
}

// async function renderScreen(elem, wrapperElem) {
//     var canvas = wrapperElem.querySelector("#unity-canvas");
//     var progressBarFull = wrapperElem.querySelector("#unity-progress-bar-full");
//     //  ################################ //

//     var buildUrl = "Build";
//     var loaderUrl = buildUrl + "/build.loader.js";
//     var config = {
//         dataUrl: buildUrl + "/build.data",
//         frameworkUrl: buildUrl + "/build.framework.js",
//         codeUrl: buildUrl + "/build.wasm",
//         streamingAssetsUrl: "StreamingAssets",
//         companyName: "DefaultCompany",
//         productName: "FLAPPYBIRD",
//         productVersion: "1.0",
//     };
//     canvas.style.width = "170vh";
//     canvas.style.height = "95vh";
//     // canvas.style.width = "960px";
//     // canvas.style.height = "600px";
//     var script = document.createElement("script");
//     script.src = loaderUrl;
//     script.onload = () => {
//         createUnityInstance(canvas, config, (progress) => {
//             progressBarFull.style.width = 100 * progress + "%";
//         }).catch((message) => {
//             alert(message);
//         });
//     };
//     elem.appendChild(script);
// }


async function renderPresenceDiceList(presence, wrapperElem) {
    // Use the changed event to trigger the rerender whenever the remote value changes.
    presence.on("presenceChanged", (userPresence, local) => {
        if (userPresence.state !== PresenceState.online) {
            presence.update({
                diceValue: presence.diceValue-1,
            });
        }else{
            presence.update({
                diceValue: presence.diceValue+1,
            });
        }
        renderUserDice(presence, wrapperElem);
    });

    // Initialize presence with a custom data object
    await presence.initialize({
        diceValue: 1,
    });
    renderUserDice(presence, wrapperElem)
}

// Render a dice owned by a specific user
async function renderUserDice(presence, wrapperElem) {
    var number = wrapperElem.querySelector("#teams-number");
    number.textContent = String.fromCodePoint(presence.diceValue);
}
