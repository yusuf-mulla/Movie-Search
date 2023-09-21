import { toast } from "react-toastify";

export const Toaster = (response, messege) => {
  if (response == true) {
    toast.success(messege, {
      position: "bottom-right",
      autoClose: 3000,
      closeButton: true,
      theme: "colored",
    });
  } else {
    toast.error(messege, {
      position: "bottom-right",
      autoClose: 3000,
      closeButton: true,
      theme: "colored",
    });
  }
};
