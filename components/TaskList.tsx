import { TaskState } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal } from "@/components/Modal";
import { useAppDispatch } from "@/hooks";
import { deleteTask, updateTask } from "@/redux/todoSlice";

import { AiFillDelete } from "react-icons/ai";

export function TaskList({ taskList }: { taskList: TaskState[] }) {
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteTask({ id }));
  };
  const handleUpdate = (item: TaskState) => {
        dispatch(updateTask({ id: item.id, task: item.task, completed: item.completed? false : true  }));
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {taskList.map((item: TaskState) => (
        <div
          key={item.id}
          className="w-full flex justify-between items-center cursor-pointer p-2 mb-2 rounded-lg border-2 border-slate-400 hover:opacity-50"
        >
          <div className="flex items-center">
            <Checkbox checked={item.completed} onCheckedChange={() => handleUpdate(item)}/>
            <p className={`${item.completed && 'line-through'} ml-2`}>{item.task}</p>
          </div>
          <div className="">
            <Button onClick={() => handleDelete(item.id)} className="mr-2">
              <AiFillDelete />
            </Button>
            <Modal
              type="update-task"
              value={item.task}
              taskId={item.id}
            ></Modal>
          </div>
        </div>
      ))}
    </div>
  );
}
