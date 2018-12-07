/**
 * Controller for testing purpose
 */
define([
    'app'
],
function (app) {
    app.controller('components/DevelopCtrl', function ($scope, qlikApp) {
       
        var app = qlikApp.app;

        app.getObject('QV02', 'ErUYAN');

        app.visualization.get('rSPWTP').then(function(vis){
            vis.show("QV01"); // show the object 

            // Expand all fields in pivot table
            //vis.model.expandLeft("/qHyperCubeDef", 0, 0, true);
            
            // Toggle to data view (straight table)
            $("#view_data").click(function() {
                vis.toggleDataView().then(function(toggled){
                    if(toggled){
                        this.getElementsByClassName('qv-st')[0].focus();
                    }
                });
            });
  
        });

        $("#export_to_pdf").click(function () {
            /**
             * Retrieve data according to selected fields and measures.
             * @param {array} fields - The fields.
             * @param {array} measures - The measures and desired title.
             * @param {function} calback - The callback function that will be executed after Retrieved data.
             * @param {scope} scope
             */
            qlikApp.createTable(
                ["Årskurs", "Antal schemalagda minuter"],
                [{title: "Antal schemalagda minuter", exp: "Count([Antal schemalagda minuter])"},{title: "Summa schemalagda minuter", exp: "Sum([Antal schemalagda minuter])"}],
                exportPDF,
                $scope
            ).then(function (model) {
                // Destroy object when done to prevent further listeners. 
                app.destroySessionObject(model.id);
            });
        });

        /**
         * Will create a PDF from incoming parameters
         */
        function exportPDF(reply, columns, measures) {
            var matrix = reply.qHyperCube.qDataPages[0].qMatrix;

            // Retrive only necessary text from rows
            var rows = [];
            matrix.forEach(function(row) {           
                rows.push(row.map(r => r.qText));
            });

            // Retrive title from all measure dimensions
            var measureColumns = measures.map(function(measure) {
                return measure.title;
            });
            // concat field and measure titles
            columns = columns.concat(measureColumns);

            // library: https://github.com/simonbengtsson/jsPDF-AutoTable
            // Create and download PDF
            var doc = new jsPDF('p', 'pt');
            doc.autoTable(columns, rows, {
                styles: {cellPadding: 1, fontSize: 8}
            });
            doc.save('table.pdf');
        }


    });

});