#Framework




## Bootstrapping

registrate action to be executed doing the botstrapping phaze

```
App.addBootstrapAction("test", ()=> {

    // must return a promise
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, 0)
    })
})
```


## Setup

registrated functions get called after bootstrapping phaze is over

```
 App.addSetupSubscriber(()=>{ 
     console.log("my setup function was called")
 });
 ```


 ## Asset System
 
assets can be registrate by calling ```App.registrateAsset("id", loader)```
and will be accesiable through ```App.assets.nameOfYourAsset``` 
use the build in loader class, or adhear to its api (loader.get(id), loader.has(id)) so all assets can be 
accessed using this syntax

```
    App.assets.strings.get("strings")
```

**example of addind an asset  doing the bootstrap phaze**
```
  App.addBootstrapAction("load myAssets", ()=> {
        var loader = new Loader();
        App.registrateAsset("myAssets", loader)
        return loader.fetch([{id: "myAssets", url: "./assets/json/somedata.json" }])
    })
```



## Translations

by api
App.translate("menu/string")


through vue 


```
// value = "@string/someid/somecategory"            

<div>{{ value  || translate }}</div>
<div v-html="$options.filters.someFilter(value)"></div>
```



