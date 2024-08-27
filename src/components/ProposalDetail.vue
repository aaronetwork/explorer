<template>
  <div v-if="proposal" class="proposal-details" style="min-height: 100vh">
    <h2 style="text-align: center">Proposal Details</h2>
    <table>
      <tr>
        <th>ID</th>
        <td>{{ proposal.id }}</td>
      </tr>
      <tr>
        <th>Title</th>
        <td>{{ proposal.title }}</td>
      </tr>
      <tr>
        <th>Summary</th>
        <td>{{ proposal.summary }}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td>{{ proposal.status }}</td>
      </tr>
      <tr>
        <th>Proposer</th>
        <td>{{ proposal.proposer }}</td>
      </tr>
      <tr>
        <th>Submit Time</th>
        <td>{{ new Date(proposal.submit_time).toLocaleString() }}</td>
      </tr>
      <tr>
        <th>Deposit End Time</th>
        <td>{{ new Date(proposal.deposit_end_time).toLocaleString() }}</td>
      </tr>
      <tr>
        <th>Total Deposit</th>
        <td>{{ proposal.total_deposit.map(d => `${d.amount} ${d.denom}`).join(', ') }}</td>
      </tr>
      <tr>
        <th>Voting Start Time</th>
        <td>{{ proposal.voting_start_time ? new Date(proposal.voting_start_time).toLocaleString() : 'N/A' }}</td>
      </tr>
      <tr>
        <th>Voting End Time</th>
        <td>{{ proposal.voting_end_time ? new Date(proposal.voting_end_time).toLocaleString() : 'N/A' }}</td>
      </tr>
      <tr>
        <th>Final Tally Result</th>
        <td>
          Yes: {{ proposal.final_tally_result.yes_count }},
          No: {{ proposal.final_tally_result.no_count }},
          Abstain: {{ proposal.final_tally_result.abstain_count }},
          No with Veto: {{ proposal.final_tally_result.no_with_veto_count }}
        </td>
      </tr>
      <tr>
        <th>Metadata</th>
        <td><a :href="proposal.metadata">{{ proposal.metadata }}</a></td>
      </tr>
      <tr>
        <th>Expedited</th>
        <td>{{ proposal.expedited ? 'Yes' : 'No' }}</td>
      </tr>
      <tr>
        <th>Failed Reason</th>
        <td>{{ proposal.failed_reason || 'None' }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      proposal: null,
    };
  },
  async created() {
    const proposalId = this.$route.params.id;
    try {
      const response = await axios.get(
          this.apiUrl + `cosmos/gov/v1/proposals/${proposalId}`
      );
      this.proposal = response.data.proposal;
    } catch (error) {
      console.error('Error while getting details:', error);
    }
  }
};
</script>

<style scoped>
</style>
