<template>
  <h2 style="text-align: center">Validators</h2>
  <table>
    <thead>
    <tr>
      <th>moniker</th>
      <th>operator_address</th>
      <th>jailed</th>
      <th>status</th>
      <th>tokens</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="validator in validators">
      <td>{{ validator.description.moniker }}</td>
      <td>{{ validator.operator_address }}</td>
      <td>{{ validator.jailed }}</td>
      <td>{{ validator.status }}</td>
      <td>{{ validator.tokens / 1000000 }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    validators: {
      type: Array,
      required: true
    }
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>