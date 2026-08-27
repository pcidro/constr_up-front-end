<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "../../types/productType";
import { productService } from "../../services/productService";
const errorMessage = ref("");

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saved"): void;
}>();

const loading = ref(false);

const form = ref<Product>({
  name: "",
  description: "",
  brand: "",
  price: 0,
  stock: 0,
});
function resetForm() {
  form.value = {
    name: "",
    description: "",
    brand: "",
    price: 0,
    stock: 0,
  };
}
function handleClose() {
  resetForm();
  emit("close");
}

async function handleSubmit() {
  loading.value = true;
  errorMessage.value = "";

  try {
    await productService.create(form.value);
    emit("saved");
    handleClose();
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    errorMessage.value =
      "Não foi possível cadastrar o produto. Tente novamente.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
      <div class="modal-card">
        <div class="modal-header">
          <h2>Adicionar Novo Produto</h2>
          <button class="modal-close-btn" @click="handleClose">&times;</button>
        </div>
        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-group">
            <label for="name">Nome do Produto</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="Ex: Feijão Carioca"
            />
          </div>
          <div class="form-group">
            <label for="brand">Marca</label>
            <input
              id="brand"
              v-model="form.brand"
              type="text"
              required
              placeholder="Ex: Camil"
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="price">Preço (R$)</label>
              <input
                id="price"
                v-model="form.price"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div class="form-group">
              <label for="stock">Estoque</label>
              <input id="stock" v-model="form.stock" type="number" required />
            </div>
          </div>
          <div class="form-group">
            <label for="description">Descrição</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
            ></textarea>
          </div>
          <div class="modal-actions">
            <button
              type="button"
              class="btn-cancel"
              @click="handleClose"
              :disabled="loading"
            >
              Cancelar
            </button>
            <button type="submit" class="btn-save" :disabled="loading">
              {{ loading ? "Salvando..." : "Salvar Produto" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import "./ProductModal.css";
</style>
