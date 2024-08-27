<template>
  <div style="margin-bottom: 15px; min-height: 100vh">
    <ValidatorTable :validators="validators" />
  </div>
</template>

<script>
import ValidatorTable from './Table/ValidatorTable.vue';
import axios from 'axios';

export default {
  components: {
    ValidatorTable
  },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      validators: [],
    };
  },
  methods: {
    async fetchValidators() {
      try {
        const response = await axios.get(
            this.apiUrl + `cosmos/staking/v1beta1/validators`
        );
        this.validators = response.data.validators || [];
      } catch (error) {
        console.error('Error while getting validators:', error);
      }
    },
  },
  created() {
    this.fetchValidators();
  }
};
</script>

<style>

</style>
