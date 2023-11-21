import { api } from "@/app/api";
import { article_type } from "@/app/api/types";
import { cookies } from "next/headers";
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
    <section>
      {posts.map((post) => {
        return <Article key={post.id} post={post} />;
      })}
    </section>
  );
}
