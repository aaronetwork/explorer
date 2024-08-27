<template>
  <div style="min-height: 100vh">
    <div class="address-content">
      <h2>Address Information</h2>
      <table v-if="balance">
        <thead>
        <tr>
          <th>Address</th>
          <th>Balance</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ address }}</td>
          <td>{{ formattedBalance }} {{ denom }}</td>
        </tr>
        </tbody>
      </table>
      <p v-else>Loading balance...</p>

      <h3>Transactions</h3>
      <div class="tabs">
        <button
            :class="{ active: currentTab === 'send' }"
            @click="currentTab = 'send'; fetchTransactions('send')"
        >
          Send
        </button>
        <button
            :class="{ active: currentTab === 'receive' }"
            @click="currentTab = 'receive'; fetchTransactions('receive')"
        >
          Receive
        </button>
      </div>

      <table v-if="transactions.length">
        <thead>
        <tr>
          <th>Tx Hash</th>
          <th>Type</th>
          <th>Time</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tx in transactions" :key="tx.txhash">
          <td>
            <router-link :to="`/hash/${tx.txhash}`">{{ tx.txhash }}</router-link>
          </td>
          <td>{{ getOperationType(tx) }}</td>
          <td>{{ new Date(tx.timestamp).toLocaleString() }}</td>
        </tr>
        </tbody>
      </table>
      <p v-else>Loading transactions...</p>

      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage" :disabled="transactions.length < itemsPerPage">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Address',
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      denom: import.meta.env.VITE_DENOM,
      minimalDenom: import.meta.env.VITE_MINIMAL_DENOM,
      address: this.$route.params.address,
      balance: null,
      transactions: [],
      currentTab: 'send',
      currentPage: 1,
      itemsPerPage: 15,
    };
  },
  computed: {
    formattedBalance() {
      return this.balance ? (this.balance.amount / 1000000).toLocaleString() : '0.00';
    }
  },
  watch: {
    '$route.params.address'(newAddress) {
      this.address = newAddress;
      this.fetchBalance();
      this.fetchTransactions(this.currentTab, 1);
    }
  },
  async created() {
    await this.fetchBalance();
    await this.fetchTransactions(this.currentTab, this.currentPage);
  },
  methods: {
    async fetchBalance() {
      try {
        const response = await axios.get(
            this.apiUrl + `cosmos/bank/v1beta1/balances/${this.address}`
        );
        const balanceData = response.data.balances.find(b => b.denom === this.minimalDenom);
        this.balance = balanceData || { denom: this.minimalDenom, amount: '0' };
      } catch (error) {
        console.error('Error fetching balance:', error);
        this.balance = { denom: this.minimalDenom, amount: '0' };
      }
    },
    async fetchTransactions(type = 'send', page = 1) {
      try {
        const queryParam = type === 'send' ? 'transfer.sender' : 'transfer.recipient';
        const response = await axios.get(
            this.apiUrl + `cosmos/tx/v1beta1/txs?query=${queryParam}='${this.address}'&page=${page}&limit=${this.itemsPerPage}&order_by=ORDER_BY_DESC`
        );
        this.transactions = response.data.tx_responses || [];
      } catch (error) {
        console.error('Error fetching transactions:', error);
        this.transactions = [];
      }
    },
    getOperationType(tx) {
      const fullType = tx.tx.body.messages[0]['@type'];
      return fullType.split('.').pop();
    },
    nextPage() {
      if (this.transactions.length === this.itemsPerPage) {
        this.currentPage++;
        this.fetchTransactions(this.currentTab, this.currentPage);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTransactions(this.currentTab, this.currentPage);
      }
    }
  }
};
</script>

<style scoped>
.address-content {
  padding: 20px;
  text-align: center;
}

.tabs {
  margin: 20px 0;
}

.tabs button {
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}

.tabs button.active {
  background-color: #6200ea;
  color: white;
}

table {
  margin: 20px auto;
  border-collapse: collapse;
  width: 80%;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #6200ea;
  color: white;
  font-weight: bold;
}
</style>
