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
}

export const useStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        { id: nanoid(), text: "eat", isComplete: false },
        { id: nanoid(), text: "sleep", isComplete: false },
        { id: nanoid(), text: "code", isComplete: true },
      ],
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
