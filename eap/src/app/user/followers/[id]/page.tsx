import { api } from "@/app/api";
import { user_type } from "@/app/api/types";
import FollowingAndFollowersHeader from "@/components/DefaultComponents/FollowersAndFollowingHeader";
import FollowersAndFollowingSearch from "@/components/DefaultComponents/FollowersAndFollowingSearch";
import Footer from "@/components/DefaultComponents/Footer";
import { cookies } from "next/headers";
import styles from "../../../../../styles/Pages/follows.module.scss";

export default async function FollowersPage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = params.id;
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user: user_type = response.data;
  return (
    <main className={styles.main}>
      <FollowingAndFollowersHeader
        userName={user.name}
        followers={user.followers}
        following={user.following}
        userId={user.id}
      />
      <FollowersAndFollowingSearch
        isFollowing={false}
        token={token ?? ""}
        userId={id}
      />
      <Footer />
    </main>
  );
}
