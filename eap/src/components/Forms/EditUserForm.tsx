"use client";
import { api } from "@/app/api";
import { salvarTokenNoCookie } from "@/app/api/functions";
import {
  prefernce_type,
  school_type,
  select_type,
  user_to_update_type,
} from "@/app/api/types";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import logo from "../../../public/logo-sem-fundo.png";
import styles from "../../../styles/Forms/edituserform.module.scss";
import DefaultInput from "../DefaultComponents/DefaultInput";
import DefaultSelect from "../DefaultComponents/DefaultSelect";
import DefaultTextarea from "../DefaultComponents/DefaultTextarea";
import DefaultToastContainer from "../DefaultComponents/DefaultToastContainer";
import { MediaPicker } from "../DefaultComponents/MediaPicker";

export default function EditUser({
  preferences,
  schools,
  user,
  token,
}: {
  preferences: prefernce_type[];
  schools: school_type[];
  user: user_to_update_type;
  token: string;
}) {
  const [userPreferences, setUserPreferences] = useState<number[]>([]);
  const [userSchool, setUserSchool] = useState<number>();
  const router = useRouter();
  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileToUpload: FormDataEntryValue | null = formData.get("coverUrl");
    let profilePic = user.profilePic; // Default profile picture
    console.log(fileToUpload);
    if (fileToUpload instanceof File && fileToUpload.name !== "") {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);
      const uploadResponse = await api.post(
        "/upload/profilePics",
        uploadFormData
      );
      profilePic = uploadResponse.data.fileURL;
    }

    const response = await api.put(
      `/users/${user.id}`,
      {
        profilePic,
        name: formData.get("name"),
        preferences: userPreferences,
        school: userSchool,
        description: formData.get("description"),
        isPublic: formData.get("isPublic") == null ? true : false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      toast.error("Erro ao editar usuário", {
        style: {
          backgroundColor: "#171717",
        },
      });
    } else {
      const { token } = response.data;
      if (salvarTokenNoCookie(token)) {
        toast.success("Sucesso ao editar usuário", {
          style: {
            backgroundColor: "#171717",
          },
        });
        router.push("/homepage");
      }
    }
  };
  const preferenceOptions = [];
  for (const preference of preferences) {
    preferenceOptions.push({
      value: preference.id,
      label: preference.name,
    });
  }

  const schoolsOptions = [];
  for (const school of schools) {
    schoolsOptions.push({
      value: school.id,
      label: school.name,
    });
  }
  return (
    <section className={styles.createUserForm}>
      <div className={styles.logoArea}>
        <Image src={logo} alt="logo" width={170} height={170} quality={100} />
      </div>
      <form onSubmit={handleCreateUser} className={styles.form}>
        <DefaultToastContainer />
        <div className={styles.fieldsArea}>
          <DefaultInput
            defaultValue={user.name}
            label="Nome"
            name="name"
            type="text"
          />
          <DefaultSelect
            onChange={(e: select_type[]) => {
              let values: number[] = [];
              e.forEach((element) => {
                values.push(element.value);
              });
              setUserPreferences(values);
            }}
            name="preferences"
            placeholder="Preferências"
            options={preferenceOptions}
            isMulti
          />
          <DefaultSelect
            onChange={(e: select_type) => {
              setUserSchool(e.value);
            }}
            name="school"
            placeholder="Escolas"
            options={schoolsOptions}
            isMulti={false}
          />
          <div className={styles.profilePic}>
            <MediaPicker defaultValue={user.profilePic} />
            <label htmlFor="media">
              <Camera /> Adicionar imagem de perfil
            </label>
          </div>
          <FormControlLabel
            style={{
              fontFamily: "__Montserrat_Fallback_f4d50f",
              fontSize: "15px",
            }}
            sx={{
              fontFamily: "__Montserrat_Fallback_f4d50f",
              fontSize: "15px",
            }}
            control={
              <Checkbox
                name="isPublic"
                sx={{
                  "&.Mui-checked": {
                    color: "#171717",
                  },
                }}
              />
            }
            defaultChecked={user.isPublic}
            label="Manter minha conta privada"
          />
          <DefaultTextarea
            name="description"
            defaultValue={user.description}
            label="Descrição"
            rows={10}
          />
          <button type="submit">Editar Conta</button>
        </div>
      </form>
    </section>
  );
}
