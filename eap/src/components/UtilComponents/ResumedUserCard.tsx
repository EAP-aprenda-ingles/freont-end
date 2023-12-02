import { JWTToken, resumed_user_type } from "@/app/api/types";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../../../styles/UtilComponents/resumedusercard.module.scss";
import Follow from "./buttons/Follow";

export default function ResumedUserCard({
  user,
  token,
}: {
  user: resumed_user_type;
  token: string;
}) {
  const router = useRouter();
  const decodedToken: JWTToken = jwtDecode(token);
  return (
    <div className={styles.resumedUserCard}>
      <Image
        onClick={() => router.push(`/user/${user.id}`)}
        src={user.profilePic}
        alt={user.name}
        width={40}
        height={40}
      />
      <div
        onClick={() => router.push(`/user/${user.id}`)}
        className={styles.userData}
      >
        <span>{user.name}</span>
        <span>{user.school}</span>
      </div>
      {decodedToken.sub === user.id ? (
        <div style={{ width: "80px" }}>
          {" "}
          <span></span>{" "}
        </div>
      ) : (
        <div
          style={{
            width: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Follow
            followedByUser={user.followedByUser}
            token={token}
            userId={user.id}
          />
        </div>
      )}
    </div>
  );
}
