<template>
  <div class="text-center">
    <br/>
    Valor armazenado no state do VUEX: <strong>{{ count }}</strong>
    <br/>
    <br/>
    <button type="submit" @click="increment">+</button>
    <button type="submit" @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    decrement() {
      this.$store.commit('decrement');
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
}
}
</script>
