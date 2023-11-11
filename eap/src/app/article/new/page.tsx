import { api } from "@/app/api";
import { prefernce_type } from "@/app/api/types";
import Footer from "@/components/DefaultComponents/Footer";
import CreateArticleForm from "@/components/Forms/CreateArticleForm";
import Image from "next/image";
import logo from "../../../../public/logo-sem-fundo.png";
import styles from "../../../../styles/Pages/newarticle.module.scss";
export default async function NewArticle() {
  const response = await api.get("/preferences");
  let preferences: prefernce_type[] = [];
  if (response.status === 200) {
    preferences = response.data;
  }
  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image
          src={logo}
          alt="logo"
          quality={100}
          placeholder="blur"
          height={70}
          width={70}
        />
      </div>
      <CreateArticleForm preferences={preferences} />
      <Footer />
    </main>
  );
}
