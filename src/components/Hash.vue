<template>
  <div style="min-height: 100vh">
    <div class="hash-content">
      <h2>Hash Information</h2>

      <table v-if="transaction && transaction.messages.length">
        <thead>
        <tr>
          <th>height</th>
          <th>txhash</th>
          <th>gas_wanted</th>
          <th>gas_used</th>
          <th>timestamp</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ txData.height }}</td>
          <td>{{ txData.txhash }}</td>
          <td>{{ txData.gas_wanted }}</td>
          <td>{{ txData.gas_used }}</td>
          <td>{{ txData.timestamp }}</td>
        </tr>
        </tbody>
      </table>

      <table v-if="transaction && transaction.messages.length">
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        <tr v-for="(value, key) in transaction.messages[0]" :key="key">
          <td>{{ key }}</td>
          <td v-if="typeof value === 'object'">{{ JSON.stringify(value, null, 2) }}</td>
          <td v-else>{{ value }}</td>
        </tr>
      </table>

      <p v-if="!transaction && !error">Loading...</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Hash',
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      hash: this.$route.params.hash,
      txData: null,
      transaction: null,
      error: null,
    };
  },
  created() {
    this.fetchTransaction();
  },
  methods: {
    async fetchTransaction() {
      try {
        const response = await axios.get(this.apiUrl + `cosmos/tx/v1beta1/txs/${this.hash}`);
        this.txData = response.data.tx_response;

        this.transaction = {
          messages: this.txData.tx.body.messages,
        };
      } catch (error) {
        this.error = 'Failed to fetch transaction data.';
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.hash-content {
  padding: 20px;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
