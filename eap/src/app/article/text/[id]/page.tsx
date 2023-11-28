import { api } from "@/app/api";
import { article_type } from "@/app/api/types";
import EmptyComments from "@/components/DefaultComponents/EmptyComments";
import Footer from "@/components/DefaultComponents/Footer";
import CreateCommentForm from "@/components/Forms/CreateCommentForm";
import Article from "@/components/UtilComponents/Article";
import Comment from "@/components/UtilComponents/Comment";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/logo-sem-fundo.png";
import styles from "../../../../../styles/Pages/article.module.scss";

export default async function ArticleTextPage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = params.id;
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/article/page/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const post: article_type = response.data;
  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <Image
          src={logo}
          quality={100}
          alt="logo"
          placeholder="blur"
          height={70}
          width={70}
        />
      </div>
      <Article post={post} />
      <div className={styles.buttonArea}>
        <Link href={`/article/text/${post.id}`} className={styles.button}>
          Aplicar técnicas de leitura
        </Link>
      </div>
      {post.fullComments.length > 0 ? (
        post.fullComments.map((comment) => {
          return <Comment comment={comment} key={comment.id} />;
        })
      ) : (
        <EmptyComments />
      )}
      <CreateCommentForm postId={id} />
      <Footer />
    </main>
  );
}
