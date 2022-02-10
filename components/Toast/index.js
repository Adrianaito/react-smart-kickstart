import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export function loading(id, message) {
  toastId.current = toast(message, { autoClose: false });
}
export function update(id, message, type, isLoading) {
  toast.update(id, {
    render: message,
    type,
    isLoading,
    autoClose: 5000,
  });
}
