import Image from "next/image";
import logo from "../../../public/logo-sem-fundo.png";
export default function Register() {
  return (
    <main>
      <div>
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={60}
          quality={100}
          placeholder="blur"
        />
      </div>
    </main>
  );
}
