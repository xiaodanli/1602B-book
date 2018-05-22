define(['jquery', 'render', 'text!headerTpl'], function($, render, headerTpl) {

    function renderHeader(data) {
        console.log(data)
        $("body").append(headerTpl);

        render(data, $("#header-tpl"), $(".render-header"));

        $(".icon-back").on("click", function() {
            history.go(-1);
        })
    }

    return renderHeader

})