<script setup lang="ts">
const emit = defineEmits<{
  (e: "open-modal"): void;
}>();
</script>

<template>
  <header class="header">
    <div class="header-info">
      <h1 class="header-title">Constr Up</h1>
      <p class="header-subtitle">Liste, edite e adicione produtos ao estoque</p>
    </div>
    <button @click="emit('open-modal')" class="btn-add">
      <span>Adicionar produto</span>
    </button>
  </header>
</template>

<style scoped>
@import "./Header.css";
</style>
