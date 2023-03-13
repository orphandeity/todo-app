import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";

export interface Task {
  id: string;
  text: string;
  isComplete: boolean;
}

interface TaskState {
  tasks: Task[];
  create: (text: string) => void;
  update: (id: string) => void;
  delete: (id: string) => void;
  clear: () => void;
}

const initialTasks = [
  {
    id: nanoid(),
    text: "Complete online JavaScript course",
    isComplete: true,
  },
  { id: nanoid(), text: "Jog around the park 3x", isComplete: false },
  { id: nanoid(), text: "10 minutes meditation", isComplete: false },
  { id: nanoid(), text: "Read for 1 hour", isComplete: false },
  { id: nanoid(), text: "Pick up groceries", isComplete: false },
  {
    id: nanoid(),
    text: "Complete Todo App on Frontend Mentor",
    isComplete: false,
  },
];

export const useStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      // create a new todo
      create: (text) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: nanoid(),
              text,
              isComplete: false,
            },
          ],
        })),
      // toggle status of todo
      update: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
          ),
        })),
      // delete todo
      delete: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      // clear completed todos
      clear: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.isComplete),
        })),
    }),
    /**
     * persist to localStorage
     */
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
