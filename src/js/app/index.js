require(['jquery', 'swiper', 'bScroll', 'render', 'text!bookTb', 'text!bookLr', 'getSlideDirection'], function($, swiper, bScroll, render, bookTb, bookLr, getSlideDirection) {
    //实例化最外层swiper
    var wrapSwiper = new swiper(".wrap-swiper");

    //实例化bscroll
    var cityScroll = new bScroll(".city-scroll", {
        probeType: 2,
        click: true
    })

    //缓存元素
    var _parent = $(".city-scroll>div");
    var _line = $(".line");

    //计算尺寸
    var htmlFz = $("html").css("fontSize");

    var realSize = parseFloat(htmlFz) * 44 / 37.5;

    //上拉加载相关参数
    var pageNum = 1, //默认加载第一页
        total, //总页数
        count = 10, //每页的条数
        upLoadTip = "上拉加载更多",
        downRefesh = "下拉刷新",
        rebaseMore = "释放加载更多",
        rebaseRefresh = "释放刷新",
        noneDataTip = "暂无数据";

    //监听滚动
    cityScroll.on("scroll", function() {

        if (this.y < this.maxScrollY - realSize) {
            if (total && pageNum > total) {
                _parent.attr("up", noneDataTip);
            } else {
                _parent.attr("up", rebaseMore);
            }

        } else if (this.y < this.maxScrollY - realSize / 2) {
            if (total && pageNum > total) {
                _parent.attr("up", noneDataTip);
            } else {
                _parent.attr("up", upLoadTip);
            }
        } else if (this.y > realSize) {
            _parent.attr("down", rebaseRefresh);
        } else if (this.y > realSize / 2) {
            _parent.attr("down", downRefesh);
        }
    })

    cityScroll.on("scrollEnd", function() {
        if (total && pageNum > total) {
            _parent.attr("up", noneDataTip);
        } else {
            _parent.attr("up", upLoadTip);
        }

        _parent.attr("down", downRefesh);
    })

    cityScroll.on("touchEnd", function() {
        if (_parent.attr("up") === rebaseMore) {
            if (total && pageNum > total) {
                return false
            } else {
                loadMore(pageNum);
                pageNum++;
            }
        }
        if (_parent.attr("down") === rebaseRefresh) {
            location.reload()
        }
    })

    //上拉加载数据
    function loadMore(pageNum) {
        $.ajax({
            url: '/api/recommed',
            dataType: 'json',
            data: {
                pageNum: pageNum,
                count: count
            },
            success: function(res) {
                render(res.items, $("#l-r-tpl"), $("#load-more"));
                cityScroll.refresh();
                total = res.total / count;
            },
            error: function(error) {
                console.warn(error)
            }

        })
    }

    //滑动处理  
    var startX, startY;
    document.addEventListener('touchstart', function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = getSlideDirection(startX, startY, endX, endY);
        switch (direction) {
            case 3:
                wrapSwiper.slideTo(1);
                _line.addClass("move");
                $(".tab-item").eq(1).addClass("active").siblings().removeClass("active");
                break;
            case 4:
                wrapSwiper.slideTo(0);
                _line.removeClass("move");
                $(".tab-item").eq(0).addClass("active").siblings().removeClass("active");
                break;
            default:
        }
    }, false);

    //tab切换
    $(".tab-item").on("click", function() {
        var index = $(this).index();

        wrapSwiper.slideTo(index);

        $(this).addClass("active").siblings().removeClass("active");

        if (index == 1) {
            _line.addClass("move");
        } else {
            _line.removeClass("move");
        }

    })

    //书架
    $(".switch-shelf").on("click", function() {
        $(".shelf-list").toggleClass("list-type");

    })

    //实例化轮播图
    function initBannerSwiper() {
        var bannerSwiper = new swiper(".banner-swiper", {
            autoplay: 3000,
            loop: true,
            pagination: '.swiper-pagination'
        });
    }

    //初始化页面
    function initPage() {

        $("body").append(bookTb);
        $("body").append(bookLr);
        //请求数据
        $.ajax({
            url: '/api/index',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                var bannerData = res.items[0].data;
                var hotData = res.items[1].data;
                var recommendData = res.items[2].data.data;

                var firstData = [recommendData[0]];
                console.log(firstData)

                // 轮播图
                render(bannerData, $("#slide-tpl"), $(".banner"));
                //本周最火
                render(hotData, $("#t-b-tpl"), $(".book-t-b-list"));
                //重磅推荐
                render(firstData, $("#l-r-tpl"), $("#first-item"));
                render(recommendData.slice(1), $("#recommend-list-tpl"), $("#not-first-list"))

                initBannerSwiper()
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    initPage()

})