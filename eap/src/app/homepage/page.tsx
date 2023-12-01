import Footer from "@/components/DefaultComponents/Footer";
import Feed from "@/components/UtilComponents/Feed";
import { Mailbox } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo-sem-fundo.png";
import styles from "../../../styles/Pages/homepage.module.scss";
import { api } from "../api";

export default async function homepage() {
  const token = cookies().get("user_token")?.value;
  const response = await api.get("/notificationsLength", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const notificationsLength: number = response.data;
  return (
    <main className={styles.main}>
      <div className={styles.homeTop}>
        <Image
          src={logo}
          alt="logo"
          quality={100}
          placeholder="blur"
          height={70}
          width={70}
        />
        <Link href="/notifications">
          {notificationsLength > 0 && (
            <div className={styles.notifications}>
              <span>{notificationsLength}</span>
            </div>
          )}
          <Mailbox height={40} width={40} />
        </Link>
      </div>
      <Feed />
      <Footer />
    </main>
  );
}
