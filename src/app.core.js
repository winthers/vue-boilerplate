(function(){

    var App = {};
    window.App = App;

    App.config = config;


    // Assets Registration
    // ----------------------------------------------------------
    App.assets = {};
    App.registrateAsset = function (name, loader) {
        App.assets[name] = loader;
    }



    // Bootstrap Actions
    // ----------------------------------------------------------

    var bootstrapActions = [];

    App.addBootstrapAction = (name, fn) => {

        var payload = {
            execute:  () => {
                console.log(" - Executing Action '%s'", name);
                return fn();
            }
        }

        bootstrapActions.push(payload);
        
    };

    function executebootstrapActions () {
        if (bootstrapActions.length)
            console.log("Executing bootstrap actions:")
        return Promise.all(bootstrapActions.map(a => a.execute())).then(()=>{
            console.log("bootstrap actions complete!")
        })
    }
    

    // Start up subscribers
    // ----------------------------------------------------------
    var startupSubscribers = [];
    let notifySetupSubscribers = () => {
        startupSubscribers.forEach(f => f())
        startupSubscribers = null;
    }
    App.addSetupSubscriber = (fn) =>  {
        startupSubscribers.push(fn)
    }




    // Setup & Start
    // ----------------------------------------------------------

    let setUp = () => {
        // do application level stuff here.
        notifySetupSubscribers();
        
        App.vm.$data.loading = false;

        App.injectPage("index");
    }
    
   

    App.start = function () {

        var ComponentClass = Vue.extend(ComponentMain);
        var instance = new ComponentClass()
            instance.$mount();
        document.getElementById("app").appendChild(instance.$el)
        App.radio = new Vue({}); 
        App.vm = instance;


        executebootstrapActions().then(()=>{
            setUp();
        }).catch(e => {
            console.error("failed to start the application: '%s'", e);
        })
    }



}())