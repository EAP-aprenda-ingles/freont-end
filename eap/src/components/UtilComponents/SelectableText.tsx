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

type word_position_type = {
  start: number;
  end: number;
};

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
  const [wordPosition, setWordPosition] = useState<word_position_type>({
    start: 0,
    end: 0,
  });
  const router = useRouter();

  const handleDoubleClick = (lineNumber: number) => {
    const selectedText = window.getSelection()?.toString().trim();

    if (selectedText) {
      const line = text[lineNumber];
      const wordsInLine = line.split(" ");
      let position = 0;
      for (let i = 0; i < wordsInLine.length; i++) {
        const word = wordsInLine[i];
        if (word === selectedText) {
          const wordStart = line.indexOf(word, position);
          const wordEnd = wordStart + word.length;
          setWordPosition({ start: wordStart, end: wordEnd });
          setSelectedWord(selectedText);
          setShowPopUp(true);
          setWordLine(lineNumber);
          break;
        }
        position += word.length + 1; // +1 para considerar o espaço
      }
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

  const categoryOptions = [];
  for (const category of categories) {
    categoryOptions.push({
      value: category.id,
      label: category.category,
    });
  }

  const getWordsInParagraph = (lineNumber: number) => {
    return wordsList.filter((word) => word.line === lineNumber);
  };

  return (
    <div className={styles.text}>
      <div className={styles.paragraphsList}>
        <DefaultToastContainer />
        {text.map((paragraph, index) => (
          <div className={styles.paragraph} key={index}>
            <p
              onDoubleClick={() => handleDoubleClick(index)}
              onCopy={() => handleDoubleClick(index)}
              onFocus={() => handleDoubleClick(index)}
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
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.category}
                  </option>
                );
              })}
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
                    for (const word of words) {
                      if (word.trim() !== "") {
                        // Verifica se a palavra já existe na lista de palavras destacadas
                        const existingWordIndex = newWordsList.findIndex(
                          (w) => w.word === word && w.line === wordLine
                        );

                        if (existingWordIndex !== -1) {
                          // Se a palavra já existe na lista com a mesma linha, atualiza apenas a categoria
                          newWordsList[existingWordIndex].category =
                            categories[selectedCategory - 1];
                        } else {
                          // Se a palavra não existe na lista, adiciona à lista com a categoria selecionada e linha correspondente
                          newWordsList.push({
                            category: categories[selectedCategory - 1],
                            word: word,
                            line: wordLine,
                            position: [wordPosition.start, wordPosition.end],
                          });
                        }
                      }
                    }
                  } else {
                    const existingWordIndex = newWordsList.findIndex(
                      (w) => w.word === selectedWord && w.line === wordLine
                    );
                    if (existingWordIndex !== -1) {
                      newWordsList[existingWordIndex].category =
                        categories[selectedCategory - 1];
                    } else {
                      newWordsList.push({
                        category: categories[selectedCategory - 1],
                        word: selectedWord,
                        line: wordLine,
                        position: [wordPosition.start, wordPosition.end],
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
