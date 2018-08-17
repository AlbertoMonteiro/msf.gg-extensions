import Handlebars from "handlebars";
import html from "../pages/raid-strikes.html"
import $ from "jquery";

const template = Handlebars.compile(html);

export function doRaidStrikeDefinition() {
    const raidColores = ["rgb(255, 65, 65)", "yellow", "#5757ff", "white", "green", "#b55ab5", "orange", "teal"];
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
        else if (currentElement.is(".raid-strike-save"))
            saveRaidStrike();
        else if (currentElement.is(".raid-strike-restore"))
            restoreRaidStrike();
        else if (currentElement.is(".raid-info.primary.content button"))
            restartRaidDefinition();
        else if (currentElement.parents("div.raid-wrapper div.node").length > 0)
            registerColorPath();
    });

    function restoreRaidStrike() {
        var raid = $(".menu-list input[type=radio][name=event-select]:checked").closest("label").text();
        let strikeJson = window.localStorage.getItem(`${raid}_raid-strike`.trim());

        try {
            if (strikeJson === null)
                throw undefined;

            let strike = JSON.parse(strikeJson);
            let index = 0;
            let columns = $(".raid-strikes tbody td");

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 3; j++) {
                    const element = strike[j][i];
                    columns.eq(index).text(element);
                    index++;
                }
            }
        } catch (error) {
            alert("There is no STRIKE definition for this raid.");
        }
    }

    function saveRaidStrike() {
        const strikes = [
            [],
            [],
            []
        ];
        $(".raid-strikes tbody td").each((index, element) => {
            strikes[index % 3].push($(element).text());
        });

        var raid = $(".menu-list input[type=radio][name=event-select]:checked").closest("label").text();

        window.localStorage.setItem(`${raid}_raid-strike`.trim(), JSON.stringify(strikes));
        alert('Raid strike saved.');
    }

    function registerColorPath() {
        if (currentColorAdded) return;
        selectedColors.push(raidColores[currentRaidColorIndex]);
        currentColorAdded = true;
    }

    function goToNextColor() {
        currentRaidColorIndex++;
        currentColorAdded = false;
        if (currentRaidColorIndex == 8) {
            setTimeout(() => showRaidListTable(selectedColors), 0);
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
    var newElement = $(finalHtml);

    $(".raids.container .columns.is-desktop").append(newElement);

    setTimeout(() => {
        $(".raid-strikes tbody td").focusin((ele) => {
            if ($(ele.target).text() === "edit here")
                $(ele.target).text("");
        });
    }, 0);
}
