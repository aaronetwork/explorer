<template>
  <h2 style="text-align: center">Latest transactions</h2>
  <table>
    <thead>
    <tr>
      <th>Height</th>
      <th>TxHash</th>
      <th>Amount</th>
      <th>Timestamp</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="tx in transactions" :key="tx.txhash">
      <td>{{ tx.height }}</td>
      <td><router-link :to="`/hash/${tx.txhash}`">{{ tx.txhash }}</router-link></td>
      <td>{{ getAmount(tx) }}</td>
      <td>{{ new Date(tx.timestamp).toLocaleString() }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  methods: {
    getFromAddress(tx) {
      const msg = tx.tx.body.messages.find(
          message => message['@type'] === '/cosmos.bank.v1beta1.MsgSend'
      );
      return msg ? msg.from_address : 'N/A';
    },
    getToAddress(tx) {
      const msg = tx.tx.body.messages.find(
          message => message['@type'] === '/cosmos.bank.v1beta1.MsgSend'
      );
      return msg ? msg.to_address : 'N/A';
    },
    getAmount(tx) {
      const msg = tx.tx.body.messages.find(
          message => message['@type'] === '/cosmos.bank.v1beta1.MsgSend'
      );
      if (msg && msg.amount.length > 0) {
        const amount = msg.amount[0];
        return `${amount.amount / 1000000}`;
      }
      return 'N/A';
    }
  }
};
</script>

<style scoped>

</style>