<template>
  <div :class="['overlay', (prop.isFormOpen && 'isOpen') ]" id="propForm">
    <form class="modal-container" @submit.prevent>
      <!--===========Form Header =======-->
      <div class="modal-header d-block">
        <h3 class="p-2" v-if="tabs.current === 1">Create A File</h3>
        <h3 class="p-2" v-else>Add Property</h3>
        <br/>
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
      <!-----====/End======---->

      <!--      ===========Body =======-->
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
        <div class="properties-container" v-else>
          <div class="container py-4">
            <!--=========File-Id======-->
            <div class="id-container d-flex align-items-end">
              <div class="form-group">
                <label for="fileId" class="form-label">File Id</label>
                <input type="text" readonly v-model="input.id" name="fileId" id="fileId" class="form-control">
              </div>
              <button class="btn btn-dark" type="button" @click="generateId">Auto gen</button>
              <button type="button" class="btn ms-4 btn-outline-light text-dark" @click.prevent="createField"><i
                  class="bi bi-plus"></i></button>
            </div>
            <!--=========/End=====-->

            <!--==========Properties=========-->
            <div class="properties p-3">
              <div class="d-flex my-4 fields align-items-end" v-for="(item, index) in field" :key="index">
                <div class="form-group">
                  <label for="prop" class="form-label">Property</label>
                  <input type="text" id="prop" v-model.trim="input.props.keys[index]" placeholder="Property name"
                         class="form-control">
                </div>

                <div class="form-group mx-3">
                  <label for="type" class="form-label">Type</label>
                  <select name="type" id="type" class="form-select" v-model="input.props.types[index]">
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                  </select>
                </div>

                <div class="d-flex align-items-end">
                  <span class="me-3"> = </span>
                  <div class="form-group">
                    <label class="form-label">Property value</label>
                    <input type="text" class="form-control" v-model="input.props.values[index]" placeholder="value"
                           v-if="input.props.types[index] === 'string'">

                    <input type="number" class="form-control" v-model.number="input.props.values[index]"
                           placeholder="value" v-if="input.props.types[index] === 'number'">

                    <select @change="(e) =>{ input.props.values[index] = e.target.value !== 'false'}"
                            class="form-select" v-if="input.props.types[index] === 'boolean'">
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  </div>
                  <button class="btn ms-3" type="button" @click.prevent="removeField(index)">
                    <i class="bi bi-dash text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
            <!--============/End=======-->
          </div>
        </div>
      </div>
      <!--      ===========/End==========-->

      <!--============Footer========-->
      <div class="modal-footer">
        <div class="btn-container">
          <button class="btn btn-secondary me-3" type="button" @click="closeForm">
            Close
          </button>
          <button class="btn disabled" type="button" v-if="input.fileName === ''">
            Next
          </button>
          <button class="btn btn-primary" type="button" v-else-if="tabs.current === 1" @click="switchTab(2)">
            Next
          </button>
          <button class="btn btn-primary" @click="saveFile" type="button" v-if="tabs.current === 2 && input.fileName && input.props.keys.length > 0 && input.props.keys[0] !== ''">
            save
          </button>
        </div>
      </div>
      <!--=============/End=======-->
    </form>
    <confirm ref="confirms" />
  </div>
</template>

<script setup>
import {defineEmits, defineProps, reactive, ref} from "vue";
import {useStore} from "vuex";
import {generator} from "../../helper/stringGenerator";
import confirm from "../pop-dialog/confirm";


// Define Properties
const prop = defineProps({
  isFormOpen: Boolean,
  event: String,
});
const store = useStore();

// Define Emitting events
let emit = defineEmits(["closeForm"])

const tabs = ref({
  current: 1,
  total: 2,
});

// Input data
const input = reactive({
  fileName: "",
  id: generator(10),
  props: {
    keys: [''],
    types: ['string'],
    values: [''],
  }
});
const field = ref(1);
const confirms = ref();

// Methods
const switchTab = (e) => ( tabs.value.current = input.fileName !== "" ? e : 1);

const closeForm = () => emit("closeForm");

const generateId = () => {
  input.id = generator(10);
}

const createField = () => {
  //Increment the field
  field.value++;
//  Append empty value to the input property
  input.props = {
    keys: [...input.props.keys, ""],
    types: [...input.props.types, "string"],
    values: [...input.props.values, ""]
  }
}
const removeField = (id) => {
  if (input.props.keys.length > 1) {
//  Remove properties matching id
    input.props.keys.splice(id, 1)
    input.props.values.splice(id, 1);
    input.props.types.splice(id, 1);
//  Reduce the field count
    return field.value--
  }
}

const saveFile = async () => {

//  Destructure input file
  const {props, fileName, id} = input;
//Check if the lengths match
  if ((props.keys.length === props.values.length) && props.values.length === props.types.length) {
    //  Loop through the list to construct an object

    let report = {};

    for (let i = 0; i < props.keys.length; i++) {
      if (props.keys[i] !== "") {
        Object.defineProperty(report, props.keys[i].replaceAll(" ", "_"), {
          value: props.values[i],
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    }
    //Prepare the file to send
    let arr =  {
          id,
          name: fileName,
          props: [report],
          isSelected: false,
        };
    let proceed = await confirms.value.show({
      title: "Notice",
      message: "This file will be stored in the store temporarily, if refreshed all datas will be lost",
      okButton: "proceed"
    });

    if (proceed){
      await store.dispatch("addFile", arr);
      field.value = 1;
      input.props = {
        keys: [''],
        values: [''],
        types: ['string']
      }
      input.fileName = ""
      tabs.value.current--;
      closeForm()
    }
  }
}

</script>

<style lang="scss" scoped>
.overlay {
  display: flex;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  overflow: hidden;
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
      //min-height: 50vh;
      max-height: 300px;
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
