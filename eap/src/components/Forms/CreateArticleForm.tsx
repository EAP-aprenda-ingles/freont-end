import { Camera, File } from "lucide-react";
import { ArticleMediaPicker } from "../DefaultComponents/ArticleMediaPicker";
import DefaultButton from "../DefaultComponents/DefaultButton";
import DefaultInput from "../DefaultComponents/DefaultInput";
import DefaultTextarea from "../DefaultComponents/DefaultTextarea";

export default function CreateArticleForm() {
  return (
    <form>
      <div>
        <DefaultInput label="Título" type="text" />
        <DefaultTextarea name="description" label="Descrição" rows={10} />
        <label htmlFor="mediaImage">
          <Camera /> Adicionar imagem de perfil
        </label>
        <ArticleMediaPicker />
        <input
          type="file"
          placeholder="Adicionar arquivo"
          name="media"
          id="media"
        />
        <DefaultButton text="Criar Artigo" />
      </div>
    </form>
  );
}
