<template>
  <div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </slot>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  name: "Modal",

  props: {  
    title: {
      type: String,
      default: "Modal title",
    },

    value: {
      type: Boolean,
      default: false,
    },
  },
/*   watch: {
    myModal(newValue, oldValue) {
      if (newValue) {
        this.myModal.show();
      }
      if (oldValue) {
        this.myModal.hide();
      }
      
    }
  }, */

  mounted() {
    console.log("MODAL", bootstrap);
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    console.log("myModal", myModal);
/*      myModal.show();
     myModal.hide(); */
  },
};
</script>

<style lang="scss" scoped></style>
