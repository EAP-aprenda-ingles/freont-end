import { ReactNode } from "react";
import styles from "../../../styles/DefaultComponents/secondaryselect.module.scss";

interface selectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export default function SecondarySelect(props: selectProps) {
  return (
    <div className={styles.inputGroup}>
      <select className={styles.input} {...props}>
        {props.children}
      </select>
    </div>
  );
}
