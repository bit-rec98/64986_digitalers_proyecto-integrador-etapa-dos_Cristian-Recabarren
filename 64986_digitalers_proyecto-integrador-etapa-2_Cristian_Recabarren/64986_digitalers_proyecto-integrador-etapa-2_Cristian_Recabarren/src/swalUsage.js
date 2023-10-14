import Swal from "sweetalert2";

export const errorToast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#e63946",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

export const errorToastB = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#e63946",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
});

export const successToast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    iconColor: "#222222",
    color: "#222222",
    background: "#f85e00",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

export const successToastB = Swal.mixin({
    toast: true,
    position: "bottom-right",
    iconColor: "#222222",
    color: "#222222",
    background: "#f85e00",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
});