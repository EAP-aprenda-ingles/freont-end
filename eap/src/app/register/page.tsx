import CreateUserForm from "@/components/Forms/CreateUserForm";
import Image from "next/image";
import logo from "../../../public/logo.png";
import styles from "../../../styles/Pages/page.module.scss";
import { api } from "../api";
import { prefernce_type, school_type } from "../api/types";
export default async function Register() {
  const schoolsResponse = await api.get("/schools");
  const schools: school_type[] = schoolsResponse.data;

  const preferencesResponse = await api.get("/preferences");
  const preferences: prefernce_type[] = preferencesResponse.data;

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
          <span>
            Desbrave Horizontes: Aprenda inglês lendo artigos acadêmicos na sua
            área de estudo
          </span>
        </div>
      </div>
      <CreateUserForm preferences={preferences} schools={schools} />
    </main>
  );
}
