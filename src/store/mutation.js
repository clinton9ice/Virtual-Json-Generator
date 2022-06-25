export default {
  selectFile(state, id) {
    // Reset the selected the file
    // state.activeFile.splice(0, state.activeFile.length);

    state.files.find((file) => {
      // Unhighlight any selected file
      file.isSelected = false;

      if (file.id === id) {
        // Toggle the matched file
        file.isSelected = !file.isSelected;
        // Add the properties of the selected file to the active container
        state.activeFile = file.props;
      }
    });
    return state.activeFile;
  },
};
