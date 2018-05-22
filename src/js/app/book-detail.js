require(['jquery', 'render', 'header', 'getReq', 'text!bookTb'], function($, render, header, getReq, bookTb) {

    var fiction_id = getReq().fiction_id;
    $("body").append(bookTb);

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
    }
})