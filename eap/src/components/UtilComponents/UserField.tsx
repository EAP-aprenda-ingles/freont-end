"use client";
import { useRouter } from "next/navigation";
import styles from "../../../styles/UtilComponents/userfield.module.scss";
export default function UserField({
  dataToShow,
  text,
  url,
  padding,
}: {
  dataToShow: number;
  text: string;
  url?: string;
  padding?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      style={padding ? { paddingTop: "15px" } : {}}
      className={styles.userInfo}
      onClick={() => {
        router.push(url ?? "");
      }}
    >
      <span>
        <strong>{dataToShow}</strong>
      </span>
      <span>{text}</span>
    </div>
  );
}
