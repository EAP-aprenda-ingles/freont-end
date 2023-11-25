import Footer from "@/components/DefaultComponents/Footer";
import User from "@/components/UtilComponents/User";
import Image from "next/image";
import logo from "../../../../public/logo-sem-fundo.png";
import styles from "../../../../styles/Pages/user.module.scss";

export default function UserPage({ params }: { params: { id: string } }) {
  const id: string = params.id;
  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <Image src={logo} alt="EAP" quality={100} height={70} width={70} />
      </div>
      <User id={id} />
      <Footer />
    </main>
  );
}
