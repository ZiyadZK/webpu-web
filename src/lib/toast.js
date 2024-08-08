'use client'

import Swal from "sweetalert2";

export const swalToast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
      toast.style.zIndex = 10000
    },
  });