import styles from "../../../styles/DefaultComponents/input.module.scss";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function DefaultInput(props: inputProps) {
  return (
    <div className={styles.inputGroup}>
      <input className={styles.input} placeholder="&nbsp;" {...props} />
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  );
}
