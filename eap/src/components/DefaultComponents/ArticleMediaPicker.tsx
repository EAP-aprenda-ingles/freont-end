"use client";
import styles from "../../../styles/DefaultComponents/mediapicker.module.scss";

import { ChangeEvent, useState } from "react";

export function ArticleMediaPicker({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) {
      return;
    }
    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
  };
  return (
    <div className={styles.mediaPicker}>
      <input
        type="file"
        name="coverUrl"
        id="mediaImage"
        accept="image/*"
        onChange={onFileSelected}
      />
      {preview && (
        <img
          src={preview}
          alt=""
          style={{
            aspectRatio: "16/9",
            borderRadius: "10px",
            objectFit: "cover",
            border: "1px solid black",
            height: "190px",
          }}
        />
      )}
    </div>
  );
}
