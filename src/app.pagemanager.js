(function(){

    var pagemanager = null;
    var currentPageInstance = null;

    var pages = {};
    App.pageFactory = {

        registrate: function (id, component) {
            //pages[id] = component;
            pages[id] = true;

            // trying to registrate the component as a global component.
            Vue.component(id, component);
        },

        // get: function (id) {
        //     return pages[id];
        // },

        has: function (id) {
            return pages.hasOwnProperty(id);
        }
    };



    App.injectPage = function (id) {


        if (App.pageFactory.has(id)) {
            // test native components
            // allows to add pages of same type.
            App.vm.currentPageComponent = "";
            App.vm.$nextTick().then(()=>{
                App.vm.currentPageComponent = id;
            })
        }else {
            alert(`ERROR: Attempting to show the page "${id}" that does not exist.. Has it been registrated?`);
        }
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
            navigate: function(page) {
                console.log("pagemanager.navigate => '%s'", JSON.stringify(page));
                console.log("- pageData", JSON.stringify(App.assets.pages.get(page.id)));
                App.injectPage(page.type);
                
            }
        })
        pagemanager.setPages(App.assets.manifest.get("manifest").pages);
        App.pageManager = pagemanager;

        pagemanager.currentPageInstance =  function () {
            return currentPageInstance;
        };
       // pagemanager.start();

    });

}())