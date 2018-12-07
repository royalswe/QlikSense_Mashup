/**
 * This directive will select the selections automatically if the attribute "data-selection" is used on the element
 * Note: This directive is not used since AngularListbox extension was created
 */

define([
    'app'
], function (ngApp) {
    ngApp.directive("selection", function (qlikApp) {
        var app = qlikApp.app;

        return function (scope, element, attrs) {
            var isMouseDown = false;
            var valuesArr = [];

            element.on("mousedown", "li", function () {
                    isMouseDown = true; // When mouse goes down, set isDown to true
                    $(this).toggleClass("qlik-hoover-selection");
                    valuesArr.push($(this).data('qsval'));
                })
                .mouseup(function () {
                    isMouseDown = false; // When mouse goes up, set isDown to false
                    app.field(attrs.selection).select(valuesArr, true, false);
                })
                .mouseleave(function () {
                    if (isMouseDown) {
                        isMouseDown = false;
                        app.field(attrs.selection).select(valuesArr, true, false);
                    }
                });


            element.on("mouseover", "li", function () {
                if (isMouseDown) {
                    $(this).toggleClass("qlik-hoover-selection");
                    valuesArr.push($(this).data('qsval'));
                }
            });

        };

    });
});