<script setup lang="ts">
import { ref, watch } from "vue";
import type { Product } from "../../types/productType";
import { productService } from "../../services/productService";

const props = defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saved"): void;
}>();

const loading = ref(false);
const errorMessage = ref("");

const form = ref<Product>({
  name: "",
  description: "",
  brand: "",
  price: 0,
  stock: 0,
});

watch(
  () => props.product,
  (selected) => {
    if (selected) {
      form.value = { ...selected };
    }
  },
  { immediate: true },
);

function handleClose() {
  emit("close");
}

async function handleSubmit() {
  if (!props.product?.id) return;

  loading.value = true;
  errorMessage.value = "";

  try {
    await productService.update(props.product.id, form.value);
    emit("saved");
    handleClose();
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    errorMessage.value =
      "Não foi possível atualizar o produto. Tente novamente.";
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
          <h2>Editar Produto</h2>
          <button class="modal-close-btn" @click="handleClose">&times;</button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-form">
          <div class="form-group">
            <label for="edit-name">Nome do Produto</label>
            <input id="edit-name" v-model="form.name" type="text" required />
          </div>

          <div class="form-group">
            <label for="edit-brand">Marca</label>
            <input id="edit-brand" v-model="form.brand" type="text" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-price">Preço (R$)</label>
              <input
                id="edit-price"
                v-model="form.price"
                type="number"
                step="0.01"
                required
              />
            </div>

            <div class="form-group">
              <label for="edit-stock">Estoque</label>
              <input
                id="edit-stock"
                v-model="form.stock"
                type="number"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="edit-description">Descrição</label>
            <textarea
              id="edit-description"
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
              {{ loading ? "Salvando..." : "Salvar Alterações" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import "./EditProductModal.css";
</style>
