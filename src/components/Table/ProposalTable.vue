<template>
  <h2 style="text-align: center">Proposals</h2>

  <div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="proposal in proposals">
        <td>{{ proposal.id }}</td>
        <td>{{ proposal.title }}</td>
        <td>{{ proposal.status }}</td>
        <td><router-link :to="`/proposal/${proposal.id}`">View details</router-link></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    proposals: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
