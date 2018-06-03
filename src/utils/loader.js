/**
@description    Loader (only loades json files)
@dependencies   JQuery

@example
var loader = new Loader("bootstrap")

loader.fetch([
    {id: "master", url: "./assets/json/master.json" },
    {id: "strings", url: "./assets/json/strings.json" }
]).done(()=> {

    console.log("content:");
    console.log(loader.get("master"))
    console.log(loader.get("pages"))
})
*/

(function () {

    function dataDecorator(id, data) {
        var obj = typeof data == "string" ? JSON.parse(data) : data;
        obj.id = id;
        return obj;
    }

    function JSONLoader(id, url, assets) {

        var def = $.Deferred();
        $.get(url).done(function (data, status) {
           // assets[id] = typeof data == "string" ? JSON.parse(data) : data;
            assets[id] = dataDecorator(id, data);
            def.resolve();
        }).fail(function (a,b,c) {
            console.warn("Failed to load %s", url)
            console.warn(c)
            def.reject();
        })

        return def
    }
    window.JSONLoader = JSONLoader;

    function TextLoader(id, url, assets) {
        var def = $.Deferred();
        $.get(url).done(function (data, status) {
            assets[id] =  data;
            def.resolve();
        }).fail(function () {

            def.reject();
        })

        return def
    }
    window.TextLoader = TextLoader;


    function Loader(id) {
        this.id = id || "";
        this.assets = {};
    }
    Loader.prototype = {
        fetch: function (urls) {

            var def = $.Deferred();
            var loaders = [];
            var self = this;

            urls.forEach(o=> {
                if(/\.json$/.test(o.url)) {

                    loaders.push(JSONLoader(o.id, o.url, this.assets));
                }else{
                    loaders.push(TextLoader(o.id, o.url, this.assets));
                }
            });

            $.when.apply(null, loaders).done(function () {
               console.log(self.id + " Loader.complete")
               def.resolve();
            }).fail(function () {
                console.log(self.id + " Loader.failed")
                def.reject();
            })
            return def;
        },

        get: function (id) {
            return this.assets[id];
        },

        has: function (id) {
            return this.assets.hasOwnProperty(id);
        },

        who: function () {
            return Object.keys(this.assets);
        }   
    }

    /* exports */
    window.Loader = Loader;

}());