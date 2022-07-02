<template>
  <div :class="['overlay', (prop.isFormOpen && 'isOpen') ]">
    <form class="modal-container" @submit.prevent>
      <div class="modal-header d-block">
        <h3 class="p-2" v-if="tabs.current === 1">Create A File</h3>
        <h3 class="p-2" v-else>Add Property</h3>
        <br />
        <div class="tabs d-flex">
          <div class="tab me-3">
            <button
              :class="['btn', tabs.current === 1 && 'active']"
              type="button"
              @click="switchTab(1)"
            >
              1
            </button>
            <span>Create Document</span>
          </div>

          <div class="tab">
            <button
              :class="['btn', tabs.current === 2 && 'active']"
              type="button"
              @click="switchTab(2)"
            >
              2
            </button>
            <span>Create Property</span>
          </div>
        </div>
      </div>

      <div class="modal-body">
        <div class="file-container pt-5" v-if="tabs.current === 1">
          <div class="form-group col-sm-10 col-md-5">
            <label for="file" class="form-label">File Name</label>
            <input
              type="text"
              name="fileName"
              id="file"
              class="form-control"
              placeholder="Create your file name"
              v-model.trim="input.fileName"
            />
          </div>
        </div>
        <div class="properties-container" v-else></div>
      </div>

      <div class="modal-footer">
        <div class="btn-container">
          <button class="btn btn-secondary me-3" type="button" @click="closeForm">
            Close
          </button>
          <button
            class="btn disabled"
            type="button"
            v-if="input.fileName === ''">
            Next
          </button>
          <button
            class="btn btn-primary"
            type="button"
            v-else-if="tabs.current === 1"
            @click="switchTab(2)"
          >
            Next
          </button>
          <button
            class="btn btn-primary"
            type="submit"
            v-if="tabs.current === 2 && input.fileName"
            @click="switchTab(2)"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue";

// Define Properties
const prop = defineProps({
  isFormOpen: Boolean,
  event: String,
});

// Define Emitting events
let emit = defineEmits(["closeForm"])

const tabs = ref({
  current: 1,
  total: 2,
});

// Input data
const input = reactive({
  fileName: "",
});

// Methods
const switchTab = (e) => (tabs.value.current = input.fileName !== "" ? e : 1);
const closeForm = () => emit("closeForm");

</script>

<style lang="scss" scoped>
.overlay {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  overflow: hidden;
  overflow-y: auto;
  visibility: collapse;
  opacity: 0;
  transition: 500ms ease;
  z-index: 1000;

  .modal-container {
    max-width: 1000px;
    margin: auto;
    width: 100%;
    border-radius: 6px;
    background-color: #fff;
    transform: scale(0.6);
    transition: 300ms ease 100ms;
    //max-height: 500px;
    //overflow-y: auto;
    //padding: 1rem;
    .modal-header {
      background-color: hsl(29, 100%, 67%);
      color: #fff;
      .btn {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        padding: 0;
        margin: 0 0.6rem;
        background-color: hsl(29, 100%, 57%);
        color: #fff;
        &.active {
          color: hsl(29, 100%, 57%);
          background-color: #fff;
        }
      }
    }
    .modal-body {
      min-height: 50vh;
      max-height: 90vh;
      overflow-y: auto;
    }
  }

  &.isOpen {
    visibility: visible;
    opacity: 1;
    .modal-container {
      transform: scale(1);
    }
  }
}
</style>
