import { prefernce_type } from "@/app/api/types";
import Image from "next/image";
import styles from "../../../styles/UtilComponents/preference.module.scss";

export default function Preference({
  preference,
}: {
  preference: prefernce_type;
}) {
  return (
    <div className={styles.preference}>
      <Image
        src={preference.icon}
        alt={`${preference.name}-icon`}
        width={50}
        height={50}
        quality={100}
      />
      <span>{preference.name}</span>
    </div>
  );
}
