define([
    'app',
    'jquery'
], function (app, $) {
    app.controller('BookmarkCtrl', ['qlikApp', '$scope', function (qlikApp, $scope) {

        if ($('ul#qbmlist li').length === 0) {
            $('#qbmlist').append("<li><a>Bookmarks not available</a></li>"); // Text shows when bookmarks arent ready yet
        }

        function AppUi(app) {
           
            app.getList("BookmarkList", function (reply) {
                var str = "";
                reply.qBookmarkList.qItems.forEach(function (value) {
                    if (value.qData.title) {
                        str += '<li><a class="bookmark-title" data-id="' + value.qInfo.qId + '"> ' + value.qData.title + '</a>' +
                            '<a class="lui-icon lui-icon--bin" data-cmd="delete" data-toggle="modal" data-target="#confirm_delete" data-title="' + value.qData.title + '" data-deleteid="' + value.qInfo.qId + '"></a></li>';
                    }
                });
                str += '<li><a data-cmd="create">Skapa bokmärken</a></li>';
                $('#qbmlist').html(str).find('a').on('click', function () {
                    var id = $(this).data('id');

                    if (id) {
                        app.bookmark.apply(id);
                    }
                    else {
                        var cmd = $(this).data('cmd');
                        if (cmd === "create") {
                            $('#create_bm_modal').modal();
                        }
                        else if (cmd === "delete") {
                            $('#confirm_delete').on('show.bs.modal', function (e) {// Show delete modal
                                var data = $(e.relatedTarget).data();
                                $('.bookmark', this).text(data.title);
                                $(this).find('.btn-ok').attr('data-bookmarkid', data.deleteid);
                            });
                        }
                    }
                });
            });
            /// bookmarks callback end

            //
            // global menu functions
            //
            $("[data-bookmark]").on('click', function () {
                var $element = $(this);
                switch ($element.data('bookmark')) {
                    //app level commands                 
                    case 'create':
                        var title = $("#bmtitle").val(), desc = $("#bmdesc").val();
                        app.bookmark.create(title, desc);
                        $('#create_bm_modal').modal('hide');
                        break;
                    case 'delete':
                        var bookmarkId = document.querySelector("[data-bookmarkid]").getAttribute("data-bookmarkid");
                        if (bookmarkId) {
                            $("#confirm_delete").modal('hide');
                            app.bookmark.remove(bookmarkId);
                            var li = $("li [data-deleteid=" + bookmarkId + "]").parent().remove; // remove current bookmark from list
                        }
                        break;
                }
            });
    
        }

        AppUi(qlikApp.app); // enable header menu

    }])
    .directive('bookmarkModal', function () {
        return {
            templateUrl: 'partials/shared/bookmark-modal.html'
        };
    });
});
