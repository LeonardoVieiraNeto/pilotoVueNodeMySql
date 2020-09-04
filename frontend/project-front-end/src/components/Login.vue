<template>
  <div>
    <br />
    <h1>{{ msg }}</h1>
    <br/>
    <h4>Login</h4>
    <form v-on:submit="login" >
      <label for="email">Email</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <br />
      <div>
        <button type="submit" @click="login">Login</button>
      </div>
    </form>
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
      email: "",
      password: "",
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        var data = {
          email: this.email,
          password: this.password,
        };

        var jsonData = JSON.stringify(data);

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer my-token",
            "My-Custom-Header": "foobar",
            "Access-Control-Allow-Origin": "*",
          },
          body: jsonData,
        };

        fetch("http://localhost:3000/auth", requestOptions).then(
          async (response) => {
            var logado = await response.text();
            logado = JSON.parse(logado);

            if (logado === true) {
              alert("Usuário logado com sucesso !!");

              localStorage.setItem("userLogged", true);
              localStorage.setItem("emailUserLogged", this.email);
              //Redireciona para a página inicial
              this.$router.push("Home");
            } else {
              alert("Usuário ou senha inválidos!!");
            }
          }
        );
      }
    }
  },
};
</script>
