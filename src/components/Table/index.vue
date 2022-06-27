<template>
  <div class="table position-relative">
    <div class="tableHead d-flex align-items-center justify-content-between">
      <div :class="['rows', prop.mobileActive === 1 && 'mobileActive']">
        <div class="d-flex justify-content-between align-items-center">
          <span>File name</span>

          <button class="btn btn-dark" @click="$emit('form', true)">+</button>
        </div>
      </div>

      <div :class="['rows', prop.mobileActive === 2 && 'mobileActive']">
        <div class="d-flex"><span class="bi me-1"></span>Properties</div>
      </div>

      <div :class="['rows', prop.mobileActive === 3 && 'mobileActive']">
        Values
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const prop = defineProps({
  mobileActive: Number,
});
</script>
