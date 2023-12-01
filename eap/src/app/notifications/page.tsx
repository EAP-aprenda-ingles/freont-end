import Footer from "@/components/DefaultComponents/Footer";
import logo from "../../../public/logo-sem-fundo.png";
import styles from "../../../styles/Pages/notifications.module.scss";

import Notification from "@/components/UtilComponents/Notification";
import { cookies } from "next/headers";
import Image from "next/image";
import { api } from "../api";
import { notification_type } from "../api/types";
export default async function Notifications() {
  const token = cookies().get("user_token")?.value;
  const response = await api.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const notifications: notification_type[] = response.data;
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
      </div>
      <div className={styles.notifications}>
        {notifications.map((notification) => (
          <Notification
            token={token ?? ""}
            notification={notification}
            key={notification.id}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
}
