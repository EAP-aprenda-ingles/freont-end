import Footer from "@/components/DefaultComponents/Footer";
import { Mailbox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo-sem-fundo.png";
import styles from "../../../styles/Pages/homepage.module.scss";

export default function homepage() {
  return (
    <main className={styles.main}>
      <div className={styles.homeTop}>
        <Image
          src={logo}
          alt="logo"
          quality={100}
          placeholder="blur"
          height={70}
          width={70}
        />
        <Link href="/notifications">
          <Mailbox height={40} width={40} />
        </Link>
      </div>
      <Footer />
    </main>
  );
}
