<template>
  <header class="header">
    <div class="logo-title-container">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </router-link>
      <div class="site-title">
        <span>{{ siteName }}</span><br />
        <span>Explorer</span>
      </div>
    </div>

    <nav class="menu">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/validator">Validators</router-link></li>
        <li><router-link to="/block">Blocks</router-link></li>
        <li><router-link to="/transaction">Transactions</router-link></li>
        <li><router-link to="/proposal">Proposals</router-link></li>
      </ul>
    </nav>

    <div class="search-container">
      <input
          type="text"
          class="search-input"
          placeholder="Search by address"
          v-model="searchQuery"
          @keyup.enter="searchAddress"
      />
      <button class="search-button" @click="searchAddress">Search</button>
    </div>

  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      siteName: import.meta.env.VITE_SITE_NAME,
      searchQuery: ''
    };
  },
  methods: {
    searchAddress() {
      if (this.searchQuery.trim() !== '') {
        this.$router.push(`/address/${this.searchQuery.trim()}`);
      }
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #282c34;
  color: #ffffff;
  height: 60px;
}

.logo-title-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 4px;
}

.site-title {
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
  text-align: left;
}

.menu {
  margin-right: auto;
  margin-left: 20px;
}

.menu ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.menu ul li {
  display: inline;
}

.menu ul li a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

.menu ul li a:hover {
  color: #61dafb;
}

.search-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.search-input {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;
}

.search-button {
  padding: 5px 12px;
  border-radius: 4px;
  background-color: #61dafb;
  color: #282c34;
  border: none;
  cursor: pointer;
}

.search-button:hover {
  background-color: #21a1f1;
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.supply-info, .inflation-info {
  font-size: 16px;
}

.supply-info {
  margin-bottom: 4px;
  white-space: nowrap;
}

.inflation-info {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
  }

  .logo-title-container {
    margin-bottom: 10px;
  }

  .menu {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }

  .search-container {
    margin-bottom: 10px;
    width: 100%;
  }

  .info-container {
    align-items: flex-start;
    text-align: left;
  }

  .supply-info, .inflation-info {
    margin-right: 0;
    margin-bottom: 5px;
  }

  .search-input {
    width: calc(100% - 90px);
  }
}
</style>
