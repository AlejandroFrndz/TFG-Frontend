import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ProjectItem } from "src/shared/ProjectItem";
import { DragTypes } from "src/utils/constants";

type FileProps = {
  name: string;
  id: string;
  selected: boolean;
  setSelectedFile: (fileId: string) => void;
};

export const File: React.FC<FileProps> = ({
  name,
  id,
  selected,
  setSelectedFile,
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { name, id },
    type: DragTypes.FILE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        setSelectedFile(item.id);
      }
    },
  }));

  useEffect(() => {
    preview(getEmptyImage());
  });

  return (
    <div ref={drag}>
      <ProjectItem
        type="file"
        name={name}
        isDragging={isDragging}
        isSelected={selected}
      />
    </div>
  );
};
