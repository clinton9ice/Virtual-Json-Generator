<template>
  <div class="item" v-for="(objKey, i) in keys" :key="objKey">
    <div
      :class="['data', objKey === selected && highlighted && 'active']"
      @click="select(objKey, i)"
    >
      <div class="item-name">{{ objKey }}</div>

      <div class="item-prop">
        <button
          class="btn text-secondary"
          type="button"
          @click="toggleEdit(objKey)"
        >
          <i class="bi bi-pen"></i>
        </button>

        <button class="btn text-danger" type="button" @click="remove">
          <i class="bi bi-trash2"></i>
        </button>

        <span class="type small text-muted">{{
          Array.isArray(values[i]) ? "array" : typeof values[i]
        }}</span>
      </div>
    </div>
    <InlineForm
      :isAlive="objKey === selected && openForm"
      :name="objKey"
      :value="values[i]"
    />
  </div>
</template>

<script>
import InlineForm from "../Form/InlineForm.vue";
export default {
  components: {
    InlineForm,
  },
  emits: ["value", "addcount"],
  props: {
    props: Array,
    dropdown: Boolean,
  },
  data() {
    return {
      editMode: false,
      keys: {},
      values: {},
      selected: "",
      openForm: false,
      highlighted: false,
    };
  },
  methods: {
    remove() {
      confirm("this property will be removed from the list");
    },
    toggleEdit(e) {
      this.selected = e;
      this.openForm = !this.openForm;
    },
    select(e, index) {
      this.selected = e;
      this.highlighted = true;
      this.$emit("value", this.values[index]);
      this.$emit("addcount")
    },
  },
  created() {
    this.keys = Object.keys(this.props[0]);
    this.values = Object.values(this.props[0]);
  },
};
</script>

<style lang="scss" scoped></style>
