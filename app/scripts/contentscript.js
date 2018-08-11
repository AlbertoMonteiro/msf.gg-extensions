// Enable chromereload by uncommenting this line:
//import 'chromereload/devonly'
import $ from "jquery";
import { doRaidStrikeDefinition } from "./raid-strike-definition";

var currentPath = window.location.pathname;

$(() => onLoad());

window.setInterval(() => {
  if (currentPath != window.location.pathname) {
    currentPath = window.location.pathname;
    onLoad();
  }
}, 50);

function onLoad(evt) {
  doRaidStrikeDefinition();
  /*
  if (window.location.pathname.indexOf("/raids/raid_") !== -1) {
    var element = $(".raid-details.primary");

    //var currentOuter = element;

    var columns = $("<div>").addClass("columns");

    var firstColumn = $("<div>").addClass("column");
    firstColumn.append(element.clone());

    var secondColumn = $("<div>").addClass("column");
    var content = $("<div>").addClass(["raid-details", "primary"])
      .append($("<h2>").text("how to beat this"))
      .append($("<p class='raid-description'>Battle against wild group of Winter Soldiers.</p>"))
      .append($("<iframe width='560' height='315' src='https://www.youtube.com/embed/Q5HfHSePq2I' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"));
    //TODO: get the right video for this
    secondColumn.append(content);

    columns.append(firstColumn);
    columns.append(secondColumn);

    element.replaceWith(columns);
  }*/
}
