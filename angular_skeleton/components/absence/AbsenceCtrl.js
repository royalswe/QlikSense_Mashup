define([
    'app'
],
function (ngApp) {
    ngApp.controller('components/AbsenceCtrl', function (qlikApp, $scope, $compile) {
        var app = qlikApp.app;
        var proxyUrl = "https://blp-qliksense01.ist-analys.com/dev";

        app.getObject('QV01', 'CktUJE'); //Frånvaro Läsår
        app.getObject('QV02', 'jSWsC'); //Frånvaro Termin
        app.getObject('QV03', 'NyPmeR'); //Frånvaromånad
        app.getObject('QV04', '8be85678-6c43-4630-a751-326a86d9cef9'); //Frånvarotid
        app.getObject('QV05', '4e8e979c-b6b6-4dfd-b8ee-0b1fa2c82488'); //Frånvarotyp (min)
        app.getObject('QV06', '79094801-99e3-4060-a556-bcd97f67a704').then( function( vizModel ) {  
            var $exportButton = $(document.createElement('button')).text('Export to Excel').addClass('table-export-btn').appendTo('#QV06');

            $exportButton.bind('click', function () {
                vizModel.exportData().then(function( reply ) {  
                    window.open(proxyUrl + reply.qUrl);  
                });  
            })  
        }); //Frånvaroöversikt
        app.getObject('QV07', 'd1f8ed0a-8edc-4085-9771-19a2ff09d007'); //Aktuell skola
        app.getObject('QV08', '6245d24e-8a6b-4f92-993c-7f5c00205911'); //Årskurs
        app.getObject('QV09', '37600ee8-0e26-4fe5-bf63-52d81a4f01c3'); //Klass
        app.getObject('QV10', '5073076b-2556-4410-9265-e7e1875d736d'); //Ämne
        app.getObject('QV11', 'e52e6a02-17a3-4175-be7b-7f2b3726bf48'); //Lärarsignatur
        app.getObject('QV12', '90c647eb-bd99-447b-825f-ea03a091c3d4'); //Frånvarostatus


        $scope.$on('$destroy', function () {

        });

        //Toggle sidebar
        $('#offcanvasleft').click(function (e) {
            $('.row-offcanvas-left').toggleClass('active');
            e.preventDefault();
        });

    });

});