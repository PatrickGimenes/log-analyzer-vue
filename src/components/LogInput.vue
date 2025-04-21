<template>
  <div class="log-input">
    <textarea
      v-model="logText"
      @input="analyze"
      placeholder="Cole o log aqui..."
    ></textarea>

    <div class="results">
      <ul>
        <li v-for="(line, index) in slowLines" :key="index">{{ line }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { parseLogs } from "../utils/logParser";

const logText = ref("");
const slowLines = ref<string[]>([]);

function analyze() {
  const result = parseLogs(logText.value);
  slowLines.value = result.slowLines;
}
</script>

<style scoped>
.log-input {
  display: flex;
  flex-direction: column;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 12px;
  font-family: monospace;
  border: 1px solid #ccc;
  resize: vertical;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
