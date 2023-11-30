import { api } from "@/app/api";
import { article_type } from "@/app/api/types";
import { cookies } from "next/headers";
import sytles from "../../../styles/UtilComponents/feed.module.scss";
import Article from "./Article";

export default async function Feed() {
  const token = cookies().get("user_token")?.value;
  const response = await api.get("/article", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const posts: article_type[] = response.data;
  return (
    <section className={sytles.feed}>
      {posts.map((post) => {
        return <Article key={post.id} post={post} />;
      })}
    </section>
  );
}
