"use client";
import { api } from "@/app/api";
import { salvarTokenNoCookie } from "@/app/api/functions";
import Cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import logo from "../../../public/logo-sem-fundo.png";
import styles from "../../../styles/Forms/editloginform.module.scss";
import DefaultInput from "../DefaultComponents/DefaultInput";

export default function EdiLoginForm() {
  const router = useRouter();
  const handleEditLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = Cookie.get("user_token");
    if (token) {
      const formData = new FormData(event.currentTarget);
      if (formData.get("password") === formData.get("confirmPassword")) {
        const response = await api.put(
          "/login",
          {
            login: formData.get("email"),
            password: formData.get("password"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          toast.error("Erro ao atualizar seu login!", {
            style: {
              backgroundColor: "#171717",
            },
          });
        } else {
          const { data } = response;
          if (data.token) {
            if (salvarTokenNoCookie(data.token)) {
              toast.success("Login aletrado com sucesso!", {
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
      } else {
        toast.error("As senhas não coincidem!", {
          style: {
            backgroundColor: "#171717",
          },
        });
      }
    } else {
      toast.error("Você deve estar logado para poder alterar sua senha!", {
        style: {
          backgroundColor: "#171717",
        },
      });
    }
  };
  return (
    <section className={styles.loginForm}>
      <div className={styles.logoArea}>
        <Image src={logo} alt="logo" width={170} height={170} quality={100} />
      </div>
      <form onSubmit={handleEditLogin}>
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
          <DefaultInput
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            label="Confirmar Senha"
          />
        </div>
        <button className={styles.button} type="submit">
          Editar login
        </button>
      </form>
    </section>
  );
}
