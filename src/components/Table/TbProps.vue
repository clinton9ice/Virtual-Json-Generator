<template>
  <div class="column" id="prop-column">
    <div class="empty-column" v-if="Object.keys(selectedFile).length === 0">
      No Property
    </div>

    <div class="top-form-column" v-else>
      <button class="btn text-primary">+ Add Prop</button>
    </div>

    <div v-if="selectedFile.length > 0">
      <PropItem :items="selectedFile" v-on:value="(e) => this.$emit('selectedProp', e)" @addcount="(e) => this.$emit('addcount')"/>
    </div>

    <br />
  </div>
</template>

<script>
import PropItem from "./Prop-item.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    PropItem,
  },
  data() {
    return {
      editing: false,
      file: null
    };
  },
  computed: mapGetters(["selectedFile"])
};
</script>

<style lang="scss" scoped></style>
