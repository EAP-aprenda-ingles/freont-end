import DefaultSearch from "@/components/DefaultComponents/DefaultSearch";
import Footer from "@/components/DefaultComponents/Footer";
import { cookies } from "next/headers";
import styles from "../../../styles/Pages/search.module.scss";

export default async function Search() {
  const token = cookies().get("user_token")?.value;
  return (
    <main className={styles.main}>
      <DefaultSearch token={token ?? ""} />
      <Footer />
    </main>
  );
}
