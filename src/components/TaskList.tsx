import { useTaskStore } from "../lib/store";
import CreateTask from "./CreateTask";
import TaskCard from "./TaskCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

const TaskList = () => {
  const { tasks } = useTaskStore();
  const [animationParent] = useAutoAnimate(/** optional config */);

  // drag and drop gestures
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      useTaskStore.setState((state) => {
        const oldIndex = state.tasks.findIndex((task) => task.id === active.id);
        const newIndex = state.tasks.findIndex((task) => task.id === over?.id);

        return {
          tasks: arrayMove(state.tasks, oldIndex, newIndex),
        };
      });
    }
  }

  return (
    <div className="flex max-w-xs flex-col gap-4">
      <CreateTask />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ul ref={animationParent} className="border border-t-0">
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
    </div>
  );
};

export default TaskList;
