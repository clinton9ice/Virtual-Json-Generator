<template>
  <button class="btn btn-dark" id="backBtn" @click="decreement">
    <i class="bi bi-arrow-left-short"></i>
  </button>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["reduce"]);

function decreement() {
  emit("reduce");
}
</script>

<style lang="scss" scoped>

.btn {
  position: absolute;
  bottom: 5px;
  border-radius: 50%;
  padding: 0;
  height: 30px;
  width: 30px;
  left: -15px;
  display: none;

}
</style>
