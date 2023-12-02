"use client";
import { api } from "@/app/api";
import Cookie from "js-cookie";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import styles from "../../../styles/Forms/createcommentform.module.scss";
import DefaultToastContainer from "../DefaultComponents/DefaultToastContainer";

export default function CreateCommentForm({ postId }: { postId: string }) {
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const handleCreateComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const token = Cookie.get("user_token");

    try {
      const response = await api.post(
        `/comments/${postId}`,
        {
          content: formData.get("comment"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setComment("");
        router.refresh();
        toast.success("Comentário criado com sucesso!", {
          style: {
            backgroundColor: "#171717",
          },
        });
      }
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      toast.error("Erro ao criar comentário", {
        style: {
          backgroundColor: "#171717",
        },
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleCreateComment}>
      <DefaultToastContainer />
      <div>
        <label htmlFor="comment">
          <button type="submit">
            <MoveRight width={18} height={18} />
          </button>
        </label>
        <input
          type="text"
          id="comment"
          name="comment"
          placeholder="Insira seu comentário..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </form>
  );
}
