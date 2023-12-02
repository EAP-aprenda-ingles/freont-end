"use client";
import DefaultInput from "@/components/DefaultComponents/DefaultInput";
import DefaultToastContainer from "@/components/DefaultComponents/DefaultToastContainer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
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
    if (response.status !== 200) {
      toast.error("E-mail ou senha informados incorretamente!", {
        style: {
          backgroundColor: "#171717",
        },
      });
    } else {
      const { data } = response;
      if (data.token) {
        if (salvarTokenNoCookie(data.token)) {
          toast.success("Login realizado com sucesso!", {
            style: {
              backgroundColor: "#171717",
            },
          });
          router.push("/homepage");
        }
      } else {
        toast.error("Ocorreu um problema ao processar o login.", {
          style: {
            backgroundColor: "#171717",
          },
        });
      }
    }
  };
  return (
    <main className={styles.main}>
      <DefaultToastContainer />
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
