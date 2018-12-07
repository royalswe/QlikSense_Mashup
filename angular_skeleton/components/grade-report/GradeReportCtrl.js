define([
    'app'
],
function (app) {
    app.controller('components/GradeReportCtrl', function (qlikApp) {
        var app = qlikApp.app;

        app.getObject('QV01', 'TbFwkXJ');

    });

});