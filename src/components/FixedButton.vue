<template>
  <div class="btn-fixed">
    <div :class="['btn-option ', isOpen && 'active']">
      <!--=====Button Option =======-->
      <div class="option">
        <a href="#" class="icon btn bi bi-save"></a>
        <div class="text ">Saved Files</div>
      </div>

      <div class="option">
        <a href="#" class="icon btn bi bi-code"> </a>
        <div class="text ">Codes</div>
      </div>
    </div>
    <!-- ============= -->
    <button
      :class="['btn btn-dark rounded main-btn ', isOpen && 'active']"
      type="button"
      @click="openOption"
    >
      <span class="bi bi-menu-button"></span>
      <span class="bi bi-x"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Fixed Button",
  data: () => {
    return {
      isOpen: false,
    };
  },
  methods: {
    openOption() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
