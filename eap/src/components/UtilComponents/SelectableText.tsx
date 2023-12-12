"use client";
import { api } from "@/app/api";
import { category_type, word_type } from "@/app/api/types";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/UtilComponents/selectabletsxt.module.scss";
import DefaultToastContainer from "../DefaultComponents/DefaultToastContainer";
import PopUp from "../DefaultComponents/PopUp";
import SecondarySelect from "../DefaultComponents/SecondarySelect";
import Highlight from "./Highlight";

export default function SelectableText({
  text,
  toHighlight,
  categories,
  fileId,
}: {
  text: string[];
  toHighlight: word_type[];
  categories: category_type[];
  fileId: string;
}) {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [wordsList, setWordsList] = useState<word_type[]>(toHighlight);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [wordLine, setWordLine] = useState<number>(0);
  const [wordPosition, setWordPosition] = useState<number>(0);
  const router = useRouter();

  const handleDoubleClick = (lineNumber: number, wordIndex: number) => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      setWordPosition(wordIndex);
      setSelectedWord(selectedText);
      setWordLine(lineNumber);
      setShowPopUp(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = Cookie.get("user_token");
      const response = await api.post(
        "/actions",
        {
          fileId,
          words: wordsList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Alterações salvas com sucesso!", {
          style: {
            backgroundColor: "#171717",
          },
        });
      }
    } catch (error) {
      toast.error("Erro ao salvar as alterações", {
        style: {
          backgroundColor: "#171717",
        },
      });
    }
  };

  const handleSaveOnFeed = async () => {
    try {
      const token = Cookie.get("user_token");
      const response = await api.post(
        `/saveOnFeed/${fileId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Salvo no feed com sucesso!", {
        style: {
          backgroundColor: "#171717",
        },
      });
    } catch (error) {
      toast.error("Erro ao salvar no feed", {
        style: {
          backgroundColor: "#171717",
        },
      });
    }
  };
  const getWordsInParagraph = (lineNumber: number) => {
    return wordsList.filter((word) => word.line === lineNumber);
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.category,
  }));

  return (
    <div className={styles.text}>
      <div className={styles.paragraphsList}>
        <DefaultToastContainer />
        {text.map((paragraph, index) => (
          <div className={styles.paragraph} key={index}>
            <p
              onDoubleClick={(e) =>
                handleDoubleClick(
                  index,
                  Number((e.target as HTMLSpanElement).id)
                )
              }
              onCopy={(e) =>
                handleDoubleClick(
                  index,
                  Number((e.target as HTMLSpanElement).id)
                )
              }
              onFocus={(e) =>
                handleDoubleClick(
                  index,
                  Number((e.target as HTMLSpanElement).id)
                )
              }
            >
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

      {selectedWord && showPopUp && (
        <PopUp
          cancelcallback={() => {
            setShowPopUp(false);
            setSelectedCategory(0);
          }}
        >
          <div className={styles.popupUtil}>
            <h3>Palavra selecionada: {selectedWord}</h3>
            <SecondarySelect
              name="category"
              id="category"
              onChange={(e) => {
                setSelectedCategory(Number(e.target.value));
              }}
            >
              <option value={0} unselectable="on">
                Escolha uma categoria
              </option>
              {categoryOptions.map((category) => (
                <option value={category.value} key={category.value}>
                  {category.label}
                </option>
              ))}
            </SecondarySelect>
            {selectedCategory !== 0 && (
              <span>{categories[selectedCategory - 1].description}</span>
            )}

            <button
              onClick={() => {
                if (selectedCategory && selectedWord) {
                  const words = selectedWord.split(" ");
                  let newWordsList = [...wordsList];

                  if (words.length > 1) {
                    let counter = wordPosition;
                    for (const word of words) {
                      if (word.trim() !== "") {
                        const existingWordIndex = newWordsList.findIndex(
                          (w) =>
                            w.word === word &&
                            w.line === wordLine &&
                            w.position === counter
                        );

                        if (existingWordIndex !== -1) {
                          newWordsList[existingWordIndex].category =
                            categories[selectedCategory - 1];
                        } else {
                          newWordsList.push({
                            category: categories[selectedCategory - 1],
                            word: word,
                            line: wordLine,
                            position: counter, // Armazenar a posição da palavra corretamente
                          });
                        }
                      }
                      counter += 2;
                    }
                  } else {
                    const existingWordIndex = newWordsList.findIndex(
                      (w) =>
                        w.word === selectedWord &&
                        w.line === wordLine &&
                        w.position === wordPosition
                    );
                    if (existingWordIndex !== -1) {
                      newWordsList[existingWordIndex].category =
                        categories[selectedCategory - 1];
                    } else {
                      newWordsList.push({
                        category: categories[selectedCategory - 1],
                        word: selectedWord,
                        line: wordLine,
                        position: wordPosition,
                      });
                    }
                  }
                  setWordsList(newWordsList);
                  setSelectedWord("");
                  setSelectedCategory(0);
                }
              }}
              className={styles.button}
            >
              Salvar
            </button>
          </div>
        </PopUp>
      )}
      <div className={styles.buttonsArea}>
        <button
          type="button"
          className={styles.button}
          onClick={handleSaveChanges}
        >
          Salvar alterações
        </button>
        <div className={styles.saveOnFeed}>
          <button onClick={handleSaveOnFeed} type="button">
            Salvar no feed
          </button>
        </div>
      </div>
    </div>
  );
}
