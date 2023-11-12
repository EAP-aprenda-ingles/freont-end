"use client";
import DefaultInput from "@/components/DefaultComponents/DefaultInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import logo from "../../public/logo-sem-fundo.png";
import styles from "../../styles/Pages/page.module.scss";
import { api } from "./api";
import { salvarTokenNoCookie } from "./api/functions";

export default function Login() {
  const router = useRouter();
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await api.post("/login", {
      login: formData.get("email"),
      password: formData.get("password"),
    });
    const { token } = response.data;
    if (token) {
      if (salvarTokenNoCookie(token)) {
        router.push("/homepage");
      }
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <Image src={logo} alt="logo" width={170} height={170} quality={100} />
      </div>
      <form onSubmit={handleLogin}>
        <div className={styles.inputsArea}>
          <DefaultInput
            type="text"
            name="email"
            id="email"
            required
            label="E-mail"
          />
          <DefaultInput
            type="password"
            name="password"
            id="password"
            required
            label="Senha"
          />
        </div>

        <div className={styles.buttonsArea}>
          <button type="submit" className={styles.reverseButton}>
            Login
          </button>
          <button
            className={styles.button}
            onClick={() => router.push("/register")}
            type="submit"
          >
            Criar Conta
          </button>
        </div>
      </form>
    </main>
  );
}
