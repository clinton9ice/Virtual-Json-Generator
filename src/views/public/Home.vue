<template>
  <div class="container-fluid mt-5">
    <h4 class="col-sm-4 text-muted">
      Create, View, and Download your JSON file in a very simplified way.
    </h4>
    <br />
    <br />
    <table-tab @activeTab="tab">
      <back-btn v-if="count > 1" @reduce="decrease"></back-btn>
    </table-tab>

    <FixedButtonVue />

    <div class="container-fluid px-0">
      <table-vue :mobileActive="count" @form="modal">
        <div class="tableBody border-0" id="tableFormat" v-if="!codeView">
          <TbFile
            :class="count === 1 && 'mobileActive'"
            @addcount="increement"
          />

          <TbProps
            :property="selectedFile"
            v-on:selectedProp="selectedPropVal"
            :class="['column', count === 2 && 'mobileActive']"
            @addcount="increement"
          />

          <TbValues
            :data="Object.keys(selectedFile).length > 0 ? propertyVal : ''"
            :class="['column', count === 3 && 'mobileActive']"
          />
        </div>

        <div class="h-100" v-else v-highlight>
          <pre
            class="language-javascript h-100"
          ><code>{{ selectedFile }}</code></pre>
        </div>
      </table-vue>
    </div>
    <property-form :isFormOpen="fileCreate" @closeForm="modal"/>
    <br />
  </div>
</template>

<script>
import FixedButtonVue from "@/components/FixedButton.vue";
import TableVue from "@/components/Table";
import TableTab from "@/components/Tab.vue";
import TbFile from "@/components/Table/TbFile.vue";
import TbProps from "@/components/Table/TbProps.vue";
import TbValues from "@/components/Table/TbValues";

// ==========Store
import { useStore, mapGetters } from "vuex";
import BackBtn from "@/components/BackBtn.vue";
import propertyForm from "@/components/Form/propertyForm";

export default {
  name: "Home",
  components: {
    FixedButtonVue,
    TableVue,
    TableTab,
    TbFile,
    TbProps,
    TbValues,
    BackBtn,
    propertyForm,
  },
  setup() {
    const store = useStore();
    return { store };
  },
  data: () => {
    return {
      codeView: false,
      file: [],
      propertyVal: "",
      count: 1,
      maxCount: 3,
      fileCreate: false
    };
  },
  computed: mapGetters(["selectedFile"]),
  methods: {
    tab(e) {
      this.codeView = e.toLowerCase() !== "table";
    },
    selectedPropVal(e) {
      this.propertyVal = e;
    },
    increement() {
      if (this.count < 3) {
        this.count++;
      }
    },
    decrease() {
      if (this.count !== 1) {
        this.count--;
        console.log(this.count);
      }
    },
    modal() {
      let propForm = document.querySelector("#propForm")
      this.fileCreate = !this.fileCreate;
      !propForm.classList.contains("isOpen") ? document.body.style.overflow = "hidden" : document.body.style.overflowY = "visible"
    }
  },
};
</script>
