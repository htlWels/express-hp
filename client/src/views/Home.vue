<template>
  <div class="dashboard">
    <Dashboard  />
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/Dashboard.vue';

export default {
  name: 'Home',
  components: {
    Dashboard,
  },
};
</script>
<style scoped>
.dashboard {
  margin-bottom: 50px;
}
</style>