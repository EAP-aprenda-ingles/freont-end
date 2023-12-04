import Footer from "@/components/DefaultComponents/Footer";
import styles from "../../../styles/Pages/readingtechniques.module.scss";

export default function ReadingTechniques() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>Técnicas de Leitura</h1>
        <p>
          As técnicas de leitura englobam um conjunto de estratégias e métodos
          que visam aprimorar a compreensão, a eficiência e a velocidade de
          leitura. Estas técnicas variam desde a forma como os olhos movem-se
          pelo texto até a aplicação de estratégias cognitivas para processar e
          reter informações. Isso pode incluir métodos para aumentar a
          velocidade de leitura sem comprometer a compreensão, como a eliminação
          de subvocalização, a prática de leitura em blocos de palavras e o uso
          de indicadores visuais. Além disso, envolve a aplicação de técnicas de
          escaneamento rápido, identificação de palavras-chave e o emprego de
          resumos e anotações para reforçar a compreensão e a memorização do
          conteúdo. As técnicas de leitura são frequentemente personalizadas
          para atender às necessidades individuais de cada pessoa,
          proporcionando uma abordagem mais eficaz para absorver informações de
          forma mais ágil e eficiente.
        </p>
        <h2>Tipos de Técnicas de Leitura</h2>
        <h3>Palavras Cognatas</h3>
        <h4>Significado resumido: Significado semelhante</h4>
        <p>
          Esta estratégia tem por objetivo localizar as palavras parecidas (na
          escrita e no significado) com a língua materna do leitor.
        </p>
        <h3>Palavras Falsas Cognatas</h3>
        <h4>Significado resumido: Significado diferente</h4>
        <p>
          Esta estratégia tem por objetivo localizar as palavras parecidas (na
          escrita), porém que tenham significado diferente da língua materna do
          leitor.
        </p>
        <h3>Evidências Tipográficas</h3>
        <h4>Significado resumido: Informações adicionais</h4>
        <p>
          Esta estratégia visa localizar pistas dadas pelo próprio texto:
          elementos visuais, datas, números, tabelas gráficas, imagens,
          gráficos, figuras etc, que possam colaborar para o entendimento do
          texto.
        </p>
        <h3>
          <em>Scanning</em>
        </h3>
        <h4>Significado resumido: Palavras-chaves</h4>
        <p>
          Esta estratégia visa encontrar informações específicas no texto: uma
          data, um horário, um nome, determinada palavras-chaves ou expressão,
          etc.
        </p>
        <h3>
          <em>Skimming</em>
        </h3>
        <h4>Significado resumido: Ideia geral/central do texto</h4>
        <p>
          Esta estratégia é comumente utilizada para encontrar informações no
          texto para compreendermos o assunto que ele aborda sem que façamos uma
          leitura completa do texto. Os nossos olhos passam rapidamente pelo
          texto, buscando a informação que precisamos (KLEIMAN, 2004).
        </p>
        <h3>
          <em>Background</em>
        </h3>
        <h4>Significado resumido: Conhecimento prévio</h4>
        <p>
          Esta estratégia consiste em o leitor utilizar os seus conhecimentos
          prévios sobre a língua para reconhecer as ideias, estruturas
          sintáticas e até concepções do autor para compreender o texto e o seu
          significado.
        </p>
      </div>
      <Footer />
    </main>
  );
}
