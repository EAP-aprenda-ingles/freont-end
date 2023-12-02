"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUrl } from "nextjs-current-url";
import styles from "../../../styles/DefaultComponents/secondaryheader.module.scss";
import UserField from "../UtilComponents/UserField";

export default function FollowingAndFollowersHeader({
  userName,
  followers,
  following,
  userId,
}: {
  userName: string;
  followers: number;
  following: number;
  userId: string;
}) {
  const router = useRouter();
  const { href: currentUrl, pathname } = useUrl() ?? {};
  return (
    <header className={styles.header}>
      <div className={styles.topPart}>
        <ArrowLeft
          height={20}
          width={20}
          onClick={() => router.push(`/user/${userId}`)}
        />{" "}
        <span onClick={() => router.push(`/user/${userId}`)}>{userName}</span>
      </div>
      <div className={styles.followersArea}>
        <Link
          href={`/user/followers/${userId}`}
          style={
            String(currentUrl).match("followers")
              ? { borderBottom: "2px solid #171717", paddingBottom: "3px" }
              : { borderBottom: "2px solid transparent", paddingBottom: "3px" }
          }
        >
          <UserField dataToShow={followers} text="Seguidores" />
        </Link>
        <Link
          href={`/user/following/${userId}`}
          style={
            String(currentUrl).match("following")
              ? { borderBottom: "2px solid #171717", paddingBottom: "3px" }
              : { borderBottom: "2px solid transparent", paddingBottom: "3px" }
          }
        >
          <UserField dataToShow={following} text="Seguindo" />
        </Link>
      </div>
    </header>
  );
}
