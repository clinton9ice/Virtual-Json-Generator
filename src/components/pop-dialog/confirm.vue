<template>
  <popup-modal ref="popup" class="p-2">
    <h3 class="mt-0">{{ title }}</h3>
    <p class="col-sm-10 small">{{ message }}</p>
    <div class="btn-container">
      <button class="me-3 btn btn-success" @click="_confirm">{{ okButton }}</button>
      <button class="btn-danger btn" @click="_cancel">{{ cancelButton }}</button>
    </div>
  </popup-modal>
</template>


<script>
import PopupModal from './index'

export default {
  name: 'confirm',

  components: {PopupModal},

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: 'confirmation',
    message: "Do You Wish to go with this execution", // Main text content
    okButton: "proceed", // Text for confirm button; leave it empty because we don't know what we're using it for
    cancelButton: 'cancel', // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open()
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel() {
      this.$refs.popup.close()
      this.resolvePromise(false)
    },
  },
}
</script>
