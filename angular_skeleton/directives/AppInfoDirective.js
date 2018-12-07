define([
    'js/qlik',
    'app',
    'jquery'
], function (qlik, app, $) {
    app.controller('AppInfoCtrl', ['qlikApp', '$scope', function (qlikApp, $scope) {
        function AppInfo(app) {
            app.getAppLayout(function (layout) {
                $scope.lastReload = layout.qLastReloadTime.replace(/T/, ' ').replace(/Z/, ' ').substr(0, layout.qLastReloadTime.lastIndexOf(".")); // dateTime in header
            });

            var global = qlik.getGlobal(config);
            global.getAuthenticatedUser(function(reply){
                $scope.user = reply.qReturn;
            });

        }

        AppInfo(qlikApp.app); // enable app info

    }])
    .directive('appInfoModal', function () {
        return {
            templateUrl: 'partials/shared/app-info-modal.html'
        };
    });
});
