import DefaultToastContainer from "@/components/DefaultComponents/DefaultToastContainer";
import EdiLoginForm from "@/components/Forms/ForgotPasswordForm";
import LoginForm from "@/components/Forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import styles from "../../../styles/Pages/page.module.scss";
import { api } from "../api";

export default async function ForgotPasswordPage() {
  const response = await api.get("/background");
  const { backgroundImage } = response.data;
  return (
    <main className={styles.main}>
      <div className={styles.backgroundImage}>
        <img src={backgroundImage} alt="Freepik-image" />
        <div className={styles.leftPartContent}>
          <Link href="/" className={styles.top}>
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
          </Link>
          <span>
            Desbrave Horizontes: A Revolucionária Plataforma que Fará Você se
            Apaixonar pelo Inglês!
          </span>
        </div>
      </div>
      <DefaultToastContainer />
      <EdiLoginForm />
    </main>
  );
}
