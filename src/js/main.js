require.config({
    baseUrl: '/js/',
    paths: {
        //库依赖
        'jquery': 'libs/jquery-2.1.1.min',
        'swiper': 'libs/swiper.min',
        'bScroll': 'libs/bscroll',
        'handlebars': 'libs/handlebars-v4.0.11',
        'text': 'libs/text',

        //common
        'render': 'common/render',
        'getSlideDirection': 'common/slide-direction',

        //page
        'index': 'app/index',

        //模板
        'bookTb': '../page/tpl/book-t-b-list.html',
        'bookLr': '../page/tpl/book-l-r-list.html'


    }
})