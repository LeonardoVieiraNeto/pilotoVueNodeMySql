<template>
  <div>
    <h4>Cadastro</h4>
    <form v-on:submit="save">
      <label for="name">Nome</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus />
      </div>
      <label for="lastName">SobreNome</label>
      <div>
        <input id="LastName" type="text" v-model="lastName" required autofocus />
      </div>
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
        <button type="submit" @click="save">Salvar</button>
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
      name: "",
      lastName: ""
    };
  },
  methods: {
    save(e) {
      e.preventDefault();

      var data = {
        email: this.email,
        password: this.password,
        name: this.name,
        lastName: this.lastName
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
      fetch("http://localhost:3000/Usuario/Insert", requestOptions).then(
        async (response) => {
          //Redireciona para a lista de usuários
          this.$router.push("UsuarioList");
        }
      );
    },
  },
};
</script>
