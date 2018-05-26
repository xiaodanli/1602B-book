require(['jquery', 'header', 'render', 'text!bookSearchTpl', 'storage'], function($, header, render, bookSearchTpl, storage) {
    console.log(header)
    header({ isSearch: true });
    $("body").append(bookSearchTpl);

    var history = storage.get("history") || [];

    var formatArr = [];
    $.ajax({
        url: '/api/hot',
        dataType: 'json',
        success: function(res) {
            console.log(res);

            res.ads.forEach(function(item, index) {
                formatArr.push(item.ad_name);
            })
            var newArr = formatArr.concat(history);
            render(removeFun(newArr), $("#tag-tpl"), $(".type-tags"), true);
        },
        error: function(error) {
            console.warn(error)
        }
    })

    function removeFun(arr) {
        var obj = {};
        var targetArr = [];

        for (var i = 0; i < arr.length; i++) {
            if (!obj[arr[i]]) {
                targetArr.push(arr[i]);
                obj[arr[i]] = 1;
            }

            // !obj['诛仙']

            // targetArr.push('诛仙')

            // obj['诛仙'] = 1  
        }
        return targetArr
    }

    $(".search-btn").on("click", function() {
        var val = $(".ipt").val();
        $(".type-tags").hide();
        $(".search-list").show();
        if (!val) {
            $(".search-list").html("<p>搜索内容为空</p>")
        } else {
            console.log("ajax");
            history.push(val);
            storage.set("history", history);
            searchList(val)
        }
    })

    function searchList(val) {
        $.ajax({
            url: '/api/search',
            dataType: 'json',
            data: {
                key: val
            },
            success: function(res) {
                console.log(res);
                $(".search-list").html(' ');
                if (!res) {
                    $(".search-list").html("<p>暂无搜索数据</p>")
                } else {
                    render(res.items, $("#search-template"), $(".search-list"))
                }

            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    $(".ipt").on("input", function() {
        var val = $(this).val();
        if (!val) {
            var history = storage.get("history") || [];
            var concatArr = formatArr.concat(history);
            render(removeFun(concatArr), $("#tag-tpl"), $(".type-tags"), true);
            $(".type-tags").show();
            $(".search-list").html(' ');
            $(".search-list").hide();
        }

    })

    $(".type-tags").on("click", "li", function() {
        var key = $(this).text();
        $(".ipt").val(key);
        searchList(key);
        $(".type-tags").hide();
        $(".search-list").show();
    })
})