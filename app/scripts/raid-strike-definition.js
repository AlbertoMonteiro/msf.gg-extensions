import Handlebars from "handlebars";
import html from "../pages/raid-strikes.html"
import $ from "jquery";

const template = Handlebars.compile(html);

export function doRaidStrikeDefinition() {
    const raidColores = ["red", "yellow", "blue", "white", "green", "purple", "orange", "teal"];
    var currentRaidColorIndex = 0;
    var selectedColors = [];
    var currentColorAdded = false;

    $(".menu-list input[type=radio][name=event-select]").change(() => {
        $(".raid-strikes").closest(".column").remove();
    });

    $("body").click(element => {
        const currentElement = $(element.target);
        if (currentElement.is(".snackbar button.is-dark"))
            goToNextColor();
        if (currentElement.is(".raid-info.primary.content button"))
            restartRaidDefinition();
        if (currentElement.parents("div.raid-wrapper div.node").length > 0)
            registerColorPath();
    })

    function registerColorPath() {
        if (currentColorAdded) return;
        selectedColors.push(raidColores[currentRaidColorIndex]);
        currentColorAdded = true;
    }

    function goToNextColor() {
        currentRaidColorIndex++;
        currentColorAdded = false;
        if (currentRaidColorIndex == 8) {
            showRaidListTable(selectedColors);
        }
    }

    function restartRaidDefinition() {
        currentRaidColorIndex = 0;
        selectedColors = [];
        currentColorAdded = false;
        $(".raid-strikes").closest(".column").remove();
    }
}

function showRaidListTable(selectedColors) {
    var finalHtml = template({
        colors: selectedColors
    });
    console.log(finalHtml);
    var newElement = $(finalHtml);

    $(".raids.container .columns.is-desktop").append(newElement);
}
