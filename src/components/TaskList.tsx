import { useStore } from "../lib/store";
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
import * as Tabs from "@radix-ui/react-tabs";

const TaskList = () => {
  const { tasks } = useStore();
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
      useStore.setState((state) => {
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
      <Tabs.Root defaultValue="all">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <ul ref={animationParent} className="border border-t-0">
            <Tabs.Content value="all">
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </SortableContext>
            </Tabs.Content>
            <Tabs.Content value="active">
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                {tasks
                  .filter((task) => !task.isComplete)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </SortableContext>
            </Tabs.Content>
            <Tabs.Content value="completed">
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                {tasks
                  .filter((task) => task.isComplete)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </SortableContext>
            </Tabs.Content>
          </ul>
        </DndContext>
        <Tabs.List className="flex justify-center gap-2">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="active">Active</Tabs.Trigger>
          <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
};

export default TaskList;
