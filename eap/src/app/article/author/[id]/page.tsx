import { api } from "@/app/api";
import { article_type, category_type, file_type } from "@/app/api/types";
import Footer from "@/components/DefaultComponents/Footer";
import SecondarySelectableText from "@/components/UtilComponents/SecondarySelectableText";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../../../styles/Pages/articletext.module.scss";

export default async function AuthorArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = params.id;
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/article/author/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const post: {
    fileData: file_type;
    categories: { categories: category_type[] };
  } = response.data;
  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <h2>Criado por:</h2>
        <Link
          href={`/user/${post.fileData.user.id}`}
          className={styles.userCard}
        >
          <Image
            src={post.fileData.user.profilePic}
            alt="author-photo"
            width={50}
            height={50}
            quality={100}
          />
          <div>
            <h3>{post.fileData.user.name}</h3>
            <span>{post.fileData.user.school}</span>
          </div>
        </Link>
        <Link href={post.fileData.coverUrl} target="_blank">
          Acessar documento original
        </Link>
      </div>
      <section className={styles.textArea}>
        <div className={styles.postTitle}>
          <h1>{post.fileData.title}</h1>
        </div>
        <SecondarySelectableText
          text={post.fileData.file}
          toHighlight={post.fileData.actions}
        />
      </section>
      <div className={styles.buttonArea}>
        <Link
          href={`/article/text/${post.fileData.id}`}
          className={styles.button}
        >
          Aplicar técnicas de leitura
        </Link>
      </div>
      <Footer />
    </main>
  );
}
