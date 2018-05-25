require(['jquery', 'storage', 'base64', 'jsonp', 'getReq', 'render'], function($, storage, base64, jsonp, getReq, render) {

    var _mask = $(".mask"),
        _setT = $(".set-t"),
        _setB = $(".set-b"),
        _setPanel = $(".set-panel"),
        _cur = $(".cur");

    //点击返回
    $(".icon-circle-back").on("click", function() {
        window.location.href = "../../page/book-detail.html?fiction_id=" + fiction_id;
    })

    //点击内容
    $(".artical-con").on("click", function() {
        _setT.show();
        _setB.show();
        _mask.show();
    })

    //点击mask
    _mask.on("click", function() {
        _setT.hide();
        _setB.hide();
        $(this).hide();
        _setPanel.hide();
        $(".size").removeClass("active");
    })

    //获取章节列表
    var fiction_id = getReq().fiction_id,
        chapter_id = storage.get("chapter_id") || 1;
    _cur.html(chapter_id);

    //获取章节内容
    getArtical();

    function getArtical() {
        $.ajax({
            url: '/api/artical',
            dataType: 'json',
            data: {
                fiction_id: fiction_id,
                chapter_id: chapter_id
            },
            success: function(res) {
                jsonp({
                    url: res.jsonp,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(data) {
                        var str = $.base64.atob(data, true);
                        var obj = JSON.parse(str);
                        render(obj, $("#artical-tpl"), $(".artical-con"), true)
                    }
                })
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    //上一章

    $(".pre-btn").on("click", function() {
        if (chapter_id > 1) {
            chapter_id -= 1;
            getArtical();
            _cur.html(chapter_id);
            storage.set("chapter_id", chapter_id);
        } else {
            alert("到头了");
        }

    })

    //下一章

    $(".next-btn").on("click", function() {
        if (chapter_id < 4) {
            chapter_id += 1;
            getArtical();
            _cur.html(chapter_id);
            storage.set("chapter_id", chapter_id);
        } else {
            alert("到尾了");
        }
    })


    $.ajax({
        url: '/api/chapter',
        dataType: 'json',
        data: {
            fiction_id: fiction_id
        },
        success: function(res) {
            $(".total").html(res.item.toc.length)
        },
        error: function(error) {
            console.warn(error)
        }
    })

    //点击目录
    $(".chapter-btn").on("click", function() {
        window.location.href = "../../page/chapter-list.html?fiction_id=" + fiction_id + "&chapter_id=" + chapter_id;
    })

    //点击字体
    $(".size").on("click", function() {
        _setPanel.toggle();
        $(this).toggleClass("active");
    })

    //设置字体大小
    var initSize = storage.get("fz") || 14, //初始字体大小
        maxSize = 20, //最大的字体
        minSize = 10; //最小的字体



    //点击大按钮
    $(".large-btn").on("click", function() {
        if (initSize < maxSize) {
            initSize += 2;
            storage.set("fz", initSize);
        }

        $("p").css("font-size", initSize / 37.5 + "rem")
    })

    //点击小按钮

    $(".small-btn").on("click", function() {
        if (initSize > minSize) {
            initSize -= 2;
            storage.set("fz", initSize);
        }
        $("p").css("font-size", initSize / 37.5 + "rem")
    })

    //更换背景

    var lightBgColor = '#0f1410', //黑夜的背景色
        isLight = storage.get("mark") == false ? false : true,
        curBg = storage.get("bg") || '#f7eee5';

    if (!isLight) {
        $(".artical-con").css("background", curBg);
    } else {
        $(".artical-con").css("background", lightBgColor);
    }

    $("#set-bg-btns").on("click", "li", function() {

        $(this).addClass("active").siblings().removeClass("active");
        curBg = $(this).attr("bg-color");
        storage.set("bg", curBg);

        if (!isLight) {
            $(".artical-con").css("background", curBg);
        }
    })




    //点击day

    $(".day").on("click", function() {

        isLight = $(this).hasClass("night");
        var text = isLight ? '白天' : '黑夜';
        $(this).find("dd").text(text);

        if (isLight) {
            $(".artical-con").css("background", lightBgColor);
        } else {
            $(".artical-con").css("background", curBg);
        }
        storage.set("mark", isLight)
        $(this).toggleClass("night");
    })

})