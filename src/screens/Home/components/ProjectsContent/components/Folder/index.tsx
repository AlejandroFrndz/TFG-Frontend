import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragTypes } from "src/utils/constants";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { updateFolder } from "src/redux/folders/actions";
import { ProjectItem } from "src/shared/components/ProjectItem";
import { updateFile } from "src/redux/files/actions";
import API from "src/utils/api";
import { handleActionErrorMessage } from "src/utils/helpers";

type FolderProps = {
  name: string;
  id: string;
  selected: boolean;
  setSelectedFolder: (folderId: string) => void;
};

export const Folder: React.FC<FolderProps> = ({
  name,
  id,
  selected,
  setSelectedFolder,
}) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { name, id },
    type: DragTypes.FOLDER,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        setSelectedFolder(item.id);
      }
    },
  }));

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
    canDrop: (item: any, _monitor) => item.id !== id, // Avoid dropping the folder onto itself!!
  }));

  useEffect(() => {
    preview(getEmptyImage());
  });

  return (
    <div ref={drop}>
      <div ref={drag}>
        <ProjectItem
          type="folder"
          isDragging={isDragging}
          isOver={isOver}
          isSelected={selected}
          name={name}
        />
      </div>
    </div>
  );
};
