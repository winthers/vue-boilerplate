var ComponentPageIndex = {

    template: `
        <transition appear name="fade">
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


App.pageFactory.registrate("index", ComponentPageIndex);
