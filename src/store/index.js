import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        firstOutline:0,
        secondOutline:0,
        delay:5000
    },
    mutations:{
        updateFirst(state,payload){
            state.firstOutline=payload  
        },
        updateSecond(state, payload) {
            state.secondOutline=payload
        }
    }
})
export default store