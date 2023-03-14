import { useStore, Task } from "../lib/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Checkbox from "@radix-ui/react-checkbox";
import { clsx } from "clsx";

const TaskCard = ({ task }: { task: Task }) => {
  const actions = useStore();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between gap-3 border-b bg-white p-4 dark:border-_dt-very-dark-grayish-blue-2 dark:bg-_dt-very-dark-desaturated-blue"
    >
      <Checkbox.Root
        checked={task.isComplete}
        onCheckedChange={() => actions.update(task.id)}
        className="peer flex aspect-square h-5 items-center justify-center rounded-full border focus:outline-none focus:ring-2 focus:ring-_bright-blue dark:border-_dt-very-dark-grayish-blue-2 dark:bg-_dt-very-dark-desaturated-blue"
      >
        <Checkbox.Indicator className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tl from-_lt-check-bg-gradient-2 to-_check-bg-gradient-1">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p
        {...attributes}
        {...listeners}
        className={clsx([
          "flex-1 cursor-grab active:cursor-grabbing dark:text-_dt-light-grayish-blue",
          task.isComplete &&
            "text-_lt-light-grayish-blue line-through dark:text-_dt-very-dark-grayish-blue-1",
        ])}
      >
        {task.text}
      </p>
      <button onClick={() => actions.delete(task.id)} aria-label="delete task">
        <DeleteIcon />
      </button>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={11} height={9}>
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth={2}
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      className="scale-75"
    >
      <path
        fill="#494C6B"
        fillRule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  );
};

export default TaskCard;
