function PageManager (mediator) {
    this.mediator = mediator || {
        navigate: (id) => {
            console.log("todo impliment pagemanager.mediator!")
        }
    }
    this.index = -1;
    this.pages = [];
}

PageManager.prototype = {

    start: function () {
        this.navigate();
    },

    navigate: function () {
        if(this.mediator)
            this.mediator.navigate(this.currentPage());
    },

    setPages: function (pages) {
        var temp = [];
        pages.forEach(o => { 
            if(temp.indexOf(o.id)<0)
               temp.push(o.id);
            else
            throw new Error("Configuration Error, dublicate page id's: '"+ o.id +"' in master.json")
        })
        this.pages = temp;
        this.index = 0;
    },

    currentPage: function () {
        if(this.pages.length) {
            return this.pages[this.index]
        }
        return false;
    },

  

    goto: function (pageId) {
        var index = -1;
        var exists = false;
        this.pages.forEach((id, i)=>{
            if(id == pageId){
                exists = true;
                index = i;
            }
        })
        if(exists) {
            this.index = index;
            this.navigate();
        }
        return false;
    },

    prev: function () {
        this.index = this.index -1;
        if (this.index < 0) 
            this.index = 0;
        this.navigate();
    },

    next: function () {
        this.index = this.index +1;
        if(this.index > this.pages.length-1)
            this.index = this.pages.length-1;
        this.navigate();
    },

    hasNext: function () {
        return this.pages.length  ? this.index < this.pages.length-1 : false;
    },
    
    hasPrev: function () {
        return this.index > 0;
    }

}