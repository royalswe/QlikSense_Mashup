define([
    'app'
],
function (app) {
    app.controller('components/GradeCtrl', function (qlikApp) {
        $(document).ready(function () {
            $("#current_sheet_title").text("Betyg");
        });

        var app = qlikApp.app;

        app.getObject('QV01', '8b93c868-e32e-47b2-b2a8-a28b0033d1ce'); //Betygsfördelning
        app.getObject('QV02', '32ff9f59-ca79-44e2-a667-e70d3d64a44f'); //Behörighetsfördelning
        app.getObject('QV03', '0b6058bb-79e8-43ca-a919-1b1d2be3ef42'); //Genomsnittligt meritvärde över tid
        app.getObject('QV04', 'fc180a20-26f0-4a52-bc76-a70095b2cc69'); //Meritintervall antal elever
        app.getObject('QV05', 'c3bc42f9-7b7d-4694-8347-61fcbf1bf948'); //Genomsnittligt meritvärde
        app.getObject('QV06', 'jAFZV'); //Läsår
        app.getObject('QV07', 'mrMPApG'); // Termin
        app.getObject('QV08', 'psE'); //Aktuell skola
        app.getObject('QV09', 'GJKkNj'); //Aktuell årskurs
        app.getObject('QV10', 'mQXAwwp'); //Aktuell klass
        app.getObject('QV11', 'kjsSxZt'); //Ämne
        app.getObject('QV12', 'VkmmzU'); //Kön
        app.getObject('QV13', 'ZDhSJ'); // Elevstatus
        //app.getObject('QV14', 'ZDhSJ'); //Varför är denna med 2ggr?
        //Object ID: RURps?


        //Toggle sidebar
        $('#offcanvasleft').click(function (e) {
            $('.row-offcanvas-left').toggleClass('active');
            e.preventDefault();
        });

    });

});