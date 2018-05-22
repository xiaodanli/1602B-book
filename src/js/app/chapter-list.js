require(['jquery', 'render', 'header', 'getReq', 'bScroll'],
    function($, render, header, getReq, bScroll) {
        header({ title: '目录' });

        var fiction_id = getReq().fiction_id;

        $.ajax({
            url: '/api/chapter',
            dataType: 'json',
            data: {
                fiction_id: fiction_id
            },
            success: function(res) {
                console.log(res);
                render(res.item.toc, $("#chapter-template"), $(".chapter-list"));
                var scroll = new bScroll(".chapter-wrap");
                scroll.scrollToElement($(".chapter-list li:last")[0])
                $(".chapter-list li:last").addClass("active")
            },
            error: function(error) {
                console.warn(error)
            }
        })
    })