// ==UserScript==
// @name        Maximaal uitbouwen parkeerplaatsen
// @version     1.1.0
// @license     BSD-3-Clause
// @author      BOS-Ernie (origineel) * Aanpassing voor NL door Rene-MKS
// @description Baut alle verfügbaren Stellplätze eines Gebäudes aus.
// @match       https://*.meldkamerspel.com/buildings/*/expand
// @match       https://*.meldkamerspel.com/buildings/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=meldkamerspel.com
// @run-at      document-idle
// @grant       none
// @resource    https://forum.leitstellenspiel.de/index.php?thread/24689-script-stellplatz-erweiterer-by-bos-ernie/
// @downloadURL https://update.greasyfork.org/scripts/476316/%2A%20Stellplatz-Erweiterer.user.js
// @updateURL https://update.greasyfork.org/scripts/476316/%2A%20Stellplatz-Erweiterer.meta.js
// ==/UserScript==

(function () {
  "use strict";

  function renderButton() {
    const expandButton = document.evaluate(
      "//a[text()='Uitbouwen']",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue;

    if (expandButton === null) {
      return;
    }

    const maxExpandButton = document.createElement("a");
    maxExpandButton.classList.add("btn", "btn-info", "btn-xs");
    maxExpandButton.href = expandButton.href + "?level=max";
    maxExpandButton.textContent = "Maximal Uitbouwen $$$";

    expandButton.parentNode.insertBefore(maxExpandButton, expandButton.nextSibling);
  }

  function expand() {
    const expandButtons = document.querySelectorAll("[id^='expand_direct_']");
    expandButtons[expandButtons.length - 1].click();

    const formActionDivs = document.querySelectorAll(".form-actions");
    formActionDivs[formActionDivs.length - 1].firstElementChild.click();
  }

  function main() {
    if (window.location.pathname.match(/\/buildings\/\d+$/) !== null) {
      renderButton();
    }

    const searchString = new URLSearchParams(window.location.search);
    if (window.location.pathname.match(/\/buildings\/\d+\/expand$/) !== null && searchString.get("level") === "max") {
      expand();
    }
  }

  main();
})();
