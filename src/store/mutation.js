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
    deleteFile(state, id) {
        state.files = state.files.filter((file) => file.id !== id);
        state.activeFile = [];
    },
    create_file(state, param){
        let fileExist = state.files.find((file) => file.name.toLowerCase() === param.name.toLowerCase() || file.id === param.id);
        if (fileExist) return alert("File Not Saved: This file name already exist, change the name and generate a new id to save.");
    //   Add to the files
        state.files.unshift(param);
    }
};
