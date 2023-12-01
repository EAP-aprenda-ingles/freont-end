"use client";
import { api } from "@/app/api";
import { useRouter } from "next/navigation";
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
  return (
    <button
      style={requestedToFollow ? { backgroundColor: "#171717" } : {}}
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
          router.refresh();
        }
      }}
    >
      {requestedToFollow ? "Solicitado" : "Solicitar para seguir"}
    </button>
  );
}
