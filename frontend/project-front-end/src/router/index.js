import Vue from 'vue'
import Routers from 'vue-router'
import UsuarioInput from '@/components/UsuarioInput'
import UsuarioList from '@/components/UsuarioList'
import Primeiro from '@/components/Primeiro'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Counter from '@/components/Counter'
import Header from '@/components/Header'

Vue.use(Routers)

export default new Routers({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/UsuarioInput',
      name: 'UsuarioInput',
      component: UsuarioInput
    },
    {
      path: '/UsuarioList',
      name: 'UsuarioList',
      component: UsuarioList
    },
    {
      path: '/Primeiro',
      name: 'Primeiro',
      component: Primeiro
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/Counter',
      name: 'Counter',
      component: Counter
    },
    {
      path: '/Header',
      name: 'Header',
      component: Header
    }
  ]
})
