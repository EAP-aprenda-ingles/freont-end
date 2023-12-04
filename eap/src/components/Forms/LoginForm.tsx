"use client";
import { api } from "@/app/api";
import { salvarTokenNoCookie } from "@/app/api/functions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import logo from "../../../public/logo-sem-fundo.png";
import styles from "../../../styles/Forms/loginform.module.scss";
import DefaultInput from "../DefaultComponents/DefaultInput";

export default function LoginForm() {
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
    <section className={styles.loginForm}>
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
          <div className={styles.forgotPassword}>
            <Link href="/forgot-password">Esqueci a senha</Link>
          </div>
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
    </section>
  );
}
