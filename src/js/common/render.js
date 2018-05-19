define(['jquery', 'handlebars'], function($, handle) {
    function render(data, source, target, isRefresh) {
        var sourceTpl = source.html();

        var template = handle.compile(sourceTpl);

        handle.registerHelper("addInd", function(index) {
            return index + 1
        })

        handle.registerHelper("limit", function(index) {
            if (index < 5) {
                return true
            } else {
                return false
            }
        })

        handle.registerHelper("equal", function(param1, param2) {
            if (param1 == param2) {
                return true
            } else {
                return false
            }
        })

        var html = template(data)
        if (isRefresh) {
            target.html(html)
        } else {
            target.append(html)
        }

    }
    return render
})