import Link from "next/link";

export default function AddArticle() {
  return (
    <section
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <strong>
        <span>
          Você ainda não compartilhou nenhum post.{" "}
          <Link href={"/article/new"}>
            Compartilhe seu artigo clicando aqui
          </Link>
        </span>
      </strong>
    </section>
  );
}
