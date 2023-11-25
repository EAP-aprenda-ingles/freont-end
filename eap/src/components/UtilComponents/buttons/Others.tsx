"use client";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/UtilComponents/buttons/button.module.scss";
export default function Others({ url, text }: { url: string; text: string }) {
  const router = useRouter();
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => {
        router.push(url);
      }}
    >
      {text}
    </button>
  );
}
