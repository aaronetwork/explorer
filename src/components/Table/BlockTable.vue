<template>
  <h2 style="text-align: center">Latest block</h2>
  <table>
    <thead>
    <tr>
      <th>height</th>
      <th>time</th>
      <th>proposer_address</th>
      <th>hash</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{{ block.block.header.height }}</td>
      <td>{{ block.block.header.time }}</td>
      <td>{{ block.block.header.proposer_address }}</td>
      <td>{{ block.block_id.hash }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    block: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
