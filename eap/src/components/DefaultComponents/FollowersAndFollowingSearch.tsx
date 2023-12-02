"use client";
import { api } from "@/app/api";
import { JWTToken, resumed_user_type } from "@/app/api/types";
import decode, { jwtDecode } from "jwt-decode";
import { useUrl } from "nextjs-current-url";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/DefaultComponents/followerssearch.module.scss";
import ResumedUserCard from "../UtilComponents/ResumedUserCard";

export default function FollowersAndFollowingSearch({
  token,
  userId,
  isFollowing,
}: {
  token: string;
  userId: string;
  isFollowing: boolean;
}) {
  const [users, setUsers] = useState<resumed_user_type[]>([]);
  const handleGetUserFollowers = async () => {
    const response = await api.post(
      !isFollowing
        ? `/search/followers/${userId}`
        : `/search/following/${userId}`,
      {
        userName: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };
  const handleSearchChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await api.post(
      !isFollowing
        ? `/search/followers/${userId}`
        : `/search/following/${userId}`,
      {
        userName: formData.get("search"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };
  const decodedToken: JWTToken = jwtDecode(token);
  useEffect(() => {
    handleGetUserFollowers();
  }, []);
  const { href: currentUrl, pathname } = useUrl() ?? {};
  return (
    <div className={styles.usersSearch}>
      <form onChange={handleSearchChange} className={styles.inputUtil}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisar"
          className={styles.input}
        />
      </form>
      {users.length === 0 ? (
        <div>
          <p>
            Estamos requisitando a lista de usuários ou o usuário não possui
            nenhum seguidor
          </p>
        </div>
      ) : (
        <div className={styles.followersList}>
          {users.map((user) => {
            return <ResumedUserCard token={token} user={user} key={user.id} />;
          })}
        </div>
      )}
    </div>
  );
}
