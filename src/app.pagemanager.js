(function(){

    var pagemanager = null;
    var currentPageInstance = null;

    var pages = {};
    App.pageFactory = {

        registrate: function (id, component) {
            pages[id] = component;
        },

        get: function (id) {
            return pages[id];
        },

        has: function (id) {
            return pages.hasOwnProperty(id);
        }
    };



    App.injectPage = function (id) {
        //var container = document.querySelector("#content-container");



        var ComponentClass = Vue.extend(App.pageFactory.get(id));
        var instance = new ComponentClass({
            parent: App.vm
        })
        instance.$mount();
          //  container.appendChild(instance.$el)

            
        instance.$once("beforeDestroy", ()=> {
                // ..
        })
            
        instance.$nextTick().then(()=>{
            App.vm.$refs.container.appendChild(instance.$el)
           
        })
       
        currentPageInstance = instance;

        // Find a way to inject dynamic component in the main vm to leverage the transition system ?
    }



    App.addBootstrapAction("load manifest and pages", ()=> {

        return new Promise((resolve, reject) => {


            var loader = new Loader("manifest");
            App.registrateAsset("manifest", loader);

            loader.fetch([{id: "manifest", url: "./assets/json/master.json"}]).done(()=>{
                var manifest = loader.get("manifest");
                var pageAssets = [];
                var templateAssets = [];
                
                // create Page & Template assets to preload next.
                manifest.pages.forEach(page => {
                    pageAssets.push( {
                        id:  page.id,
                        url: page.config
                    })
                })

                var pageLoader = new Loader("pages");
                App.registrateAsset("pages", pageLoader);
                pageLoader.fetch(pageAssets).done(resolve);
            })
        })
    })

    App.addSetupSubscriber(()=>{

        pagemanager = new PageManager({
            navigate: function(pageID) {
                console.log("navigate to '%s'", pageID);
                console.log("pageData", JSON.stringify(App.assets.pages.get(pageID)));
                
            }
        })
        pagemanager.setPages(App.assets.manifest.get("manifest").pages);
        App.pageManager = pagemanager;

        pagemanager.currentPageInstance =  function () {
            return currentPageInstance;
        };
        pagemanager.start();

    });

}())