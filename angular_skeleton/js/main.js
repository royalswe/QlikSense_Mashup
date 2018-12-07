define([
	'js/qlik',
	'jquery',
    'app',
    'routes'
], function (qlik, $, app) {

    /// Show popup window with errors if any
    qlik.setOnError(function (error) {
        $("#loading-animation").remove(); // Remove loading animation
        $('#popupText').append(error.message + "<br>");
        $('#popup').fadeIn(1000);
    });
    $("#closePopup").click(function () {
        $('#popup').hide();
    });

    app.directive('currentSelections', function (qlikApp) {
        return {
            template: qlikApp.app.getObject('current_selections', 'CurrentSelections').then(function () { 
                $("#loading-animation").remove(); // Remove loading animation
            })       
        };
    });

    

    return app;
});
