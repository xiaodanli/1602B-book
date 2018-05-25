require(['jquery', 'render', 'header', 'getReq', 'text!bookTb', 'storage'], function($, render, header, getReq, bookTb, storage) {

    var fiction_id = getReq().fiction_id;
    $("body").append(bookTb);

    function initPage() {
        $.ajax({
            url: '/api/detail',
            dataType: 'json',
            data: {
                fiction_id: fiction_id
            },
            success: function(res) {
                console.log(res);
                renderDetail(res);
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    function renderDetail(res) {
        header({ title: res.item.title });
        render(res.item, $("#detail-template"), $("#detail"));
        render(res.item, $("#tag-template"), $(".type-tags"));
        var relatedObj = {
            data: res.related
        }
        render(relatedObj, $("#t-b-tpl"), $("#other-list"));
        render(res.item, $("#copyright-template"), $(".copyright"));
        $(".content").show();
        $("#start-btn").on("click", function() {
            isLogin();

        })
    }

    function isLogin() {
        var username = storage.get("username") || '';

        if (username) {
            $.ajax({
                url: '/isLogin',
                dataType: 'json',
                type: 'post',
                data: {
                    username: username
                },
                success: function(res) {
                    console.log(res);
                    if (res.code === 1 && res.result) {
                        window.location.href = "../../page/artical.html?fiction_id=" + fiction_id;
                    } else if ((res.code === 1 && !res.result) || res.code === 2) {
                        window.location.href = "../../page/login.html";
                    }
                },
                error: function(error) {
                    console.warn(error)
                }
            })
        } else {
            location.href = "../../page/login.html";
        }
    }


    initPage();
})