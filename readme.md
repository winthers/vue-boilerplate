#Framework




## Bootstrapping

registrate action to be executed doing the botstrapping phaze, this happens while the app is displaying its loading screen.

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
 
assets can be registrate by calling ```App.registrateAsset("id", loader)``` and will be accesiable through ```App.assets.nameOfYourAsset``` 

use the build in loader class, or adhear to its api ```(loader.get(id), loader.has(id))``` so all assets can be 
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



## Transitions 

### Using Animate.css

An awesome way to aimate is using the Animate.css


```
 <transition
    name="custom-classes-transition"
    enter-active-class="animated zoomInShort  animation-duration-250ms"
    leave-active-class="animated zoomOutShort animation-duration-250ms"
>
    <!-- All components will be effected by the transitions -->
    <popup-image-and-text :page-id="popupAssetID" v-if="isPopupVisible && popupType == 'image'" />
    <popup-video-and-text :page-id="popupAssetID" v-if="isPopupVisible && popupType == 'video'" />
    <idle-screen v-if="isIdlescreenPopupVisible" />
</transition>
```


## Getting data in your components


### Current Page

Letting the pageManager tell you the current page id, and use that to grap page configuration from the pages Assets.

```
    {

        data: function () {
            var data = App.assets.pages.get(App.pageManager.currentPage());
            data.foobar = 1;
            return data;
        }
    }

```

### By Page ID

In a nested component it can be usefull to provide a pageID

```
    {

        props: ["pageId"],
        data: function () {
           return App.assets.pages.get(this.pageId);
        }
    }

```

### Shortcut using translate

Sometimes we just want a reference to a single string, say a video that could be subject to translation.

```
    {
        data: function () {
            return {
                video: App.translate("idlescreen/video")
            }
        }
    }

```


## Routing 

routing is handled using [backbone](http://backbonejs.org)