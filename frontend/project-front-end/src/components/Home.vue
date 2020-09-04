<template>
  <div>
    <br />
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    var mensagem = "";
    if (localStorage.userLogged === "true") {
      mensagem = "Seja bem vindo usuário logado: " + localStorage.emailUserLogged;
    } else {
      mensagem = "Efetue login ou se cadastre no sistema !";
    }
    return {
      msg: mensagem,
    };
  },
};
</script>

