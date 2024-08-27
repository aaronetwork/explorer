<template>
  <div style="margin-bottom: 15px; min-height: 100vh">
    <TransactionTable :transactions="transactions" />
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="transactions.length < itemsPerPage">Next</button>
    </div>
  </div>
</template>

<script>
import TransactionTable from './Table/TransactionTable.vue';
import axios from 'axios';

export default {
  components: {
    TransactionTable
  },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      transactions: [],
      currentPage: 1,
      itemsPerPage: 25,
    };
  },
  methods: {
    async fetchTransactions(page = 1) {
      try {
        const response = await axios.get(
            this.apiUrl + `cosmos/tx/v1beta1/txs?query=message.action=%27/cosmos.bank.v1beta1.MsgSend%27&limit=${this.itemsPerPage}&page=${page}&order_by=ORDER_BY_DESC`
        );
        this.transactions = response.data.tx_responses || [];
      } catch (error) {
        console.error('Error while getting transactions:', error);
      }
    },
    nextPage() {
      if (this.transactions.length === this.itemsPerPage) {
        this.currentPage++;
        this.fetchTransactions(this.currentPage);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTransactions(this.currentPage);
      }
    }
  },
  created() {
    this.fetchTransactions();
  }
};
</script>

<style>

</style>
