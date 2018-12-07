define([
    'app'
],
function (app) {
    app.controller('components/NpCtrl', function (qlikApp) {
        var app = qlikApp.app;

        app.getObject('QV01', 'DCgxJRp'); //Nationella prov betyg
        app.getObject('QV02', 'CMPWneZ'); //Betyg
        app.getObject('QV03', 'JpLxPWF'); //Nationella prov ämne
        app.getObject('QV04', 'GstFc');   //Natinonella prov ämne /Antal betyg
        app.getObject('QV05', 'eajKpr');  //Läsår
        app.getObject('QV06', 'BjtVLd');  //Termin
        app.getObject('QV07', 'FdAAxG');  //% lägre, lika, högre NP jämfört med betyg
        app.getObject('QV08', 'TfaxpU');  //Analys nationella prov master
        app.getObject('QV09', 'hnJeFPn'); //Aktuell skola
        app.getObject('QV10', 'TRQrNwd'); //Aktuell årskurs
        app.getObject('QV11', 'QmQHugM'); //Aktuell klass
        app.getObject('QV12', 'emUqevb'); //Ämne
        app.getObject('QV13', 'sppZWw');  //Kön
        app.getObject('QV14', 'kjsqq');   //Elevstatus


         //Toggle sidebar
        $('#offcanvasleft').click(function (e) {
            $('.row-offcanvas-left').toggleClass('active');
            e.preventDefault();
        });
    });

});