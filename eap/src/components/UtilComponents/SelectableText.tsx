"use client";
import { api } from "@/app/api";
import { category_type, select_type, word_type } from "@/app/api/types";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/UtilComponents/selectabletsxt.module.scss";
import DefaultButton from "../DefaultComponents/DefaultButton";
import DefaultSelect from "../DefaultComponents/DefaultSelect";
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
  const router = useRouter();

  const handleDoubleClick = () => {
    const selectedText = window.getSelection()?.toString().trim();

    if (selectedText) {
      setSelectedWord(selectedText);
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

      toast.success("Alterações salvas com sucesso!", {
        style: {
          backgroundColor: "#171717",
        },
      });
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

  const getWordsInParagraph = (paragraph: string) => {
    return wordsList.filter((word) => paragraph.includes(word.word));
  };

  return (
    <div className={styles.text}>
      <div>
        <DefaultToastContainer />
        {text.map((paragraph, index) => (
          <div key={index}>
            <p
              onDoubleClick={handleDoubleClick}
              onCopy={handleDoubleClick}
              onFocus={handleDoubleClick}
            >
              <Highlight
                text={paragraph}
                toHighlight={getWordsInParagraph(paragraph)}
                key={index}
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
              onClick={(e) => {
                if (selectedCategory && selectedWord) {
                  const words = selectedWord.split(" ");
                  let newWordsList = [...wordsList];
                  if (words.length > 1) {
                    for (const word of words) {
                      if (word !== " ") {
                        const existingWordIndex = newWordsList.findIndex(
                          (w) => w.word === word
                        );
                        if (existingWordIndex !== -1) {
                          newWordsList[existingWordIndex].category =
                            categories[selectedCategory - 1];
                        } else {
                          newWordsList.push({
                            category: categories[selectedCategory - 1],
                            word: word,
                          });
                        }
                      }
                    }
                  } else {
                    const existingWordIndex = newWordsList.findIndex(
                      (w) => w.word === selectedWord
                    );
                    if (existingWordIndex !== -1) {
                      newWordsList[existingWordIndex].category =
                        categories[selectedCategory - 1];
                    } else {
                      newWordsList.push({
                        category: categories[selectedCategory - 1],
                        word: selectedWord,
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
