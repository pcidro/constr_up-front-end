<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import ProductList from "./components/ProductList/ProductList.vue";
import { ref, onMounted } from "vue";
import type { Product } from "./types/productType";
import { productService } from "./services/productService.ts";

const products = ref<Product[]>([]);
const loading = ref(false);

async function fetchProducts() {
  loading.value = true;
  try {
    products.value = await productService.getAll();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <Header />
  <main class="container">
    <ProductList :products="products" :loading="loading" />
  </main>
</template>
