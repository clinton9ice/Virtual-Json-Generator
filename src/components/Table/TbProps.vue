<template>
  <div className="column" id="prop-column">
    <div className="empty-column" v-if="Object.keys(property).length == 0">
      No Property
    </div>

    <div className="top-form-column" v-else>
      <button class="btn text-primary">+ Add Prop</button>
    </div>

    <div v-if="selectedFile.length > 0">
      <PropItem
        :props="selectedFile"
        v-on:value="(e) => this.$emit('selectedProp', e)"
        @addcount="(e) => this.$emit('addcount')"
      />
    </div>

    <br />
  </div>
</template>

<script>
import PropItem from "./Prop-item.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    property: Object,
  },
  components: {
    PropItem,
  },
  data() {
    return {
      editing: false,
    };
  },
  computed: mapGetters(["selectedFile"]),
};
</script>

<style lang="scss" scoped></style>
