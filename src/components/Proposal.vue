<template>
  <div style="margin-bottom: 15px; min-height: 100vh">
    <div style="text-align: center; margin-top: 25px;">
      <label for="proposal-status">Choose proposal status:</label>
      <select id="proposal-status" v-model="selectedStatus" @change="fetchProposals(1)">
        <option value="PROPOSAL_STATUS_UNSPECIFIED">PROPOSAL_STATUS_UNSPECIFIED</option>
        <option value="PROPOSAL_STATUS_DEPOSIT_PERIOD">PROPOSAL_STATUS_DEPOSIT_PERIOD</option>
        <option value="PROPOSAL_STATUS_VOTING_PERIOD">PROPOSAL_STATUS_VOTING_PERIOD</option>
        <option value="PROPOSAL_STATUS_PASSED">PROPOSAL_STATUS_PASSED</option>
        <option value="PROPOSAL_STATUS_REJECTED">PROPOSAL_STATUS_REJECTED</option>
        <option value="PROPOSAL_STATUS_FAILED">PROPOSAL_STATUS_FAILED</option>
      </select>
    </div>

    <ProposalTable :proposals="proposals" />

    <div class="pagination">
      <button @click="previousPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="nextPage" :disabled="!nextKey">Next</button>
    </div>
  </div>
</template>

<script>
import ProposalTable from './Table/ProposalTable.vue';
import axios from 'axios';

export default {
  components: {
    ProposalTable
  },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      proposals: [],
      selectedStatus: 'PROPOSAL_STATUS_UNSPECIFIED',
      page: 1,
      limit: 10,
      nextKey: '',
    };
  },
  methods: {
    async fetchProposals(page = 1) {
      try {
        const offset = (page - 1) * this.limit;
        const response = await axios.get(
            this.apiUrl + `cosmos/gov/v1/proposals?proposal_status=${this.selectedStatus}&pagination.limit=${this.limit}&pagination.offset=${offset}&pagination.count_total=true`
        );
        this.proposals = response.data.proposals || [];
        this.nextKey = response.data.pagination.next_key || '';
      } catch (error) {
        console.error('Error while getting proposals:', error);
      }
    },
    nextPage() {
      if (this.nextKey) {
        this.page += 1;
        this.fetchProposals(this.page);
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page -= 1;
        this.fetchProposals(this.page);
      }
    },
  },
  created() {
    this.fetchProposals();
  }
};
</script>

<style>

</style>
