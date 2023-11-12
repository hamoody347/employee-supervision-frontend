import axios from "axios";
import Swal from "sweetalert2";

import router from "@/router";

export default {
  methods: {
    showSwal(options) {
      new Swal({
        toast: true,
        icon: options.type === "success" ? "success" : "error",
        position: "top-right",
        iconColor: "white",
        width: options.width ? options.width : 300,
        background: options.type === "success" ? "green" : "red",
        text: options.message,
        color: options.color ? options.color : "white",
        showConfirmButton: false,
        showCloseButton: true,
        timer: options.timer ? options.timer : 2000,
        timerProgressBar: true,
      });
    },
    async tableDelete(options = {}) {
      const swalDelete = Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Delete",
        showLoaderOnConfirm: true,
        confirmButtonColor: "rgb(31 41 55)",
        cancelButtonColor: "rgb(185 28 28)",
        preConfirm: async () => {
          try {
            await axios.delete(options.path).then((res) => {
              this.showSwal({
                type: "success",
                message: res.data.message,
                width: 350,
              });
            });
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        return result;
      });
      return swalDelete;
    },
    async goBack() {
      const swalBack = Swal.fire({
        title: "Are you sure you want to leave this page?",
        showCancelButton: true,
        icon: "warning",
        confirmButtonText: "Leave",
        confirmButtonColor: "rgb(31 41 55)",
        cancelButtonColor: "rgb(185 28 28)",
        focusConfirm: false,
        preConfirm: (res) => {
          return res;
        },
      });
      return swalBack;
    },
    back() {
      this.goBack().then((res) => {
        if (res.isConfirmed) {
          router.go(-1);
        }
      });
    },
    validationError(errors) {
      new Swal({
        toast: true,
        icon: "error",
        position: "top-right",
        iconColor: "white",
        width: 500,
        text: errors,
        background: "red",
        color: "white",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 10000,
        timerProgressBar: true,
      });
    },
  },
};
