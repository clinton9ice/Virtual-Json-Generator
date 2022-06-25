<template>
  <Navigation brand="JSM"> </Navigation>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
            ></component>
      <!-- <keep-alive>
        <suspense>
          <template #default>
          </template>
          <template #fallback> loading... </template>
        </suspense>
      </keep-alive> -->
    </transition>
  </router-view>
</template>

<script setup>
import Navigation from "@/components/Navigation.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms linear;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
