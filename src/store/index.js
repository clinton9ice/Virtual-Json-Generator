import { createStore } from "vuex";
import { action } from "./actions";
import mutations from "./mutation";

export default createStore({
  state: {
    files: [
      {
        id: 1,
        name: "Food API",
        props: [
          {
            url: "clinton.com.ng",
            no: 12987875435,
            country: "USA",
            hasStarted: false,
            equipments: [
              "Knife",
              "Spoon",
              "Bowl",
              "Kettle",
              "Jug",
              "Fryer",
              "Fork",
            ],
            chefs: [
              {
                name: "clinton",
                gender: "male",
                specialty: "chef",
                cerfitied: true,
              },
              {
                name: "Kenneth",
                gender: "male",
                specialty: "chef",
                cerfitied: true,
              },
              {
                name: "Gloria",
                gender: "female",
                specialty: "chef",
                cerfitied: false,
              },
            ],
          },
        ],
        isSelected: false,
      },
      {
        id: 2,
        name: "Music API",
        props: [],
        isSelected: false,
      },
      {
        id: 3,
        name: "School Library",
        props: [],
        isSelected: false,
      },
    ],
    activeFile: {},
  },
  getters: {
    selectedFile(state) {
      return state.activeFile;
    },
    allFiles(state) {
      return state.files;
    },
  },
  mutations,
  actions: action,
});
