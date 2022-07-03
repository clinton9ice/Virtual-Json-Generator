<template>
  <div v-if="keys.length === 0"></div>
  <div class="item" v-for="(objKey, i) in keys" :key="objKey" v-else>
    <div
        :class="['data', objKey === selected && highlighted && 'active']"
        @click="select(objKey, i)"
    >
      <div class="item-name">{{ objKey }}</div>

      <div class="item-prop">
        <button class="btn text-secondary" type="button" @click.stop="toggleEdit(objKey)">
          <i class="bi bi-pen"></i>
        </button>

        <button class="btn text-danger" type="button" @click.stop="remove">
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
import {isObject} from "../../helper/conditions";
import {mapGetters} from "vuex";

export default {
  components: {
    InlineForm,
  },
  emits: ["value", "addcount"],
  props: {
    dropdown: Boolean,
    items: Array,
  },
  data() {
    return {
      editMode: false,
      keys: [],
      values: [],
      selected: "",
      openForm: false,
      highlighted: false,
      properties: {}
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
    setValue(file) {
      if (isObject(file)){
        this.keys = Object.keys(file);
        this.values = Object.values(file)
      }
    }
  },
  created() {
    this.setValue(this.selectedFile[0])
  },
  computed: mapGetters(["selectedFile"]),
  watch: {
    selectedFile(recent) {
        this.setValue(recent[0])
    }
  }
};
</script>

<style lang="scss" scoped></style>
