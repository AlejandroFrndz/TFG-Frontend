import { DeleteOutlined } from "@ant-design/icons";
import { Switch, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { CSSProperties, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/auth/selectors";
import { IUser } from "src/utils/api/resources/user";

interface Props {
  data: IUser[];
  handleUpdateUser: (
    userId: string,
    updatedUser: Partial<Omit<IUser, "id">>
  ) => Promise<void>;
  handleDeleteUser: (userId: string) => Promise<void>;
}

export const UsersAdminTable: React.FC<Props> = ({
  data,
  handleUpdateUser,
  handleDeleteUser,
}) => {
  const currentUser = useSelector(selectUser) as IUser;

  const [loadingAdminStatus, setLoadingAdminStatus] = useState<
    Record<string, boolean>
  >(data.reduce((obj, user) => ({ ...obj, [user.id]: false }), {}));
  const [loadingDelete, setLoadingDelete] = useState<Record<string, boolean>>(
    data.reduce((obj, user) => ({ ...obj, [user.id]: false }), {})
  );

  const handleUpdateAdminStatus = async (userId: string, isAdmin: boolean) => {
    setLoadingAdminStatus({ ...loadingAdminStatus, [userId]: true });

    await handleUpdateUser(userId, { isAdmin });

    setLoadingAdminStatus({ ...loadingAdminStatus, [userId]: false });
  };

  const onDeleteUser = async (userId: string) => {
    setLoadingDelete({ ...loadingDelete, [userId]: true });

    await handleDeleteUser(userId);

    setLoadingDelete({ ...loadingDelete, [userId]: false });
  };

  const columns: ColumnsType<IUser> = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
      width: "25%",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Is Admin",
      key: "isAdmin",
      render: (_var, record) => {
        if (record.id === currentUser.id) {
          return (
            <Tooltip overlay="You cannot update your own admin status">
              <Switch checked disabled />
            </Tooltip>
          );
        }

        return (
          <Switch
            checked={record.isAdmin}
            loading={loadingAdminStatus[record.id]}
            onChange={(value) => handleUpdateAdminStatus(record.id, value)}
          />
        );
      },
    },
    {
      title: "Actions",
      render: (_var, record) => {
        const isCurrentUser = record.id === currentUser.id;

        return (
          <Tooltip
            overlay={
              isCurrentUser
                ? "You cannot delete your own user account from here"
                : "Delete User"
            }
            mouseEnterDelay={isCurrentUser ? undefined : 0.8}
            arrowPointAtCenter
          >
            <DeleteOutlined
              style={{
                cursor: isCurrentUser
                  ? "not-allowed"
                  : loadingDelete[record.id]
                  ? "loading"
                  : "pointer",
                color: isCurrentUser ? "#949494" : "#000",
              }}
              onClick={
                isCurrentUser || loadingDelete[record.id]
                  ? undefined
                  : () => onDeleteUser(record.id)
              }
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ["bottomCenter"], hideOnSinglePage: true }}
      style={styles.table}
    />
  );
};

const styles = {
  table: {
    padding: "30px",
  } as CSSProperties,
};
