import styles from "../../../styles/DefaultComponents/button.module.scss";
interface inputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
export default function DefaultButton(props: inputProps) {
  return (
    <button className={styles.button} {...props}>
      {props.text}
    </button>
  );
}
