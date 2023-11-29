"use client";
import { api } from "@/app/api";
import { prefernce_type, select_type } from "@/app/api/types";
import Cookie from "js-cookie";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "../../../styles/Forms/createarticleform.module.scss";
import { ArticleMediaPicker } from "../DefaultComponents/ArticleMediaPicker";
import DefaultButton from "../DefaultComponents/DefaultButton";
import DefaultInput from "../DefaultComponents/DefaultInput";
import DefaultSelect from "../DefaultComponents/DefaultSelect";
import DefaultTextarea from "../DefaultComponents/DefaultTextarea";

export default function CreateArticleForm({
  preferences,
}: {
  preferences: prefernce_type[];
}) {
  const router = useRouter();
  const [articleCategory, setArticleCategory] = useState<number | null>();
  const handleCreateFile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get("media");
    const imageToUpload = formData.get("mediaImage");
    let coverUrl = "";
    let fileImage = "";
    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post("/upload/file", uploadFormData);
      coverUrl = uploadResponse.data.fileURL;
    }
    if (imageToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", imageToUpload);
      const uploadResponse = await api.post(
        "/upload/fileImage",
        uploadFormData
      );
      fileImage = uploadResponse.data.fileURL;
    }
    const token = Cookie.get("user_token");
    await api.post(
      "/article",
      {
        coverUrl,
        articleCover: fileImage,
        title: formData.get("title"),
        description: formData.get("description"),
        category: articleCategory,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.push("/homepage");
  };
  const preferenceOptions = [];
  for (const preference of preferences) {
    preferenceOptions.push({
      value: preference.id,
      label: preference.name,
    });
  }
  return (
    <form onSubmit={handleCreateFile} className={styles.form}>
      <div className={styles.formUtil}>
        <DefaultInput label="Título" type="text" name="title" />
        <DefaultTextarea name="description" label="Descrição" rows={10} />
        <label htmlFor="mediaImage">
          <Camera /> Adicionar capa
        </label>
        <ArticleMediaPicker />
        <input
          type="file"
          placeholder="Adicionar arquivo"
          name="media"
          id="media"
        />
        <DefaultSelect
          isMulti={false}
          onChange={(e: select_type) => {
            setArticleCategory(e.value);
          }}
          name="preferences"
          placeholder="Categoria"
          options={preferenceOptions}
        />
        <DefaultButton type="submit" text="Criar Artigo" />
      </div>
    </form>
  );
}
