define([
    'app',
    'jquery'
], function (app, $) {
    app.controller('HeaderCtrl', ['qlikApp', '$scope', function (qlikApp, $scope) {
        
        /**
         * open upp modal with information from AppInfoDirective.js
         */
        $scope.openInfoModal = function() {
            $('#app_info_modal').modal();
        };

        function AppUi(app) {
            // get customers available sheets 
            app.createCube({
                "qInitialDataFetch": [
                    {
                        "qHeight": 99,
                        "qWidth": 2
                    }
                ],
                "qDimensions": [
                    {
                        "qDef": {
                            "qFieldDefs": ["Tab ID"]
                        }
                    },
                    {
                        "qDef": {
                            "qFieldDefs": ["Tab name"]
                        }
                    }
                ]
            },function(reply){
                var sheets = reply.qHyperCube.qDataPages[0].qMatrix;  
                var hash = document.location.hash;

                // show sheet name in title and header text when navigating to new sheet
                $(window).on('hashchange', function() {
                    hash = document.location.hash;
                    sheets.forEach(function(sheet) {
                        if(hash === "#/" + sheet[0].qText){ $("#current_sheet_title").text(sheet[1].qText); document.title = sheet[1].qText; }
                    });   
                });

                // generate all sheets
                var links = "<div><h3>Flikar</h3></div>";
                sheets.forEach(function(sheet) {
                    links += '<a href="#/' + sheet[0].qText + '">' + sheet[1].qText + '</a>'; 
                    if(hash === "#/" + sheet[0].qText){ $("#current_sheet_title").text(sheet[1].qText); document.title = sheet[1].qText; }
                });   
                $("#sheet_nav").empty().append(links); 
            });

            // disables the back and forward arrows when they are not available
            app.getList('SelectionObject', function (reply) {
                $("[data-qcmd='back']").parent().toggleClass('disabled', reply.qSelectionObject.qBackCount < 1);
                $("[data-qcmd='forward']").parent().toggleClass('disabled', reply.qSelectionObject.qForwardCount < 1);
            });

            //
            // icons click handling 
            //
            $("[data-qcmd]").on('click', function () {
                var $element = $(this);
                switch ($element.data('qcmd')) {
                    //app level commands
                    case 'clearAll':
                        app.clearAll();
                        break;
                    case 'back':
                        app.back();
                        break;
                    case 'forward':
                        app.forward();
                        break;
                    case 'lockAll':
                        app.lockAll();
                        break;
                    case 'unlockAll':
                        app.unlockAll();
                        break;
                    case 'reload':
                        if (confirm("Vill du ladda ny data?")) {
                            $(".lui-icon--reload").addClass("reload-spin"); // start loading animation
                            app.doReload(0, false, false).then(function (e) {
                                // e is a success boolean
                                if (e) {
                                    app.doSave().then(function (e) {
                                        $('#popupText').text("Laddningen slutförd");
                                        $('#popup').fadeIn('normal', function () {
                                            $(this).delay(2000).fadeOut();
                                        });
                                    });

                                } else {
                                    console.error(e);
                                    $('#popupText').text("Laddningen kunde inte slutföras");
                                    $('#popup').fadeIn(1500);
                                }
                                $(".lui-icon--reload").removeClass("reload-spin");
                            })
                            .catch(function (e) {
                                console.error(e);
                                $(".lui-icon--reload").removeClass("reload-spin");
                            });
                        } else {
                            return false;
                        }
                        break;
                }
            });
        }

        AppUi(qlikApp.app); // enable header menu

        $(document).click(function (e) {
            if (e.target.id === 'show_sheets') { // toggle sheets
                $('#sheet_nav div').css("height", ""); // reset the added height
                var divHeight = $('#sheet_nav').height();
                $('#sheet_nav div').css("height", divHeight); // fill upp the left positioned on sheet nav with the text element "Flikar"

                $("#sheet_nav").slideToggle("fast");
            }
            else if ($('#sheet_nav').find(e.target).length) { // close sheets when click on them
                $("#sheet_nav").slideToggle("fast");
            }
            else if (e.target.id === 'toggle_left_slide') {
                $('#filter_left_slide').toggleClass('show_left_slide');
            }
            else if (e.target.id === 'pull_right' || $('#pull_right').find(e.target).length) {
                $('.sidebar-offcanvas').toggleClass('active');
            }
        });

    }])
    .directive('headerMenu', function () {
        return {
            templateUrl: 'partials/shared/header.html'
        };
    });
});
