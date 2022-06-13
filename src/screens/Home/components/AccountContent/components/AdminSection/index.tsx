import { useSelector } from "react-redux";
import { selectUserIsAdmin } from "src/redux/auth/selectors";
import { Col, Collapse, Divider, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ISemanticRoleTag } from "src/utils/api/resources/tags/semanticRole";
import { ISemanticCategoryTag } from "src/utils/api/resources/tags/semanticCategory";
import { ILexicalDomainTag } from "src/utils/api/resources/tags/lexicalDomain";
import API from "src/utils/api";
import { HashLoader } from "react-spinners";
import { TableTags } from "./components/TableTags";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export const AdminSection: React.FC = () => {
  const isAdmin = useSelector(selectUserIsAdmin);

  const [trTags, setTrTags] = useState<ISemanticRoleTag[]>([]);
  const [scTags, setScTags] = useState<ISemanticCategoryTag[]>([]);
  const [domainTags, setDomainTags] = useState<ILexicalDomainTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);

      const tagsResponse = await API.tags.getAll();

      if (tagsResponse.isSuccess()) {
        setTrTags(tagsResponse.value.semanticRole);
        setScTags(tagsResponse.value.semanticCategory);
        setDomainTags(tagsResponse.value.lexicalDomain);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    };

    if (isAdmin) fetchTags();
  }, [isAdmin]);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Divider />
      <Row justify="center" style={styles.titleRow}>
        <Col span={24}>
          <Title style={styles.titleRow}>Admin Settings</Title>
        </Col>
        <Col span={24}>
          <Text>
            Here you can edit the tags users use during the tagging phase
          </Text>
        </Col>
      </Row>

      {isLoading ? (
        <Row justify="center" style={styles.apiStatusWrapper}>
          <Spin indicator={<HashLoader />} />
        </Row>
      ) : isError ? (
        <Row justify="center" style={styles.apiStatusWrapper}>
          <Text>
            Couldn't get tag information at the moment. Please, refresh the page
            and try again later
          </Text>
        </Row>
      ) : (
        <Collapse style={styles.collapse} expandIconPosition="right">
          <Panel key="tr" header="Semantic Roles">
            <TableTags type="thematicRoles" data={trTags} />
          </Panel>
          <Panel key="sc" header="Semantic Categories">
            Semantic Categories
          </Panel>
          <Panel key="dom" header="Lexical Domain">
            <TableTags type="lexicalDomains" data={domainTags} />
          </Panel>
          <Panel key="err" header="Errors">
            Errors
          </Panel>
        </Collapse>
      )}
    </>
  );
};

const styles = {
  titleRow: {
    textAlign: "center",
  } as CSSProperties,

  title: {
    fontSize: "30px",
  } as CSSProperties,

  collapse: {
    marginTop: "20px",
    width: "90vw",
    marginLeft: "1vw",
  } as CSSProperties,

  apiStatusWrapper: {
    marginTop: "80px",
    marginBottom: "60px",
  } as CSSProperties,
};
