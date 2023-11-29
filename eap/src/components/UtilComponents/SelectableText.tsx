"use client";
import { api } from "@/app/api";
import { category_type, word_type } from "@/app/api/types";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../styles/UtilComponents/selectabletsxt.module.scss";
import DefaultButton from "../DefaultComponents/DefaultButton";
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
  const router = useRouter();

  const handleDoubleClick = () => {
    const selectedText = window.getSelection()?.toString();

    if (selectedText) {
      setSelectedWord(selectedText);
    }
  };

  const handleSaveChanges = async () => {
    const token = Cookie.get("user_token");
    console.log({
      fileId,
      words: wordsList,
    });
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
      router.push("/homepage");
    }
  };

  return (
    <div className={styles.text}>
      <div>
        {text.map((paragraph, index) => (
          <div key={index}>
            <p onDoubleClick={handleDoubleClick}>
              <Highlight text={paragraph} toHighlight={wordsList} key={index} />
            </p>
          </div>
        ))}
      </div>

      {selectedWord && (
        <>
          <div>
            <label>Selected word: {selectedWord}</label>
          </div>
          <div>
            <label htmlFor="category_select">Select Category:</label>
            <select
              name="category_select"
              id="category_select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(Number(e.target.value));
              }}
            >
              <option value={0}>Selecione uma categoria</option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.category}
                    </option>
                  );
                })}
            </select>
          </div>
          {selectedCategory && (
            <p>{categories[selectedCategory - 1].description}</p>
          )}
          <DefaultButton
            text="Adicionar palavra"
            onClick={(e) => {
              if (selectedCategory && selectedWord) {
                setWordsList([
                  ...wordsList,
                  {
                    category: categories[selectedCategory - 1],
                    word: selectedWord,
                  },
                ]);
                setSelectedWord("");
                setSelectedCategory(0);
              }
            }}
          />
        </>
      )}
      <button type="button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
}
