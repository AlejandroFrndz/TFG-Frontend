import { Col, message, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { IUser } from "src/utils/api/resources/user";
import API from "src/utils/api";
import { HashLoader } from "react-spinners";
import { UsersAdminTable } from "./components/UsersAdminTable";

const { Title, Text } = Typography;

export const UsersAdminSection: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      const response = await API.user.getAll();

      if (response.isSuccess()) {
        setUsers(response.value);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = async (
    userId: string,
    updatedUser: Partial<Omit<IUser, "id">>
  ) => {
    const response = await API.user.adminUpdate(userId, updatedUser);

    if (response.isSuccess()) {
      setUsers(
        users.map((user) => {
          if (user.id === response.value.user.id) {
            return response.value.user;
          }

          return user;
        })
      );
    } else {
      message.error(
        "Couldn't process the update at the moment. Please, refresh the page and try again later"
      );
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const response = await API.user.adminDelete(userId);

    if (response.isSuccess()) {
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      message.error(
        "Couldn't process the update at the moment. Please, refresh the page and try again later"
      );
    }
  };

  return (
    <>
      <Row justify="center" style={styles.titleRow}>
        <Col span={24}>
          <Title>Users Management</Title>
        </Col>
        <Col span={24}>
          <Text>Here you can grant/revoke admin access to the app users</Text>
        </Col>
        <Col span={24}>
          <Text>
            You may also effectively ban users by deleting their accounts
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
        <UsersAdminTable
          data={users}
          handleUpdateUser={handleUpdateUser}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </>
  );
};

const styles = {
  titleRow: {
    textAlign: "center",
  } as CSSProperties,

  apiStatusWrapper: {
    marginTop: "80px",
    marginBottom: "60px",
  } as CSSProperties,
};
