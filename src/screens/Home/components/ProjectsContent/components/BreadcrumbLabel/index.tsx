import { Breadcrumb, Typography } from "antd";
import { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { updateFolderParent } from "src/redux/auth/actions";
import { DragTypes } from "src/utils/constants";

const { Text } = Typography;

type BreadcrumbLabelProps = {
  index: number;
  lastIndex: number;
  name: string;
  id: string | null;
  clampActiveFolders: (lenght: number) => void;
};

export const BreadcrumbLabel: React.FC<BreadcrumbLabelProps> = ({
  index,
  lastIndex,
  name,
  id,
  clampActiveFolders,
}) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [DragTypes.FOLDER, DragTypes.FILE],
    drop: (item: any, monitor) => {
      if (index !== lastIndex) dispatch(updateFolderParent(item.id, id));
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
      <Text style={styles.text}>{name}</Text>
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
