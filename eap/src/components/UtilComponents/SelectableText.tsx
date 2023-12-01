"use client";
import { api } from "@/app/api";
import { category_type, select_type, word_type } from "@/app/api/types";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../styles/UtilComponents/selectabletsxt.module.scss";
import DefaultButton from "../DefaultComponents/DefaultButton";
import DefaultSelect from "../DefaultComponents/DefaultSelect";
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
    const selectedText = window.getSelection()?.toString();

    if (selectedText) {
      setSelectedWord(selectedText);
      setShowPopUp(true);
    }
  };

  const handleSaveChanges = async () => {
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
    // if (response.status === 200 || response.status === 201) {
    //   router.push("/homepage");
    // }
  };

  const handleSaveOnFeed = async () => {
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
    // if (response.status === 200 || response.status === 201) {
    //   router.push("/homepage");
    // }
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
                      newWordsList.push({
                        category: categories[selectedCategory - 1],
                        word: word,
                      });
                    }
                  } else {
                    newWordsList.push({
                      category: categories[selectedCategory - 1],
                      word: selectedWord,
                    });
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
  );
}
