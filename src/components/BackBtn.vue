<template>
  <button class="btn bg-white shadow-sm" id="backBtn" @click="decreement">
    <i class="bi bi-arrow-left-short text-danger"></i>
  </button>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["reduce"]);

function decreement() {
  emit("reduce");
}
</script>
