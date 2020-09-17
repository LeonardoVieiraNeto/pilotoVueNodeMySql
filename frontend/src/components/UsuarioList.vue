<template>
  <table class="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>usuario</th>
        <th>email</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="val in users">
        <td>{{ val.id }}</td>
        <td>{{ val.nome }}</td>
        <td>{{ val.usuario }}</td>
        <td>{{ val.email }}</td>
        <td>
          <!-- <button>Add</button>
            <button>Edit</button>
          <button>Delete</button>-->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
var users = new Array();

export default {
  data() {
    if (users.length == 0) {
      // GET request using fetch with error handling
      fetch("http://localhost:3000/user/")
        .then(async (response) => {
          if (response.ok) {
            // if HTTP-status is 200-299
            // get the response body (the method explained below)
            let json = await response.json();
            json.map(function (item) {
              users.push({
                id: item.id,
                usuario: item.usuario,
                nome: item.nome,
                email: item.email,
              });
            });
          } else {
            alert("HTTP-Error: " + response.status);
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("Ocorreu um erro no GET!", error);
        });
    }
    return { users };
  },
};
</script>