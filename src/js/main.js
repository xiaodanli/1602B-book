require.config({
    baseUrl: '/js/',
    paths: {
        //库依赖
        'jquery': 'libs/jquery-2.1.1.min',
        'swiper': 'libs/swiper.min',
        'bScroll': 'libs/bscroll',
        'handlebars': 'libs/handlebars-v4.0.11',
        'text': 'libs/text',
        'base64': 'libs/jquery.base64',
        'jsonp': 'libs/jquery.jsonp',

        //common
        'render': 'common/render',
        'getSlideDirection': 'common/slide-direction',
        'header': 'common/header',
        'storage': 'common/storage',
        'getReq': 'common/getRequest',


        //page
        'index': 'app/index',
        'search': 'app/search',
        'bookDetail': 'app/book-detail',
        'chapterList': 'app/chapter-list',
        'artical': 'app/artical',
        'login': 'app/login',

        //模板
        'bookTb': '../page/tpl/book-t-b-list.html',
        'bookLr': '../page/tpl/book-l-r-list.html',
        'headerTpl': '../page/tpl/header.html',
        'bookSearchTpl': '../page/tpl/book-l-r-s-list.html'

    },
    shim: {
        'base64': {
            deps: ['jquery']
        }
    }
})