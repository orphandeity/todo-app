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
  const { tasks, clear } = useStore();
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
    <div className="flex flex-col gap-4 text-xs">
      <CreateTask />
      <Tabs.Root defaultValue="all">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="overflow-hidden rounded-md bg-white shadow-lg">
            <ul ref={animationParent}>
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
            <fieldset className="flex justify-between px-6 py-4">
              <p>
                <span>{tasks.filter((task) => !task.isComplete).length}</span>{" "}
                items left
              </p>
              <button onClick={() => clear()}>Clear Completed</button>
            </fieldset>
          </div>
        </DndContext>
        <Tabs.List className="mt-4 flex justify-center gap-2 rounded-md bg-white py-3 text-sm font-semibold shadow-lg">
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="active">Active</Tabs.Trigger>
          <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <p className="mx-auto mt-8">Drag and drop to reorder list</p>
    </div>
  );
};

export default TaskList;
