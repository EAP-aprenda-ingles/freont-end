import { word_type } from "@/app/api/types";
import React from "react";
import styles from "../../../styles/UtilComponents/highligh.module.scss";

const Highlight: React.FC<{
  text: string;
  toHighlight: word_type[];
  line: number;
}> = ({ text, toHighlight, line }) => {
  const words = text.split(/(\s+)/);

  return (
    <>
      {words.map((word, index) => {
        const highlightedWord = toHighlight.find(
          (item) => item.word.toLowerCase().trim() === word.toLowerCase().trim()
        );

        return (
          <React.Fragment key={index}>
            {highlightedWord &&
            highlightedWord.word !== " " &&
            highlightedWord.line === line ? (
              <mark
                className={
                  highlightedWord.category.id === 1
                    ? styles.cognate
                    : highlightedWord.category.id === 2
                    ? styles.falseCognate
                    : highlightedWord.category.id === 3
                    ? styles.typographicEvidence
                    : highlightedWord.category.id === 4
                    ? styles.scanning
                    : highlightedWord.category.id === 5
                    ? styles.skimming
                    : styles.background
                }
              >
                {word}
              </mark>
            ) : (
              word
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Highlight;
