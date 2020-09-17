<template>
  <div>
    <h4>Cadastro</h4>
    <form v-on:submit="save">
      <label for="nome">Nome</label>
      <div>
        <input id="nome" type="text" v-model="nome" required autofocus />
      </div>
      <label for="usuario">Usuário</label>
      <div>
        <input id="usuario" type="text" v-model="usuario" required autofocus />
      </div>
      <label for="email">Email</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="senha">Senha</label>
        <div>
          <input id="senha" type="senha" v-model="senha" required />
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
      senha: "",
      nome: "",
      usuario: ""
    };
  },
  methods: {
    save(e) {
      e.preventDefault();

      var data = {
        email: this.email,
        senha: this.senha,
        nome: this.nome,
        usuario: this.usuario
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
      
      fetch("http://localhost:3000/User/", requestOptions).then(
        async (response) => {
          //Redireciona para a lista de usuários
          this.$router.push("UsuarioList");
        }
      );
    },
  },
};
</script>
