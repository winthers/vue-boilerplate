(function(){

    // Create the App Object.
    // ----------------------------------------------------------
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
        notifySetupSubscribers();
        App.vm.$data.loading = false;

        // call router.resolve witch in turn should call the on pageManager.navigate 
        App.router.start();
    }
    
   

    App.start = function () {
        
        /***********************************************************************************************
          Start Flow:
          ============
          1. Create and mounte an instance of the 'ComponentMain' and insert it in to the dom.
             The Components loading property is sat to true, so its loading screen will be shown.
          2. Create the App.radio and App.vm attributes.
          3. Run the bootstrapping actions.
          4. Notify the Setup subscribers
          5. Calling Setup -  Set loading to false & Inject the IndexPage (should be defined in a router as the '' route).
        ***********************************************************************************************/

        var ComponentClass = Vue.extend(ComponentMain);
        var instance = new ComponentClass()
            instance.$mount("#app"); // replace the #app element with the component
    
        App.radio = new Vue({}); 
        App.vm = instance;

        // Make sure the instance have been mounted proberly by using next tick.
        instance.$nextTick().then(()=>{
            executebootstrapActions().then(()=>{
                setUp();
            }).catch(e => {
                console.error("failed to start the application: '%s'", e);
            })
        });
    }

}());