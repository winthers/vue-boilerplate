
/* Loads the bootstrap configuration for the app strings/master/pages */
function ConfigLoader () {
    this.bootstrapLoader = new Loader("bootstrap");
    this.pagesLoader = new Loader("pages");
    //this.templateLoader = new Loader("templates");
}
ConfigLoader.prototype = {
    load: function () {
        console.log("Loading Assets!")
        var def = $.Deferred();
        this.bootstrapLoader.fetch([
            {id: "master",  url: "./assets/json/master.json" },
            {id: "strings", url: "./assets/json/strings.json" }
        ]).done(()=> {
            var master = this.bootstrapLoader.get("master");
            var pageAssets = [];
            var templateAssets = [];
            // create Page & Template assets to preload next.
            master.pages.forEach(page => {
                pageAssets.push( {
                    id:  page.id,
                    url: page.config
                })
                // templateAssets.push({
                //     id:  page.id,
                //     url: page.template
                // })
            })
            $.when.apply(null, [this.pagesLoader.fetch(pageAssets), /*this.templateLoader.fetch(templateAssets)*/]).done(()=>{
                def.resolve();
            })
            
        })
        return def;
    }
}
