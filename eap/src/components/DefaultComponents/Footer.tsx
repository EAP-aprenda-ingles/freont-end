import { JWTToken } from "@/app/api/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import unactiveHome from "../../../public/images/footer/home-unactive.svg";
import messageUnactive from "../../../public/images/footer/message-square.svg";
import unactivePost from "../../../public/images/footer/post-unactive.svg";
import unactiveSearch from "../../../public/images/footer/search-unactive.svg";
import styles from "../../../styles/DefaultComponents/footer.module.scss";
import UserProfilePic from "./UserProfilePic";
export default async function Footer() {
  const token = cookies().get("user_token")?.value;
  const decodedToken: JWTToken = jwtDecode(token ?? "");
  return (
    <footer className={styles.footer}>
      <Link href="/homepage">
        <Image
          src={unactiveHome}
          width={25}
          height={25}
          quality={100}
          alt="home"
        />
      </Link>
      <Link href="/search">
        <Image
          src={unactiveSearch}
          width={25}
          height={25}
          quality={100}
          alt="search"
        />
      </Link>
      <Link href="/article/new">
        <Image
          src={unactivePost}
          width={25}
          height={25}
          quality={100}
          alt="post"
        />
      </Link>
      <Link href="/message">
        <Image
          src={messageUnactive}
          width={25}
          height={25}
          quality={100}
          alt="message"
        />
      </Link>
      <UserProfilePic
        image={decodedToken.profilePic}
        userId={decodedToken.sub}
      />
    </footer>
  );
}
