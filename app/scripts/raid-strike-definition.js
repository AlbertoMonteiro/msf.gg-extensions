import Handlebars from "handlebars";
import html from "../pages/raid-strikes.html"
import $ from "jquery";

const template = Handlebars.compile(html);

export function doRaidStrikeDefinition() {
    const raidColores = ["red", "yellow", "blue", "white", "green", "purple", "orange", "teal"];
    var currentRaidColorIndex = 0;
    var selectedColors = [];
    var currentColorAdded = false;

    $(".raid-info.primary.content button").click(() => {
        currentRaidColorIndex = 0;
        selectedColors = [];
        currentColorAdded = false;
    });

    $("body").click(element => {
        if (!$(element.target).is(".snackbar button.is-dark"))
            return;
        currentRaidColorIndex++;
        currentColorAdded = false;
        if (currentRaidColorIndex == 8) {
            showRaidListTable(selectedColors);
        }
    })

    $("div.raid-wrapper div.node").click(() => {
        if (currentColorAdded) return;
        selectedColors.push(raidColores[currentRaidColorIndex]);
        currentColorAdded = true;
    });
}

function showRaidListTable(selectedColors) {
    var finalHtml = template({
        colors: selectedColors
    });
    console.log(finalHtml);
    var newElement = $(finalHtml);
    debugger;
    $(".raids.container .columns.is-desktop").append(newElement);
}
