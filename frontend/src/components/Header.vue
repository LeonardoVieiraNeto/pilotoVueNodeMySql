<template>
  <div>
    <br />
    <p class="text-center">
      {{ msg }}
      <br />
    </p>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {},
  computed: {
    msg() {
      if (this.$store.state.UsuarioLogado == "") {
        return "Efetue login ou se cadastre no sistema !";
      } else {
        return "Seja bem-vindo: " + this.$store.state.UsuarioLogado;
      }
    },
  },
};
</script>
