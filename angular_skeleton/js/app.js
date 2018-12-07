define([
	'angular',
    'js/qlik'
], function (angular, qlik) {
    var module = angular.module('angular_skeleton', [
    'ngRoute',
	'ngAnimate'
    ]);

    var qlikApp = function ($q) {
         /**
         * specify which app as well as the server configuration that will be used
         */
        var app = qlik.openApp(QLIK_SENSE_APP_ID, config);
                
        this.app = app;

        /**
         * Retrieve the attributes and selections from the uri if any and make selections of it.
         * @param {string} attr - Fetch the the attr parameter in url
         * @param {string} sel -  Fetch the the sel parameter in url
         */
        var attribute = decodeURI((RegExp("attr=(.+?)(&|$)").exec(location.search) || ["", ""])[1]);
        var selections = decodeURI((RegExp("sel=(.+?)(&|$)").exec(location.search) || ["", ""])[1]);
        if(attribute && selections){
            selections = selections.split(','); // create array of selections
            app.field(attribute).selectValues(selections, false, true); // select the values
        }

        /**
         * Retrives list of fields from a table
         */
        this.createList = function (data, callback, scope) {
            var deferred = $q.defer();
            app.createList({
                "qFrequencyMode": "V",
                "qDef": {
                    "qFieldDefs": [
            				data.field
                    ]
                },
                "qExpressions": [],
                "qInitialDataFetch": [
                        {
                            "qHeight": data.height || 20,
                            "qWidth": 1
                        }
                ],
                "qLibraryId": null
            }, function (reply) { callback(reply, data); }).then(function (model) {
                deferred.resolve(model);
                if (scope) {
                    scope.$on('$destroy', function () {
                        app.destroySessionObject(model.id);
                    });
                }
            });
            return deferred.promise;
        };

        this.createTable = function (fields, measures, callback, scope) {
            var deferred = $q.defer();
            
            // Make field dimension readable for QlikSense engine
            var qdimensions = fields.map(function(field) {
                return {
                    qDef : {
                        qFieldDefs : [field]
                    }
                };
            });

            // Make measures readable for QlikSense engine
            var qmeasures = measures.map(function(measure) {
                return{
                    qLabel: measure.title,
                    qDef: {
                        "qDef": measure.exp
                    }
                };
            });

            // Fetch the data from QlikSense engine
            app.createCube({
                qDimensions : qdimensions,
                qMeasures : qmeasures,
                qInitialDataFetch : [{
                    qTop : 0,
                    qLeft : 0,
                    qHeight : 200,
                    qWidth : 20
                }]
            }, function (reply) { callback(reply, fields, measures); }).then(function (model) {
                deferred.resolve(model);
                if (scope) {
                    scope.$on('$destroy', function () {
                        app.destroySessionObject(model.id);
                    });
                }
            });
            return deferred.promise;
        };
    };

    module.service('qlikApp', qlikApp);

    return module;
});