<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-center">Marca</th>
          <th class="text-center">Preço</th>
          <th class="text-center">Estoque</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="text-left">
            <div class="info-wrapper">
              <span class="item-name">{{ product.name }}</span>
              <span class="item-description">{{ product.description }}</span>
            </div>
          </td>
          <td class="text-center">
            <span class="badge">{{ product.brand }}</span>
          </td>
          <td class="text-center item-text">{{ product.price }}</td>
          <td class="text-center">
            <span :class="product.stock === 0 ? 'noitem' : 'item-text'">
              {{ product.stock }}
            </span>
          </td>
          <td class="text-center">
            <div class="actions-wrapper">
              <button @click="emit('edit', product)" class="action-btn edit">
                Editar
              </button>
              <button
                @click="emit('delete', product.id)"
                class="action-btn delete"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "./ProductList.css";
</style>

<script setup lang="ts">
import type { Product } from "../../types/productType";
defineProps<{
  products: Product[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "edit", product: Product): void;
  (e: "delete", id: number | undefined): void;
}>();
</script>
