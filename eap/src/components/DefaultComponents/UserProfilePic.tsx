"use client";
import Image from "next/image";
import Link from "next/link";
import { useUrl } from "nextjs-current-url";
import styles from "../../../styles/DefaultComponents/footer.module.scss";

export default function UserProfilePic({
  image,
  userId,
  userName,
}: {
  image: string;
  userId: string;
  userName: string;
}) {
  const { href: currentUrl, pathname } = useUrl() ?? {};
  return (
    <Link href={`/user/${userId}`} className={styles.profilePic}>
      <Image
        src={image}
        width={25}
        height={25}
        quality={100}
        alt="user"
        style={
          String(currentUrl).match(`/user/${userId}`)
            ? {
                border: "1px solid #171717",
                objectFit: "cover",
                aspectRatio: "1/1",
              }
            : {
                objectFit: "cover",
                aspectRatio: "1/1",
              }
        }
      />
      <span>
        <strong>{userName}</strong>
      </span>
    </Link>
  );
}
