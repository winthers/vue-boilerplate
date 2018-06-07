var ComponentPageIndex = {

    template: `
      
        <div class="page index">
            <h1>{{ title | translate }}</h1>
            <p>
                {{body | translate}}
            </p>
            <img :src="$options.filters.translate(img)"/> 
        </div>
       
    `,

    data: function () {
        return App.assets.pages.get(App.pageManager.currentPage().id);
    }
};

App.pageFactory.registrate("index", ComponentPageIndex);
