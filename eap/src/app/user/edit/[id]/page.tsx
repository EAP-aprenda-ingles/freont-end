import { api } from "@/app/api";
import {
  prefernce_type,
  school_type,
  user_to_update_type,
} from "@/app/api/types";
import EditUser from "@/components/Forms/EditUserForm";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/logo.png";
import styles from "../../../../../styles/Pages/page.module.scss";
export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const schoolsResponse = await api.get("/schools");
  const schools: school_type[] = schoolsResponse.data;

  const preferencesResponse = await api.get("/preferences");
  const preferences: prefernce_type[] = preferencesResponse.data;

  const response = await api.get("/background");
  const { backgroundImage } = response.data;

  const id: string = params.id;
  const token = cookies().get("user_token")?.value;
  const userResponse = await api.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user: user_to_update_type = userResponse.data;

  return (
    <main className={styles.main}>
      <div className={styles.backgroundImage}>
        <img src={backgroundImage} alt="Freepik-image" />
        <div className={styles.leftPartContent}>
          <div className={styles.top}>
            <Link href="/homepage">
              <Image
                className={styles.mainImage}
                src={logo}
                alt="EAP"
                quality={100}
                width={75}
                height={75}
              />
            </Link>
            <p>
              <span>Bem-Vindo(a) ao</span>
              <span className={styles.eap}>EAP</span>
            </p>
          </div>
          <span />
        </div>
      </div>
      <EditUser
        token={token ?? ""}
        user={user}
        preferences={preferences}
        schools={schools}
      />
    </main>
  );
}
