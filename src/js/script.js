// Biimage
// Copyright (C) 2022 Gaëtan LE HEURT-FINOT

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import "@simonwep/pickr/dist/themes/nano.min.css";
import "choices.js/public/assets/styles/choices.min.css"
import "github-fork-ribbon-css/gh-fork-ribbon.css"
import "../css/style.css"

window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
import Pickr from "@simonwep/pickr";
import Choices from "choices.js";

const pickr = Pickr.create({
    el: "#iconColor",
    theme: "nano",
    defaultRepresentation: "HEX",
    outputPrecision: 0,
    swatches: null,
    default: "#000000",
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
        }
    }
});

pickr.on("init", instance => {
    const {
        result
    } = instance.getRoot().interaction;
    result.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            instance.applyColor();
            instance.hide();
        }
    }, {
        capture: true
    });
});

pickr.on("save", (color, instance) => {
    instance.hide();
    updateIconColor();
});

const choice = new Choices("#iconName", {
    searchPlaceholderValue: "Icon name",
    renderChoiceLimit: "10",
    placeholder: true,
    placeholderValue: "Icon name",
    allowHTML: false
});

choice.setChoices(function() {
    return fetch("list.json").then(function(response) {
        return response.json();
    }).then(function(data) {
        return data.map(function(icon) {
            return {
                label: icon.name,
                value: icon.path
            };
        });
    });
});

var iconGenerated;
const iconPath = "./icons/";
var filename;
var preview = document.getElementById("preview");
var iconSize = 100;
document.getElementById("iconSizeRange").value = iconSize;
document.getElementById("iconSizeInput").value = iconSize;
var iconSize = document.getElementById("iconSizeRange").value;
var iconColor = pickr.getColor().toHEXA();

function updateIconSize(e) {
    iconSize = e.value;
    document.getElementById("iconSizeRange").value = iconSize;
    document.getElementById("iconSizeInput").value = iconSize;
    let previewEle = document.getElementById("preview");
    previewEle.style.width = iconSize + "px";
    previewEle.style.height = iconSize + "px";
    updatePreview();
}

function updateIconColor() {
    iconColor = pickr.getColor().toHEXA();
    updatePreview();
}

function downIcon(type) {
    if (typeof iconGenerated == "undefined") {
        let errorToast = document.getElementById("errorToast");
        let toast = new bootstrap.Toast(errorToast);
        toast.show();
    } else {
        let successToast = document.getElementById("successToast");
        let toast = new bootstrap.Toast(successToast);
        toast.show();
        switch (type) {
            case 0:
                iconGenerated.download("png", filename + ".png");
                break;
            case 1:
                iconGenerated.download("svg", filename + ".svg");
                break;
        }
    }
}

function updatePreview() {
    let dropdown = document.querySelector("#iconName");
    let selectedUrl = dropdown.value;
    if (selectedUrl.length != 0) {
        let selectedText = dropdown.options[dropdown.selectedIndex].text;
        if (iconSize.length != "") {
            filename = selectedText;
            preview.innerHTML = "";
            let colorString = "#"
            let i = 0;
            for (i = 0; i < iconColor.length; i++) {
                colorString += iconColor[i];
            }
            Pablo(preview).load(iconPath + selectedUrl, function(icon) {
                icon.attr({
                    width: iconSize + "px",
                    height: iconSize + "px",
                    fill: colorString
                });
                iconGenerated = icon;
            });
        }
    }
}

window.updateIconSize = updateIconSize;
window.updateIconColor = updateIconColor;
window.updatePreview = updatePreview;
window.downIcon = downIcon;