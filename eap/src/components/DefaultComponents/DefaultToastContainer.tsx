import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../styles/DefaultComponents/card.module.scss";
export default function DefaultToastContainer() {
  return (
    <ToastContainer
      className={styles.globalCard}
      draggable
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="colored"
    />
  );
}
