import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const setSearchHistory = (state) => {
  const { data } = state
  localStorage.history = JSON.stringify(data)
}

const getSearchHistory = () => {
  try {
    return JSON.parse(localStorage.history)
  } catch (e) {
    return []
  }
}
export default new Vuex.Store({
  state: {
    data: getSearchHistory() || [],
  },
  getters: {
  },
  mutations: {
    addList(state,payload){
      let isExist = false
      let unShift = ""
      state.data.forEach((item,index) => {
        if(item === payload){
          isExist = true
          unShift = state.data.splice(index,1).toString()
        }
      })
      if(isExist){
        state.data.unshift(unShift);
        unShift = ""
      }else {
        state.data.push(payload)
      }

      setSearchHistory(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
