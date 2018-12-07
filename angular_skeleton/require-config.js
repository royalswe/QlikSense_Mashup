'use strict';
/**
 * @var {string} GET_APP_URI - Retrieves the the app parameter in url
 * @var {string} QLIK_SENSE_APP_ID - Assign the value from GET_APP_URI if exist else retrieve value from cookie
 */
var GET_APP_URI = decodeURI((RegExp("app=(.+?)(&|$)").exec(location.search) || [, ""])[1]);
var QLIK_SENSE_APP_ID = (GET_APP_URI !== "") ? GET_APP_URI : document.cookie.replace(/(?:(?:^|.*;\s*)app\s*\=\s*([^;]*).*$)|^.*$/, "$1");
var QLIK_SENSE_APP_ID = "7d25abde-1293-4b18-b77e-7b4bb1218ca6"; // Hard coded app id if not using the app id from the url

var ROOT = '/angular_skeleton/'; // The name of the working directory

var config = {
	host: 'blp-qliksense01.ist-analys.com',
	prefix: '/dev/',
	port: 443,
	isSecure: true
};

require.config({
	baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",

    paths: {
        services:       ROOT + 'services',
        script:         ROOT + 'js',
		components:     ROOT + 'components',
		routes:         ROOT + 'js/routes',
		app:            ROOT + 'js/app',
		directives:     ROOT + 'directives',
		lib:            ROOT + 'lib'
	},

	// shim: {
	//    'directives/BookmarkDirective': {
	//        deps: [
    //            'directives/HeaderDirective'
	//        ],
	//        exports: 'directives/BookmarkDirective'
	// 	}
    // }

    // priority: [
	// 	'js/qlik'
	// ]
});

/**
 * Load all JavaScript files.
 */
require([
	'js/qlik',
	'lib/bootstrap/bootstrap.min.js',
    'directives/HeaderDirective',
	'directives/BookmarkDirective',
	'directives/ExportBookmarkDirective',
	'directives/AppInfoDirective',
	'script/main',
    'components/absence/AbsenceCtrl',
	'components/absence-report/AbsenceReportCtrl',
    'components/dashboard/DashboardCtrl',
    'components/grade/GradeCtrl',
    'components/grade-report/GradeReportCtrl',
	'components/np/NpCtrl',
	'components/develop/DevelopCtrl'
	], function(qlik) {
		
		// The path to the extensions folder
		var path = window.location.protocol + "//" + window.location.host + "/extensions/";
		
		//
		// Load all third party extension that is located in the extensions folder
		//
		require([path + "AngularListbox/AngularListbox.js"], function (data) {
	        qlik.registerExtension('AngularListbox', data);
	    });

	    require([path + "cl-kpi/cl-kpi.js"], function (data) {
	        qlik.registerExtension('cl-kpi', data);
	    });

	    require([path + "bi-irregular-2dim-heatmap/bi-irregular-2dim-heatmap.js"], function (data) {
	        qlik.registerExtension('bi-irregular-2dim-heatmap', data);
	    });

	    require([path + "SenseSankey/SenseSankey.js"], function (data) {
	        qlik.registerExtension('SenseSankey', data);
	    });

	    require([path + "ClimberCustomReport/cl-customreport.js"], function (data) {
	        qlik.registerExtension('cl-customreport', data);
	    });
		
		// bootstrap angular
		angular.element(document).ready(function() {
		    angular.bootstrap(document, ['qlik-angular', 'angular_skeleton']);
		});

	}
);

	

