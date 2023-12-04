import { api } from "@/app/api";
import { prefernce_type, school_type } from "@/app/api/types";
import EditUser from "@/components/Forms/EditUserForm";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import styles from "../../../../../styles/Pages/page.module.scss";
export default async function EditUserPage() {
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
            Desbrave Horizontes: A Revolucionária Plataforma que Fará Você se
            Apaixonar pelo Inglês!
          </span>
        </div>
      </div>
      <EditUser preferences={preferences} schools={schools} />
    </main>
  );
}
