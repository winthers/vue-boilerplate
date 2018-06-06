var ComponentMain = {

    template: `
        <div>
        <transition name="fade">
            <div v-if="loading"> 
                <h1>Loading</h1>
            </div>
        </transition>
            
        
            <div id="content-container" ref="container"></div>
        
        </div>
    `,


    data: function () {
        return {
            loading: true
        }
    }
}