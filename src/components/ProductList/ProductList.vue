<script setup lang="ts">
import { ref } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import { productService } from "../../services/productService";
import type { Product } from "../../types/productType";
import EditProductModal from "../EditProductModal/EditProductModal.vue";
const isEditModalOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

defineProps<{
  products: Product[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "edit", product: Product): void;
  (e: "deleted"): void;
  (e: "refresh"): void;
}>();

async function handleDelete(id?: number) {
  if (!id) return;
  if (!confirm("Deseja realmente excluir este produto?")) return;

  try {
    await productService.delete(id);
    emit("deleted");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    alert("Erro ao excluir produto.");
  }
}

function handleOpenEdit(product: Product) {
  selectedProduct.value = product;
  isEditModalOpen.value = true;
}
</script>

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
              <button @click="handleOpenEdit(product)" class="action-btn edit">
                <Pencil :size="18" />
              </button>
              <button
                @click="handleDelete(product.id)"
                class="action-btn delete"
              >
                <Trash2 :size="18" color="red" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <EditProductModal
      :is-open="isEditModalOpen"
      :product="selectedProduct"
      @close="isEditModalOpen = false"
      @saved="emit('refresh')"
    />
  </div>
</template>

<style scoped>
@import "./ProductList.css";
</style>
