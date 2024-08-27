<template>
  <div style="margin-bottom: 15px; min-height: 100vh">
    <h2 style="text-align: center">Network Details</h2>

    <div style="margin-top: 20px;">
      <h2 style="text-align: center">Bank details</h2>
      <table>
        <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Supply</td>
          <td>{{ formattedSupply }} {{ denom }}</td>
        </tr>
        <tr>
          <td>Inflation</td>
          <td>{{ inflationRate }}%</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2 style="text-align: center">Staking Parameters</h2>
      <table>
        <thead>
        <tr>
          <th>Parameter</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, key) in stakingParams" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div style="margin-top: 20px;">
      <h2 style="text-align: center">Staking Pool</h2>
      <table>
        <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Not Bonded Tokens</td>
          <td>{{ formattedUnbond }} {{ denom }}</td>
        </tr>
        <tr>
          <td>Bonded Tokens</td>
          <td>{{ formattedBond }} {{ denom }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div style="margin-top: 20px;">
      <h2 style="text-align: center">Total Accounts: {{ totalAccounts }}</h2>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      denom: import.meta.env.VITE_DENOM,
      minimalDenom: import.meta.env.VITE_MINIMAL_DENOM,
      stakingParams: {},
      pool: {},
      accounts: [],
      totalAccounts: 0,
      supply: null,
      inflation: null,
    };
  },
  computed: {
    formattedSupply() {
      return this.supply ? (this.supply / 1000000).toLocaleString() : 'Loading...';
    },
    inflationRate() {
      return this.inflation ? (parseFloat(this.inflation) * 100).toFixed(2) : 'Loading...';
    },
    formattedBond() {
      return this.pool.bonded_tokens ? (this.pool.bonded_tokens / 1000000).toLocaleString() : 'Loading...';
    },
    formattedUnbond() {
      return this.pool.not_bonded_tokens ? (this.pool.not_bonded_tokens / 1000000).toLocaleString() : 'Loading...';
    },
  },
  methods: {
    async fetchStakingParams() {
      try {
        const response = await axios.get(this.apiUrl + 'cosmos/staking/v1beta1/params');
        this.stakingParams = response.data.params;
      } catch (error) {
        console.error('Error fetching staking parameters:', error);
      }
    },
    async fetchPool() {
      try {
        const response = await axios.get(this.apiUrl + 'cosmos/staking/v1beta1/pool');
        this.pool = response.data.pool;
      } catch (error) {
        console.error('Error fetching staking pool:', error);
      }
    },
    async fetchAccounts() {
      try {
        const response = await axios.get(this.apiUrl + 'cosmos/auth/v1beta1/accounts?pagination.limit=10&pagination.count_total=true');
        this.accounts = response.data.accounts;
        this.totalAccounts = response.data.pagination.total;
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    },
    async fetchSupply() {
      try {
        const response = await axios.get(this.apiUrl + 'cosmos/bank/v1beta1/supply');
        const supplyData = response.data.supply.find(s => s.denom === this.minimalDenom);
        this.supply = supplyData ? supplyData.amount : null;
      } catch (error) {
        console.error('Error fetching supply:', error);
      }
    },
    async fetchInflation() {
      try {
        const response = await axios.get(this.apiUrl + 'cosmos/mint/v1beta1/inflation');
        this.inflation = response.data.inflation;
      } catch (error) {
        console.error('Error fetching inflation:', error);
      }
    },
  },
  created() {
    this.fetchStakingParams();
    this.fetchPool();
    this.fetchAccounts();
    this.fetchSupply();
    this.fetchInflation();
  },
};
</script>

<style scoped>

</style>
