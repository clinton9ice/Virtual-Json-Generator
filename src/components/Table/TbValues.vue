<template>
  <div className="column" id="values_column">
    <div class="wrapper" v-if="data !== ''">
      <div
        class="dataType-container d-flex align-items-center justify-content-end"
      >
        <div class="badge bg-dark">
          {{ dataType() }}
        </div>
      </div>

      <div class="detail-container mt-4">
        <div v-highlight>
          <pre
            class="language-javascript"
          ><code>{{ typeof data === "string"? JSON.stringify(data): data }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: [Number, String, Boolean, Array, Object],
  },
  setup(props) {
    const dataType = () => {
      if (Array.isArray(props.data)) {
        return "array";
      } else if (typeof props.data === "object") {
        return "map";
      }
      return typeof props.data;
    };
    return {
      dataType,
    };
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  max-height: 75vh;
  overflow-y: auto;
}
</style>
