import DefaultToastContainer from "@/components/DefaultComponents/DefaultToastContainer";
import LoginForm from "@/components/Forms/LoginForm";
import Image from "next/image";
import logo from "../../public/logo.png";
import styles from "../../styles/Pages/page.module.scss";
import { api } from "./api";

export default async function Login() {
  const response = await api.get("/background");
  const { backgroundImage } = response.data;
  return (
    <main className={styles.main}>
      <div className={styles.backgroundImage}>
        <img src={backgroundImage} alt="Freepik-image" />
        <div className={styles.leftPartContent}>
          <div className={styles.top}>
            <Image
              className={styles.mainImage}
              src={logo}
              alt="EAP"
              quality={100}
              width={75}
              height={75}
            />
            <p>
              <span>Bem-Vindo(a) ao</span>
              <span className={styles.eap}>EAP</span>
            </p>
          </div>
          <span />
        </div>
      </div>
      <DefaultToastContainer />
      <LoginForm />
    </main>
  );
}
