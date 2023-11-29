"use client";
import { api } from "@/app/api";
import { article_type } from "@/app/api/types";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import comment from "../../../public/images/posts/comment.svg";
import activeLike from "../../../public/images/posts/like-active.svg";
import unactiveLike from "../../../public/images/posts/like-unactive.svg";
import user from "../../../public/images/posts/user 1.svg";
import styles from "../../../styles/UtilComponents/article.module.scss";

dayjs.locale(ptBr);

export default function Article({ post }: { post: article_type }) {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean>(post.likedByUser);
  const [serverPost, setServerPost] = useState<article_type>(post);
  const token = Cookie.get("user_token");

  const handleLikePost = async (postId: string) => {
    try {
      const response = await api.post(
        "/likes",
        {
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setLiked((prevLiked) => !prevLiked);
        setServerPost({ ...serverPost, likes: response.data.likes });
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
      // Lógica de tratamento de erro, se necessário
    }
  };

  return (
    <div className={styles.post}>
      <div
        className={styles.authorArea}
        onClick={() => router.push(`/user/${serverPost.author.id}`)}
      >
        <Image
          src={serverPost.author.profilePic}
          alt={serverPost.author.name}
          width={40}
          height={40}
          quality={100}
          style={{ aspectRatio: "1/1" }}
        />

        <div className={styles.authorInfos}>
          <span>{serverPost.author.name}</span>
          <span className={styles.authorSchool}>
            {serverPost.author.School.name}
          </span>
        </div>
      </div>
      <Link href={`/article/${serverPost.id}`}>
        <span className={styles.postTitle}>
          <h3>{serverPost.title}</h3>
        </span>
        <span className={styles.postDescription}>
          <span>{serverPost.description}</span>
        </span>
        <div className={styles.postImage}>
          <img src={serverPost.articleCover} alt="post content" />
        </div>
      </Link>

      <div className={styles.interactions}>
        <div>
          {!liked ? (
            <Image
              src={unactiveLike}
              alt="like"
              quality={100}
              onClick={() => handleLikePost(post.id)}
            />
          ) : (
            <Image
              src={activeLike}
              alt="like"
              quality={100}
              onClick={() => handleLikePost(post.id)}
            />
          )}
          <span>{serverPost.likes}</span>
        </div>
        <div onClick={() => router.push(`/article/${post.id}`)}>
          <Image src={comment} alt="comment" quality={100} />
          <span>{post.comments}</span>
        </div>
        <div className={styles.userInteractions}>
          <Image src={user} alt="user-image" quality={100} />
          <span>{post.interactions}</span>
        </div>
      </div>
      <div
        className={styles.postContent}
        onClick={() => router.push(`/post/${post.id}`)}
      ></div>
    </div>
  );
}
