<template>
  <form class="inline-form-edit mb-4" v-if="isAlive">
    <div class="d-block">
      <!-- =========Initial  data -->
      <div id="initial">
        <div class="d-flex">
          <div class="form-group">
            <label for="objectKey" class="small text-muted form-label">
              Object Key
            </label>
            <input
              type="text"
              class="file form-control bg-white text-muted"
              readOnly
              v-model.trim="defaultItem.name"
              id="objectKey"
            />
          </div>

          <span class="text-muted small mx-3 py-4">=</span>

          <div class="form-group">
            <label for="objectType" class="small text-muted form-label">
              Object Type
            </label>
            <select
              class="form-select"
              id="objectType"
              v-model="defaultItem.type"
            >
              <option v-for="option in types" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <div class="new-field d-flex mt-3" v-if="defaultItem.type === 'string'">
          <div class="form-group">
            <label for="objectValue" class="form-label small text-muted">
              Value
            </label>
            <input
              autoComplete="off"
              required
              class="form-control"
              placeholder="write here"
              name="string0"
              v-model="defaultItem.value"
            />
          </div>
        </div>

        <div class="new-field d-flex mt-3" v-if="defaultItem.type === 'number'">
          <div class="form-group">
            <label for="objectValue" class="form-label small text-muted">
              Value
            </label>
            <input
              autoComplete="off"
              required
              class="form-control"
              placeholder="write here"
              name="string0"
              type="number"
              v-model="defaultItem.value"
            />
          </div>
        </div>

        <div
          class="new-field d-block mt-3"
          v-if="defaultItem.type === 'boolean'"
        >
          <label for="objectValue" class="form-label small text-muted">
            Value
          </label>
          <select
            name="typeSelection"
            v-model="defaultItem.value"
            class="form-select"
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
      </div>
    </div>

    <div class="btn-container mt-4 d-flex justify-content-end">
      <button class="btn btn-danger me-3 btn-sm" type="button">Delete</button>

      <button
        class="btn btn-sm"
        type="button"
        v-if="defaultItem.value === ''"
        disabled
      >
        Update
      </button>
      <button class="btn btn-primary btn-sm" type="submit" v-else>
        Update
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "inlineForm",
  props: {
    isAlive: Boolean,
    value: [String, Number, Array, Object, Boolean],
    name: String,
  },
  data: () => {
    return {
      types: ["string", "number", "boolean", "map", "array", "timeStamp"],
      defaultItem: {
        name: "Weather_Status",
        type: "string",
        value: "test",
      },
    };
  },
  methods: {
    checkType(object, value) {
      if (!object.type)
        return alert("There should be a type key in your object");
      if (object.type === "number") return Number(value);
      if (object.type === "string") return value.toString();
      if (object.type === "boolean") return Boolean(value === "true");
    },
    setType() {
      if (Array.isArray(this.value)) return (this.defaultItem.type = "array");
      if (typeof this.value === "object")
        return (this.defaultItem.type = "map");
      return (this.defaultItem.type = typeof this.value);
    },
  },
  created() {
    this.setType();
    // Set the property names of the objects
    this.defaultItem.name = this.name;
    // Set the property values
    this.defaultItem.value = this.value;
  },
};
</script>

<style lang="scss" scoped></style>

<!-- import { useEffect, useState } from "react";

{
  /*
Each Components will be grouped to enbale easy debugging and access

*/
}

const NumberType = ({ change }) => {
  return (
    <div class="new-field d-flex mt-3">
      <div class="form-group">
        <label
          htmlFor="objectValue"
          class="form-label small text-muted"
          required
        >
          Value
        </label>
        <input
          autoComplete="off"
          type="number"
          class="form-control"
          id="objectValue"
          min={0}
          placeholder="Numbers only"
          required
          onChange={change}
        />
      </div>
    </div>
  );
};

const MapType = ({ value, types }) => {
  const [initData, setInitData] = useState({ type: "string", value: "" });
  const [field, setField] = useState({
    key: "",
    value: "",
    type: "string",
  });

  useEffect(() => {
    value(field);
  }, [field]);

  return (
    <div class="new-field d-flex mt-3" id="mapSystem">
      {/* ===== key ==== */}
      <div class="form-group">
        <label htmlFor="objectKey" class="small text-muted form-label">
          Key
        </label>
        <input
          autoComplete="off"
          type="text"
          class="file form-control bg-white text-muted"
          name="key"
          onChange={(e) =>
            setField({ ...field, key: e.target.value || "name" })
          }
          required
        />
      </div>

      <span class="text-muted small mx-2 py-4">=</span>

      {/* ======Type====== */}
      <div class="form-group">
        <label htmlFor="objectType" class="small text-muted form-label">
          Type
        </label>
        <select
          class="form-select"
          name="type"
          onChange={(e) => {
            setField({ ...field, type: e.target.value });
          }}
        >
          {Array.isArray(types) &&
            types.length > 0 &&
            types.map((type) => {
              return (
                <option value={type} key={type}>
                  {type}
                </option>
              );
            })}
        </select>
      </div>
      {/* ========= Value ==== */}

      <div class="form-group">
        <label
          htmlFor="objectValue"
          class="form-label small text-muted"
          required
        >
          Value
        </label>
        <input
          type="text"
          class="form-control"
          id="objectValue"
          name="val"
          onChange={(e) => setField({ ...field, value: e.target.value || "" })}
          required
          autoComplete="off"
        />
      </div>
    </div>
  );
};

const BooleanType = ({ change }) => {
  return (
    <div class="new-field mt-3">
      <label
        htmlFor="objectValue"
        class="form-label small text-muted"
        required
      >
        Value
      </label>

      <select
        name="value"
        defaultValue="true"
        class="form-select"
        onChange={change}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
  );
};

// const ArrayType = () => {
//     return (

//     )
// }

// const TimeStamp = () => {
//     return (

//     )
// }

export default function InlineForm({ isOpen }) {
  const [data, setData] = useState({
    name: "action",
    type: "string",
    value: "",
  });

  const [editBox, setEditBox] = useState(false);

  useEffect(() => {
    return () => {
      setEditBox(isOpen)
    };
  }, [isOpen])
  

  const [types] = useState([
    "string",
    "number",
    "boolean",
    "map",
    "array",
    "timeStamp",
  ]);

  const submit = (e) => {
    e.preventDefault();
    // let Data = new FormData(e.target);
    console.log(data);
  };

  const changeValue = (e) => {
    switch (data.type) {
      case "string":
        setData({ ...data, value: checkType(data, e.target.value) });
        break;
      case "number":
        setData({ ...data, value: checkType(data, e.target.value) });
        break;
      case "boolean":
        setData({ ...data, value: checkType(data, e.target.value) });
        break;
      case "map":
        setData({
          ...data,
          value: !Array.isArray(e)
            ? { [e.key]: checkType(e, e.value) }
            : e.map((item) => {
                return { [item.key]: checkType(e, e.value) };
              }),
        });
        break;

      default:
        // setData({ ...data, value: e });
        console.log(e);
        break;
    }
  };

  return (
    isOpen && (
    
    )
  );
} -->
