var ComponentMain = {

    template: `
        <div>
            <div v-if="loading"> 
                <h1>Loading</h1>
            </div>
            
            <div id="content-container"></div>
        </div>
    `,


    data: function () {
        return {
            loading: true
        }
    }
}