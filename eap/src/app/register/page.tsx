import CreateUserForm from "@/components/Forms/CreateUserForm";
import Image from "next/image";
import logo from "../../../public/logo-sem-fundo.png";
import styles from "../../../styles/Pages/register.module.scss";
import { api } from "../api";
import { prefernce_type, school_type } from "../api/types";
export default async function Register() {
  const schoolsResponse = await api.get("/schools");
  const schools: school_type[] = schoolsResponse.data;

  const preferencesResponse = await api.get("/preferences");
  const preferences: prefernce_type[] = preferencesResponse.data;

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={60}
          quality={100}
          placeholder="blur"
        />
      </div>
      <CreateUserForm preferences={preferences} schools={schools} />
    </main>
  );
}
