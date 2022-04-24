import { Typography } from "antd";
import { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateFileParent } from "src/redux/files/actions";
import { updateFolderParent } from "src/redux/folders/actions";
import { DragTypes } from "src/utils/constants";

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
    drop: (item: any, monitor) => {
      switch (monitor.getItemType()) {
        case DragTypes.FOLDER:
          dispatch(updateFolderParent(item.id, id));
          break;
        case DragTypes.FILE:
          dispatch(updateFileParent(item.id, id));
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
