import { word_type } from "@/app/api/types";
import styles from "../../../styles/UtilComponents/selectabletsxt.module.scss";
import DefaultToastContainer from "../DefaultComponents/DefaultToastContainer";
import Highlight from "./Highlight";

export default function SecondarySelectableText({
  text,
  toHighlight,
}: {
  text: string[];
  toHighlight: word_type[];
}) {
  const getWordsInParagraph = (lineNumber: number) => {
    return toHighlight.filter((word) => word.line === lineNumber);
  };

  return (
    <div className={styles.text}>
      <div className={styles.paragraphsList}>
        <DefaultToastContainer />
        {text.map((paragraph, index) => (
          <div className={styles.paragraph} key={index}>
            <p>
              <Highlight
                text={paragraph}
                toHighlight={getWordsInParagraph(index)}
                key={index}
                line={index}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
