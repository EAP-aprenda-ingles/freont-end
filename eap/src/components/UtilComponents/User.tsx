import { api } from "@/app/api";
import { JWTToken, user_type } from "@/app/api/types";
import { jwtDecode } from "jwt-decode";
import { Video } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/UtilComponents/user.module.scss";
import EmptyPosts from "./EmptyPosts";
import Preference from "./Preference";
import UserField from "./UserField";
import Follow from "./buttons/Follow";
import Others from "./buttons/Others";

export default async function User({ id }: { id: string }) {
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const decodedToken: JWTToken = jwtDecode(token ?? "");
  const user: user_type = response.data;
  //   console.log(response.data);
  return (
    <main className={styles.main}>
      <div className={styles.topPart}>
        <div className={styles.userData}>
          <div className={styles.userUtilData}>
            <Image
              src={user.profilePic}
              alt={user.name}
              width={60}
              height={60}
            />
          </div>
          <div className={styles.userInfos}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userSchool}>{user.school.name}</span>
          </div>
        </div>
        <div>
          <p>{user.description}</p>
        </div>
        <div className={styles.communityData}>
          <UserField
            // padding
            dataToShow={user.followers}
            text="Seguidores"
            url={`/user/followers/${user.id}`}
          />
          <UserField
            // padding
            dataToShow={user.following}
            text="Seguindo"
            url={`/user/following/${user.id}`}
          />
        </div>

        <div className={styles.userPreferences}>
          <h3>Preferências</h3>
          <div className={styles.preferencesList}>
            {user.preferences.map((preference) => (
              <Preference preference={preference} />
            ))}
          </div>
        </div>

        <div className={styles.userActions}>
          {decodedToken.sub === user.id ? (
            <Others text="Editar Perfil" url={`/user/edit/${user.id}`} />
          ) : (
            <Follow
              token={token ?? ""}
              userId={user.id}
              followedByUser={user.followedByUser}
            />
          )}
          {decodedToken.sub === user.id ? (
            <Others
              text="Compartilhar"
              url={`http://192.168.2.17:3000/user/${user.id}`}
            />
          ) : (
            <Others text="Mensagem" url={`/message/${user.id}`} />
          )}
        </div>
      </div>
      <div className={styles.postsList}>
        {user.articles.length > 0 ? (
          <div className={styles.postsArea}>
            {user.articles.map((article) => {
              return (
                <Link href={`/article/${article.id}`}>
                  <img src={article.articleCover} alt="user-post" />
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyPosts />
        )}
      </div>
    </main>
  );
}
