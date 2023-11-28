import { comment_type } from "@/app/api/types";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/UtilComponents/comment.module.scss";

export default function Comment({ comment }: { comment: comment_type }) {
  return (
    <div key={comment.id} className={styles.comment}>
      <Link href={`/user/${comment.user.id}`} className={styles.ppLink}>
        <Image
          src={comment.user.profilePic}
          alt={comment.user.name}
          width={40}
          height={40}
          quality={100}
          className={styles.image}
        />
      </Link>
      <div>
        <p>
          <Link href={`/user/${comment.user.id}`}>
            <strong>{comment.user.name}</strong>
          </Link>
        </p>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}
