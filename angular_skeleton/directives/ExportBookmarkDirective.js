define([
    'app',
    'jquery'
], function (app, $) {
    app.controller('ExportBookmarkCtrl', ['qlikApp', '$scope', function (qlikApp, $scope) {
        /**
         * Creates and download file with incoming parameters
         */
        function exportToFile(content, fileName, contentType) {
            var a = document.createElement("a");
            var file = new Blob([content], {
                type: contentType
            });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window})); // click on link
        }

        var app = qlikApp.app;

        /**
         * Runs when file is choosen
         */
        $scope.export = function () {
            // Get all current selections
            app.getList("CurrentSelections", function (reply) {

                var selections = reply.qSelectionObject.qSelections;

                // Store the content for the generated file
                var exportBookmark = [];
                var responses = 0;
                selections.forEach(function (s) { // Loop all fields                 
                    var selectedValues = s.qSelected.split(/\s*,\s*/); // Comma separated selections
                    
                    Promise.resolve(app.field(s.qField).getData()).then(function (data) { // Get more data for the specifik field
                        // setTimeout should be changed to a working promise/callback
                        setTimeout(function () {

                            var obj = {}; // store all values in a object
                            obj.field = s.qField; // The field name
                            obj.values = []; // The selected values
                            obj.locked = false; // If selections are locked

                            data.rows.forEach(function (v) {
                                var isSelected = selectedValues.indexOf(v.qText) > -1;
                                if (isSelected) {
                                    if (v.qNum != null) {
                                        obj.values.push(v.qNum); // number values
                                    } else {
                                        obj.values.push(v.qText); // string values
                                    }
                                }

                                if (v.qState === "L") {
                                    obj.locked = true;
                                }
                            });
                            exportBookmark.push(obj);

                            responses++;
                            if (selections.length === responses) { // Create file when loop is done                           
                                var jsonData = JSON.stringify(exportBookmark);
                                exportToFile(jsonData, 'ISTBookmark.json', 'application/json');
                            }

                        }, 500);
                    });
                });

            }).then(function (model) {
                qlikApp.app.destroySessionObject(model.id); // Prevent the function to run in the background
            });
        };

        $scope.import = function () {
            var files = document.getElementById('selectedFile').files;
            if (files.length <= 0) {
                return false;
            }
            var fr = new FileReader();

            fr.onload = function (e) {
                try {
                    var result = JSON.parse(e.target.result);
                } catch (error) {
                    $('#popupText').append(error.message + "<br>");
                    $('#popup').fadeIn(1000);
                }

                result.forEach(function (s) {
                    app.field(s.field).selectValues(s.values, false); // select the value
                    if (s.locked) {
                        app.field(s.field).lock();
                    }
                });

            };
            fr.readAsText(files.item(0));
        };

    }])
    .directive('exportBookmark', function () {
        return {
            templateUrl: 'partials/shared/export-bookmark.html'
        };
    });
});