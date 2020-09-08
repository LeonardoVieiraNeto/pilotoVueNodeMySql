<template>
  <div>
    <br/>
    <p class="text-center">
      {{ msg }}
      <br />
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    var msg = "";
  if (this.$store.state.UsuarioLogado == "") {
      msg = "Efetue login ou se cadastre no sistema !";
    } else {
      msg = this.$store.state.usuarioLogado;
    }
    return {
      msg : msg
    };
  },
  name: "Header",
  methods: {},
};
</script>
