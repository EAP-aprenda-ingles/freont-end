import styles from "../../../styles/DefaultComponents/textarea.module.scss";

interface inputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function DefaultTextarea(props: inputProps) {
  return (
    <div className={styles.inputGroup}>
      <textarea className={styles.textarea} placeholder="&nbsp;" {...props} />
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  );
}
