import { Notyf } from "notyf";

var notyf = new Notyf({
  duration: 3000,
  dismissible: true,
  position: {
    x: "right",
    y: "top",
  },
});

export default notyf;