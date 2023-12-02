"use client";
import { api } from "@/app/api";
import { salvarTokenNoCookie } from "@/app/api/functions";
import { prefernce_type, school_type } from "@/app/api/types";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/Forms/createuserform.module.scss";
import DefaultInput from "../DefaultComponents/DefaultInput";
import DefaultSelect from "../DefaultComponents/DefaultSelect";
import DefaultTextarea from "../DefaultComponents/DefaultTextarea";
import DefaultToastContainer from "../DefaultComponents/DefaultToastContainer";
import { MediaPicker } from "../DefaultComponents/MediaPicker";

type select_type = {
  label: string;
  value: number;
};
export default function CreateUserForm({
  preferences,
  schools,
}: {
  preferences: prefernce_type[];
  schools: school_type[];
}) {
  const [userPreferences, setUserPreferences] = useState<number[]>([]);
  const [userSchool, setUserSchool] = useState<number>();
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
    const response = await api.post("/users", {
      profilePic,
      name: formData.get("name"),
      login: formData.get("email"),
      password: formData.get("password"),
      preferences: userPreferences,
      school: userSchool,
      description: formData.get("description"),
      isPublic: formData.get("isPublic") == null ? true : false,
    });
    if (response.status !== 200) {
      toast.error(response.statusText);
    } else {
      const { token } = response.data;
      if (salvarTokenNoCookie(token)) {
        toast.success(response.statusText);
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
    <form onSubmit={handleCreateUser} className={styles.form}>
      <DefaultToastContainer />
      <div className={styles.fieldsArea}>
        <DefaultInput label="Nome" name="name" type="text" />
        <DefaultInput label="E-mail" name="email" type="email" />
        <DefaultInput label="Senha" name="password" type="password" />
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
          <MediaPicker />
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
          label="Manter minha conta privada"
        />
        <DefaultTextarea name="description" label="Descrição" rows={10} />
        <button type="submit">Criar Conta</button>
      </div>
    </form>
  );
}
