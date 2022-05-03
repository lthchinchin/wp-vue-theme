import Vue from 'vue'
import Vuex from 'vuex'
import { loadEstate } from './modules/loadEstate'
import { vnLocal } from './modules/vietnamLocal'
import { loadProject } from './modules/loadEstateProjects'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        nameTest: "letrunghieu test vuex"
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
    ,
    modules: {
        a: loadEstate,
        b: vnLocal,
        c: loadProject,
    }

})

