"use client";
import { api } from "@/app/api";
import { notification_type } from "@/app/api/types";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/UtilComponents/notification.module.scss";
import DefaultToastContainer from "../DefaultComponents/DefaultToastContainer";

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
    try {
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
      if (response.status !== 200 && response.status !== 201) {
        toast.error("Ocorreu um erro ao marcar como lida a notificação!", {
          style: {
            backgroundColor: "#171717",
          },
        });
      } else {
        setServerNotification(response.data);
        toast.success("Notificação lida com sucesso", {
          style: {
            backgroundColor: "#171717",
          },
        });
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao marcar como lida a notificação!", {
        style: {
          backgroundColor: "#171717",
        },
      });
    }
  };

  const handleAcceptFollowRequest = async () => {
    try {
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
        toast.success("Solicitação de follow aceita com sucesso", {
          style: {
            backgroundColor: "#171717",
          },
        });
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao aceitar a solicitação de follow!", {
        style: {
          backgroundColor: "#171717",
        },
      });
    }
  };

  return (
    <div className={styles.notification}>
      <DefaultToastContainer />
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
