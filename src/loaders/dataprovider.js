/* Laver et interface til vores config loader */

var DataProvider = function (configLoader) {


    var api = {
        strings: function () { 
            return configLoader.bootstrapLoader.get("strings");
        },
    
        master: function () {
            return configLoader.bootstrapLoader.get("master");
        },
    
        page: {
            get: function (id) {
                return configLoader.pagesLoader.get(id);
            },
            has: function (id) {
                return configLoader.pagesLoader.has(id);
            }
        },
    
        template: {
            get: function (id) {
                return configLoader.templateLoader.get(id);
            },
            has: function (id) {
                return configLoader.templateLoader.has(id);
            }
        }
    }

    return api;

}

