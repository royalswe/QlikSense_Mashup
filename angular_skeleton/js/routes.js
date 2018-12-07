define([
    'app'
], function (app) {

    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix(''); // Remove ! un URL's

        $routeProvider
        .when('/absence-dashboard', {
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'components/DashboardCtrl'
        })
        .when('/absence', {
            templateUrl: 'components/absence/absence.html',
            controller: 'components/AbsenceCtrl'
        })
        .when('/absence-report', {
            templateUrl: 'components/absence-report/absence-report.html',
            controller: 'components/AbsenceReportCtrl'
        })
        .when('/np', {
            templateUrl: 'components/np/np.html',
            controller: 'components/NpCtrl'
        })
        .when('/grade', {
            templateUrl: 'components/grade/grade.html',
            controller: 'components/GradeCtrl'
        })
        .when('/grade-report', {
            templateUrl: 'components/grade-report/grade-report.html',
            controller: 'components/GradeReportCtrl'
        })
        .when('/develop', {
            templateUrl: 'components/develop/develop.html',
            controller: 'components/DevelopCtrl'
        })
        .otherwise({ redirectTo: '/absence-dashboard' });

    });

});