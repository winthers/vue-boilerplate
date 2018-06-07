

/**
 * This component is the Root Vue Instance, 
 * and becomes the App.vm.
 * 
 * This is where the root regions should be defined, for menues and such.
 */
var ComponentMain = {

    template: `

        <div id="app">
            <div class="loading-screen" v-if="loading"> 
                <h1>Loading</h1>
            </div>

            <div class="page-container" ref="container">
                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated tada"
                    leave-active-class="animated bounceOutRight">
                        
                    <!-- Shows the current Page -->
                    <component v-bind:is="currentPageComponent"></component>

                </transition>
            </div>
        </div>
    `,


    data: function () {
        return {
            
            // Indicates weather or not the loading screen should be shown.
            loading: true,

            // The id of the current Page Component shown above.
            currentPageComponent: ""
        }
    }
}