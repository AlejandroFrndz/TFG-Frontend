import { Col, Divider, Row } from "antd";
import { ReactComponent as MarcoTAOSvg } from "src/assets/SVG/MarcoTAO.svg";
import logoLIS from "src/assets/PNG/logoLIS.png";
import logoLexicon from "src/assets/PNG/logoLexicon.png";
import { Helmet } from "react-helmet";
import { MarcoTAO } from "src/utils/constants";
import { CSSProperties } from "react";

export const WelcomeContent: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{MarcoTAO} - Home</title>
      </Helmet>
      <Row justify="center" align="middle" style={styles.mainRow}>
        <Col span={8} style={styles.imgCol}>
          <img src={logoLexicon} width={200} alt="Lexicon Group logo" />
        </Col>
        <Col span={8} style={styles.imgCol}>
          <MarcoTAOSvg width={600} />
        </Col>
        <Col span={8} style={styles.imgCol}>
          <img src={logoLIS} width={200} alt="LIS Group logo" />
        </Col>
      </Row>
      <Row justify="space-around" style={styles.mainRow}>
        <Col span={7} style={styles.textCol}>
          <p>
            MarcoTAO es un proyecto del grupo{" "}
            <a
              href="http://lexicon.ugr.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lexicon
            </a>{" "}
            de la Universidad de Granada desarrollado en colaboración con el
            grupo{" "}
            <a
              href="https://www.lis-lab.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              LIS
            </a>{" "}
            (Laboratoire d’Informatique & Systèmes) de la Universidad
            Aix-Marseille (Francia).
          </p>
          <p>
            La herramienta permite parsear, etiquetar y analizar corpus en
            español, inglés y francés para hacer búsquedas conducentes a obtener
            los esquemas lexicogramaticales y los marcos semánticos de los
            términos analizados.
          </p>
        </Col>
        <Divider type="vertical" style={styles.divider} />
        <Col span={7} style={styles.textCol}>
          <p>
            MarcoTAO is a project of the{" "}
            <a
              href="http://lexicon.ugr.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lexicon
            </a>{" "}
            group at the University of Granada developed in collaboration with
            the{" "}
            <a
              href="https://www.lis-lab.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              LIS
            </a>{" "}
            group (Laboratoire d'Informatique & Systèmes) at the University of
            Aix-Marseille (France).
          </p>
          <p>
            This tool allows to parse, tag and analyze Spanish, English and
            French corpora in order to obtain the lexicogrammatical schemes and
            semantic frames of the analyzed terms.
          </p>
        </Col>
        <Divider type="vertical" style={styles.divider} />
        <Col span={7} style={styles.textCol}>
          <p>
            MarcoTAO est un projet du groupe{" "}
            <a
              href="http://lexicon.ugr.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lexicon
            </a>{" "}
            de l'Université de Grenade développé en collaboration avec le groupe{" "}
            <a
              href="https://www.lis-lab.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              LIS
            </a>{" "}
            (Laboratoire d'Informatique & Systèmes) de l'Université
            d'Aix-Marseille (France).
          </p>
          <p>
            L'outil permet de parser, d'étiqueter et d'analyser des corpus
            espagnols, anglais et français afin d'obtenir les schémas
            lexicogrammaticaux et les cadres sémantiques des termes analysés.
          </p>
        </Col>
      </Row>
    </>
  );
};

const styles = {
  imgCol: {
    justifyContent: "center",
    display: "flex",
  } as CSSProperties,

  textCol: {
    padding: "10px",
    textAlign: "justify",
    fontWeight: "600",
  } as CSSProperties,

  divider: {
    height: "100%",
  } as CSSProperties,

  mainRow: {
    marginTop: "-50px",
  } as CSSProperties,
};
