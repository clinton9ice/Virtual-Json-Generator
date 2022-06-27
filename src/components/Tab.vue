<template>
  <div class="d-flex align-items-center justify-content-between flex-wrap p-3">
    <slot></slot>

    <div class="d-flex bg-white px-3 rounded-1 shadow-1 ms-auto">
      <div class="card-item mx-3" v-for="tab in tabs" :key="tab.name">
        <button
          :class="['btn', tab.isActive && 'text-primary']"
          type="button"
          @click="changeTab(tab.name)"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      tabs: [
        { name: "Table", isActive: true },
        { name: "Json", isActive: false },
      ],
    };
  },
  methods: {
    changeTab(e) {
      this.tabs.map((tab) => {
        tab.isActive = false;
        if (tab.name === e) {
          this.$emit("activeTab", tab.name);
          return (tab.isActive = !tab.isActive);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
