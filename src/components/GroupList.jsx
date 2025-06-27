import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import Group from "./Group";
import {
  addRow,
  removeRow,
  updateRow,
  renameGroup,
  removeGroup,
  reorderGroups,
} from "../store/boardSlice";

const GroupsList = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    dispatch(
      reorderGroups({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  if (board.groups.length === 0) {
    return (
      <p className="text-center text-gray-500 italic mb-6">
        No groups yet. Click "+ Add Group" to create one.
      </p>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="groups">
        {(dropProvided) => (
          <div
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {board.groups.map((group, index) => (
              <Draggable
                key={group.id}
                draggableId={group.id}
                index={index}
              >
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className="mb-4"
                  >
                    <Group
                      group={group}
                      onUpdateRow={(rowIndex, key, value) =>
                        dispatch(updateRow({ groupId: group.id, rowIndex, key, value }))
                      }
                      onAddRow={() => dispatch(addRow(group.id))}
                      onRemoveRow={(index) =>
                        dispatch(removeRow({ groupId: group.id, index }))
                      }
                      onRenameGroup={(title) =>
                        dispatch(renameGroup({ id: group.id, title }))
                      }
                      onRemoveGroup={() => dispatch(removeGroup(group.id))}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default GroupsList;
 