<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/#/Home" class="navbar-brand">VUE/NODE/MYSql</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/#/UsuarioList" class="nav-link">Usuario-List</a>
        </li>
        <li class="nav-item">
          <a href="/#/UsuarioInput" class="nav-link">Usuario-Input</a>
        </li>
        <li class="nav-item">
          <a href="/#/Login" class="nav-link">Login</a>
        </li>
        <li class="nav-item">
          <a href="/#/Logout" class="nav-link">Logout</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
@import'~bootstrap/dist/css/bootstrap.css'
</style>