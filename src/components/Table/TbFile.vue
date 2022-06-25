<template>
  <div class="column" id="fileName-column">
    <div class="empty-column" v-if="allFiles.length === 0">Create File</div>

    <div class="item" v-else>
      <div
        :class="['data', doc.isSelected && 'active']"
        :key="doc.id"
        v-for="doc in allFiles"
        @click="select(doc.id)"
      >
        <div class="item-name">{{ doc.name }}</div>

        <div class="item-prop">
          <button class="btn text-secondary" @click="download(doc)">
            <i class="bi bi-cloud-arrow-down"></i>
          </button>

          <button class="btn text-danger" @click="deleteFile">
            <i class="bi bi-trash2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  emits: ["addcount"],
  methods: {
    download(doc) {
      console.log(doc.name + " downloading...");
    },
    deleteFile() {
      console.log("deleting...");
    },
    select(id) {
      this.$store.commit("selectFile", id)
      this.$emit("addcount");
    },
  },
  computed: mapGetters(["allFiles"]),
};
</script>

<style lang="scss" scoped></style>
