"use client";
import { api } from "@/app/api";
import { salvarTokenNoCookie } from "@/app/api/functions";
import { prefernce_type, school_type } from "@/app/api/types";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from "../../../styles/Forms/createuserform.module.scss";
import DefaultInput from "../DefaultComponents/DefaultInput";
import DefaultSelect from "../DefaultComponents/DefaultSelect";
import DefaultTextarea from "../DefaultComponents/DefaultTextarea";
import { MediaPicker } from "../DefaultComponents/MediaPicker";

export default function CreateUserForm({
  preferences,
  schools,
}: {
  preferences: prefernce_type[];
  schools: school_type[];
}) {
  const router = useRouter();
  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get("coverUrl");
    let profilePic = "";
    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post(
        "/upload/profilePics",
        uploadFormData
      );
      profilePic = uploadResponse.data.fileURL;
    }
    console.log(formData);
    const response = await api.post("/users", {
      profilePic,
      // name: formData.get("name"),
      // login: formData.get("email"),
      // password: formData.get("password"),
      // class: Number(formData.get("classId")),
      // description: formData.get("description"),
    });
    const { token } = response.data;
    if (salvarTokenNoCookie(token)) {
      router.push("/homepage");
    }
  };
  return (
    <form className={styles.form}>
      <div className={styles.fieldsArea}>
        <DefaultInput label="Nome" name="name" type="text" />
        <DefaultInput label="E-mail" name="email" type="email" />
        <DefaultInput label="Senha" name="password" type="password" />
        <DefaultSelect
          placeholder="Preferências"
          options={preferences}
          isMulti
        />
        <DefaultSelect
          placeholder="Escolas"
          options={schools}
          isMulti={false}
        />
        <div className={styles.profilePic}>
          <MediaPicker />
          <label htmlFor="media">
            <Camera /> Adicionar imagem de perfil
          </label>
        </div>
        <DefaultTextarea label="Descrição" rows={10} />
        <button type="submit">Criar Conta</button>
      </div>
    </form>
  );
}
