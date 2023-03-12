import { useTaskStore, Task } from "../lib/store";

const TaskCard = ({ task }: { task: Task }) => {
  const actions = useTaskStore();

  return (
    <li>
      <input
        type="checkbox"
        checked={task.isComplete}
        onChange={() => actions.update(task.id)}
      />
      <p>{task.text}</p>
      <button onClick={() => actions.delete(task.id)}>delete</button>
    </li>
  );
};

export default TaskCard;
