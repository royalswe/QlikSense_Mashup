define([
        'js/qlik',
        'app'
    ],
    function (qlik, ngApp) {
        ngApp.controller('components/DashboardCtrl', function (qlikApp, $scope, $compile) {
            var app = qlikApp.app; // get the qlik app object

            /** 
             * create horizontal select lists example (never used)
             * qlikApp.createList({ field: "Frånvaromånad", elem: "#QV01" }, createSelectList, $scope).then(function (model) { // callback if needed });
             */

            /**
             * fetch objects from qlik here
             */
            app.getObject('QV04', 'aWCpHL');
            app.getObject('QV05', 'hTbu');
            app.getObject('QV06', 'pc', { "noInteraction": true });
            app.getObject('QV07', 'WCNHt', { "noInteraction": true });
            app.getObject('QV08', 'LYrdK', { "noInteraction": true });
            app.getObject('QV09', 'mMntW', { "noInteraction": true });
            app.getObject('QV10', 'ymXzHV', { "noInteraction": true });
            app.getObject('QV11', 'kzPmGf', { "noInteraction": true });
        
            /**
             * calback with data from createList that will be styled and added to the DOM
             * Note: this function is never used instead use AngularListbox extension
             */
            function createSelectList(reply, data) {
                var html = '<ul class="horizontal-selections" data-selection="' + data.field + '">';

                $.each(reply.qListObject.qDataPages[0].qMatrix, function () {
                    var item = this[0]; //get the current item
                    var style = "";

                    if (item.qState === "S") { // field is selected, make it green
                        style = "qlik-active-selection";
                    } else if (item.qState === "X") { // make field grey
                        style = "qlik-inactive-selection";
                    } else if (item.qState === "O") { // make field grey
                        style = "qlik-possible-selection";
                    }
                    //add the item to the list         
                    html += '<li class="' + style + '" data-qsval="' + item.qElemNumber + '">' + item.qText + '</option>';
                });

                html += '</ul>';
                angular.element($(data.elem)).html($compile(html)($scope)); // append the new list object to DOM
            }

            $(".lui-tab-container").click(function () {
                qlik.resize(); // reapint chart to make it visible when click on tabs
            });

            $scope.$on('$destroy', function () {
                // runs when changing sheet, can be used to destroy objects and so on.
            });

        });

    });