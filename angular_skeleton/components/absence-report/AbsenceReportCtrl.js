define([
    'app'
],
function (app) {
    app.controller('components/AbsenceReportCtrl', function (qlikApp) {
        var app = qlikApp.app;

        app.getObject('QV01', 'rSPWTP');
        app.getObject('QV02', 'maHZMS');
        app.getObject('QV03', 'ErUYAN');
        app.getObject('QV04', 'BVdpat');

    });

});