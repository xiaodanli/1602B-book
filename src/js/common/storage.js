define(function() {
    var storage = window.localStorage;

    var storageApi = {
        set: function(key, val) {
            if (!val) {
                this.remove(key)
            }
            storage.setItem(key, JSON.stringify(val))
        },
        get: function(key) {
            var val = storage.getItem(key);
            return JSON.parse(val)
        },
        remove: function(key) {
            storage.removeItem(key);
        },
        clear: function() {
            storage.clear();
        }
    }

    return storageApi
})