import { Typography } from "antd";
import { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateFile } from "src/redux/files/actions";
import { updateFolder } from "src/redux/folders/actions";
import API from "src/utils/api";
import { DragTypes } from "src/utils/constants";
import { handleActionErrorMessage } from "src/utils/helpers";

const { Text } = Typography;

type BreadcrumbLabelProps = {
  index: number;
  name: string;
  id: string | null;
  clampActiveFolders: (lenght: number) => void;
};

export const BreadcrumbLabel: React.FC<BreadcrumbLabelProps> = ({
  index,
  name,
  id,
  clampActiveFolders,
}) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [DragTypes.FOLDER, DragTypes.FILE],
    drop: async (item: any, monitor) => {
      switch (monitor.getItemType()) {
        case DragTypes.FOLDER:
          const folderResponse = await API.folder.updateParent(item.id, id);

          if (folderResponse.isSuccess()) {
            dispatch(updateFolder(folderResponse.value.folder));
          } else {
            handleActionErrorMessage(folderResponse.error);
          }
          break;
        case DragTypes.FILE:
          const fileResponse = await API.file.updateParent(item.id, id);

          if (fileResponse.isSuccess()) {
            dispatch(updateFile(fileResponse.value.file));
          } else {
            handleActionErrorMessage(fileResponse.error);
          }
          break;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <span
      onClick={() => clampActiveFolders(index)}
      ref={drop}
      style={styles.drop(isOver)}
    >
      <Text ellipsis style={styles.text}>
        {name}
      </Text>
    </span>
  );
};

const styles = {
  text: {
    fontSize: "20px",
  } as CSSProperties,

  drop: (isOver: boolean): CSSProperties => ({
    backgroundColor: isOver ? "#f1f3f4" : undefined,
    padding: "5px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    height: "80%",
  }),
};
