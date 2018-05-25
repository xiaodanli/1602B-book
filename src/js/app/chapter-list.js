require(['jquery', 'render', 'header', 'getReq', 'bScroll', 'storage'],
    function($, render, header, getReq, bScroll, storage) {
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
                var scroll = new bScroll(".chapter-wrap", {
                    click: true
                });
                var chapter_id = getReq().chapter_id;
                var target;
                if (chapter_id) {
                    target = chapter_id
                } else {
                    target = res.item.toc.length - 1
                }
                scroll.scrollToElement($(".chapter-list li").eq(target)[0])
                $(".chapter-list li").eq(target).addClass("active")
            },
            error: function(error) {
                console.warn(error)
            }
        })

        $(".chapter-list").on("click", "li", function() {
            chapter_id = $(this).index();
            storage.set("chapter_id", chapter_id);
            window.location.href = "../../page/artical.html?fiction_id=" + fiction_id + "&chapter_id=" + chapter_id
        })
    })