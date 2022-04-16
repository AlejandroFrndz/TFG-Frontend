import { CSSProperties } from "react";
import { useDragLayer, XYCoord } from "react-dnd";
import { DragTypes } from "../../../../../../utils/constants";
import { FolderPreview } from "../Folder/FolderPreview";

export const CustomDragLayer: React.FC = () => {
  const { itemType, isDragging, currentOffset, item } = useDragLayer(
    (monitor) => ({
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
      item: monitor.getItem(),
    })
  );

  const renderItem = () => {
    switch (itemType) {
      case DragTypes.FOLDER:
        return <FolderPreview name={item?.name} />;
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div style={styles.layer}>
      <div style={styles.item(currentOffset)}>{renderItem()}</div>
    </div>
  );
};

const styles = {
  layer: {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "22%",
  } as CSSProperties,

  item: (currentOffset: XYCoord | null): CSSProperties => {
    if (!currentOffset) {
      return { display: "none" };
    }

    const { x, y } = currentOffset;

    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  },
};
