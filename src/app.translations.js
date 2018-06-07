
(function (){


    var strings = new Strings();

    App.addBootstrapAction("load strings", ()=> {
        var loader = new Loader("strings");
        App.registrateAsset("strings", loader)
        return loader.fetch([{id: "strings", url: "./assets/json/strings.json" }])
    })

    App.addSetupSubscriber(()=>{

        strings.setData(App.assets.strings.get("strings"));
        
        // Create the App.translate Api.
        App.translate = function (id, language) {
            let stringID = /^@string(?:s)?/.test(id) ? id.replace(/@string(?:s)?\//, "") : id;
            return strings.translate(stringID, language || App.config.language);
        }
    })
}());