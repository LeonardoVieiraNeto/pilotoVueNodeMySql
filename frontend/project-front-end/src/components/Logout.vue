<template>
  <div>
    <br />
    <br />
    <h2>Até Breve !!!!!!</h2>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function () {

    },
  },
  mounted() {
    localStorage.setItem("userLogged", false);
    localStorage.setItem("emailUserLogged", "");
  },
};
</script>