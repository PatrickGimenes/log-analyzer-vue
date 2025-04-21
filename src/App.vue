<template>
  <main class="container">
    <h1>Log Analyzer</h1>
    <LogInput />
  </main>
</template>

<script setup lang="ts">
import LogInput from "./components/LogInput.vue";
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
