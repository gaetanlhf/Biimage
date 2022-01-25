// bi2png
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

pickr.on('save', (color, instance) => {
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
const iconPath = "./node_modules/bootstrap-icons/icons/";
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

function downIcon() {
    if (typeof iconGenerated == "undefined") {
        var errorToast = document.getElementById("errorToast");
        var toast = new bootstrap.Toast(errorToast);
        toast.show();
    } else {
        iconGenerated.download("png", filename + ".png");
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
            var colorString = "#"
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