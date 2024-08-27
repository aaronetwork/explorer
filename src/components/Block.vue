<template>
  <div style="margin-bottom: 15px; min-height: 100vh">
    <BlockTable :block="block" />
  </div>
</template>

<script>
import axios from 'axios';
import BlockTable from "./Table/BlockTable.vue";

export default {
  components: {
    BlockTable,
  },
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      block: [],
    };
  },
  methods: {
    async fetchBlocks() {
      try {
        const response = await axios.get(
            this.apiUrl + `cosmos/base/tendermint/v1beta1/blocks/latest`
        );
        this.block = response.data || [];
      } catch (error) {
        console.error('Error while getting blocks:', error);
      }
    },
  },
  created() {
    this.fetchBlocks();
  }
};
</script>

<style>

</style>
