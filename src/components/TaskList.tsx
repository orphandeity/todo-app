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
import { useWindowSize } from "../lib/useWindowSize";

const TaskList = () => {
  const windowSize = useWindowSize();

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
    <div className="flex flex-col gap-4 text-xs text-_lt-very-dark-grayish-blue desktop:text-base">
      <CreateTask />
      <Tabs.Root defaultValue="all">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="overflow-hidden rounded-md shadow-lg">
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
            <fieldset className="flex justify-between bg-white px-6 py-4 text-_lt-dark-grayish-blue dark:bg-_dt-very-dark-desaturated-blue dark:text-_dt-very-dark-grayish-blue-1 desktop:text-sm">
              <p>
                <span>{tasks.filter((task) => !task.isComplete).length}</span>{" "}
                items left
              </p>
              {windowSize.width >= 1440 && <TabList />}
              <button
                onClick={() => clear()}
                className="hover:text-_lt-very-dark-grayish-blue dark:hover:text-_dt-light-grayish-blue-hover"
              >
                Clear Completed
              </button>
            </fieldset>
          </div>
        </DndContext>
        {windowSize.width < 1440 && <TabList />}
      </Tabs.Root>
      <p className="mx-auto mt-8 text-sm text-_lt-dark-grayish-blue dark:text-_dt-very-dark-grayish-blue-1">
        Drag and drop to reorder list
      </p>
    </div>
  );
};

const TabList = () => {
  return (
    <Tabs.List className="mt-4 flex justify-center gap-4 rounded-md bg-white py-3 text-sm font-semibold text-_lt-dark-grayish-blue shadow-lg dark:bg-_dt-very-dark-desaturated-blue dark:text-_dt-dark-grayish-blue desktop:mt-0 desktop:py-0 desktop:shadow-none">
      <Tabs.Trigger
        value="all"
        className="hover:text-_lt-very-dark-grayish-blue active:text-_lt-very-dark-grayish-blue data-[state=active]:text-_bright-blue dark:hover:text-_dt-light-grayish-blue-hover"
      >
        All
      </Tabs.Trigger>
      <Tabs.Trigger
        value="active"
        className="hover:text-_lt-very-dark-grayish-blue active:text-_lt-very-dark-grayish-blue data-[state=active]:text-_bright-blue dark:hover:text-_dt-light-grayish-blue-hover"
      >
        Active
      </Tabs.Trigger>
      <Tabs.Trigger
        value="completed"
        className="hover:text-_lt-very-dark-grayish-blue active:text-_lt-very-dark-grayish-blue data-[state=active]:text-_bright-blue dark:hover:text-_dt-light-grayish-blue-hover"
      >
        Completed
      </Tabs.Trigger>
    </Tabs.List>
  );
};

export default TaskList;
