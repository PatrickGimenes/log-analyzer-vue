<template>
  <div class="log-input">
    <textarea
      v-model="logText"
      @input="analyze"
      placeholder="Cole o log aqui..."
    ></textarea>

    <div class="results" v-if="executions.length > 0">
      <h2>Análise</h2>
      <ul>
        <li
          v-for="(exec, index) in executions"
          :key="index"
          :class="getClass(exec.durationMs)"
        >
          <span>{{ exec.functionName }}</span>
          <span>{{ exec.durationMs }} ms</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { parseLogs } from "../utils/logParser";

const logText = ref("");
const executions = ref<{ functionName: string; durationMs: number }[]>([]);

function analyze() {
  const result = parseLogs(logText.value);
  executions.value = result.results;
}

function getClass(duration: number) {
  if (duration >= 1000) return "red";
  if (duration >= 500 && duration <= 800) return "yellow";
  if (duration < 100) return "green";
  return ""; // sem cor
}
</script>

<style scoped>
.log-input {
  display: flex;
  flex-direction: row; /* coloca lado a lado */
  gap: 20px; /* espaço entre textarea e resultados */
  align-items: flex-start; /* alinha no topo */
}

textarea {
  width: 50%;
  height: 300px;
  padding: 12px;
  font-family: monospace;
  border: 1px solid #ccc;
  resize: both;
  font-size: 14px;
}

.results {
  width: 50%;
  max-height: 300px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 12px;
  background-color: #f9f9f9;
}

.results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.results li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ccc;
  padding: 4px 0;
}

.red {
  color: red;
  font-weight: bold;
}

.yellow {
  color: goldenrod;
  font-weight: bold;
}

.green {
  color: green;
}
</style>
