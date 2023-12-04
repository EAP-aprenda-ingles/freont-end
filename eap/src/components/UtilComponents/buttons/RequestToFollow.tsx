"use client";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../../styles/UtilComponents/buttons/button.module.scss";
export default function RequestToFollow({
  userId,
  token,
  requestedToFollow,
}: {
  userId: string;
  token: string;
  requestedToFollow: boolean;
}) {
  const router = useRouter();
  const [rTF, sRTF] = useState<boolean>(requestedToFollow);
  return (
    <button
      style={rTF ? { backgroundColor: "#171717" } : {}}
      className={styles.button}
      type="button"
      onClick={async () => {
        const response = await api.post(
          "/followRequests",
          {
            followeeId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          sRTF(response.data.followee);
          router.refresh();
        }
      }}
    >
      {rTF ? "Solicitado" : "Solicitar para seguir"}
    </button>
  );
}
