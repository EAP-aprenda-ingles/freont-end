import Footer from "@/components/DefaultComponents/Footer";
import CreateArticleForm from "@/components/Forms/CreateArticleForm";
import Image from "next/image";
import logo from "../../../../public/logo-sem-fundo.png";
import styles from "../../../../styles/Pages/newarticle.module.scss";
export default function NewArticle() {
  return (
    <main>
      <div>
        <Image
          src={logo}
          alt="logo"
          quality={100}
          placeholder="blur"
          height={70}
          width={70}
        />
      </div>
      <CreateArticleForm />
      <Footer />
    </main>
  );
}
