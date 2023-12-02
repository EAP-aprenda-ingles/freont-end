"use client";
import { api } from "@/app/api";
import { notification_type } from "@/app/api/types";
import { useState } from "react";
import styles from "../../../styles/UtilComponents/notification.module.scss";

export default function Notification({
  notification,
  token,
}: {
  notification: notification_type;
  token: string;
}) {
  const [serverNotification, setServerNotification] =
    useState<notification_type>(notification);
  const handleReadNotification = async () => {
    const response = await api.put(
      "/notifications",
      {
        notificationId: serverNotification.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      setServerNotification(response.data);
    }
  };

  const handleAcceptFollowRequest = async () => {
    const response = await api.post(
      "/followRequests/accept",
      {
        notificationId: serverNotification.id,
        requestId: serverNotification.followReqId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      setServerNotification(response.data);
    }
  };
  return (
    <div className={styles.notification}>
      <span>{serverNotification.content}</span>
      {serverNotification.type === "followRequest" ? (
        <button onClick={handleAcceptFollowRequest}>Aceitar solicitação</button>
      ) : (
        serverNotification.deletedAt === null && (
          <button onClick={handleReadNotification}>Marcar como lida</button>
        )
      )}
    </div>
  );
}
