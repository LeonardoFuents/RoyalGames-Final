import {ToastContainer, toast} from "react-toastify";

export const notificacao = (msg: string) => toast.success(msg)
export const erro = (msg: string) => toast.error(msg)