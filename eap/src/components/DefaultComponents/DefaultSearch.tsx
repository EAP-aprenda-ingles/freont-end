"use client";
import { api } from "@/app/api";
import { resumed_user_type } from "@/app/api/types";
import { FormEvent, useState } from "react";
import styles from "../../../styles/DefaultComponents/followerssearch.module.scss";
import ResumedUserCard from "../UtilComponents/ResumedUserCard";

export default function DefaultSearch({ token }: { token: string }) {
  const [users, setUsers] = useState<resumed_user_type[]>([]);
  const handleSearchChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await api.post(
      "/search",
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
          <p>Não existe nenhum usuário com o valor inserido na sua pesquisa</p>
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
