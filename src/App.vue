<template>
  <div id="app">
    <Header @search="handleSearch" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Footer
  },
  methods: {
    handleSearch(searchQuery) {
      this.$router.push({ name: 'Home', query: { search: searchQuery } });
    }
  }
};
</script>
