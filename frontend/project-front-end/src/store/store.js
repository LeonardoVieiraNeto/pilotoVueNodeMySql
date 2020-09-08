import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    UsuarioLogado: ""
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    setUsuarioLogado(state, n) {
      alert('Dentro do setUsuarioLogado');
      alert(n);
      state.UsuarioLogado = "Leo"
    }
  }
})