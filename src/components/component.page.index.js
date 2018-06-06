var ComponentPageIndex = {

    template: `
        <transition name="fade">
            <div>
                <h1>{{ title | translate }}</h1>
                <p>
                    {{body | translate}}
                </p>
                <img :src="$options.filters.translate(img)"/> 
            </div>
        </transition>
    `,

    data: function () {
        return App.assets.pages.get(App.pageManager.currentPage());
    }
};


// skal laves om så jeg bruge dynamic components istædet. 


App.pageFactory.registrate("index", ComponentPageIndex);
