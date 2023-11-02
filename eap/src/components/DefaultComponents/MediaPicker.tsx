"use client";
import styles from "../../../styles/DefaultComponents/mediapicker.module.scss";

import { ChangeEvent, useState } from "react";

export function MediaPicker({ defaultValue }: { defaultValue?: string }) {
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
        id="media"
        accept="image/*"
        onChange={onFileSelected}
      />
      {preview && (
        <img
          src={preview}
          alt=""
          style={{
            aspectRatio: "1/1",
            width: "63px",
            height: "63px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid black",
          }}
        />
      )}
    </div>
  );
}
