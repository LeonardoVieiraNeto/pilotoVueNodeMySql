<template>
  <div>
    <br />
    <h4>Login</h4>
    <form v-on:submit="login">
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
    return {
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

        console.log('Dentro do save');

        fetch("http://localhost:3000/login/", requestOptions).then(
          async (response) => {
            console.log('Dentro do  then');
            var UserNameLogado = await response.text();

            if (UserNameLogado != "") {
              alert("Usuário logado com sucesso !!");

              this.$store.commit('setUsuarioLogado', UserNameLogado);

              this.$router.push("UsuarioList");
            } else {
              alert("Usuário ou senha inválidos!!");
            }
          }
        );
      }
    },
  },
};
</script>
