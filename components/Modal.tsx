import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks";
import { addNewTask, updateTask } from "@/redux/todoSlice";
import { v4 as uuidv4 } from "uuid";

export function Modal(props: any) {
  const [task, setTask] = useState(props.value || "");
  const dispatch = useAppDispatch();

  const handleChangeInput = (e: any) => {
    setTask(e.target.value);
  };

  const handleSubmit = () => {
    if (props.taskId && props.type === "update-task") {
      dispatch(updateTask({ id: props.taskId, task: task, completed: false }));
      return;
    }
    dispatch(addNewTask({ id: uuidv4(), task: task, completed: false }));
    setTask("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className={`${
          props.type === "add-task" && "w-full mb-2 bg-black text-white"
        }`}
      >
        {props.type === "add-task" ? (
          <Button variant="outline">Add task</Button>
        ) : (
          <Button>
            <AiFillEdit />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {props.type === "add-task" ? "Add new task" : "Update task"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              placeholder="Type here..."
              value={task}
              onChange={handleChangeInput}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {props.type === "add-task" ? (
            <AlertDialogAction onClick={handleSubmit}>Add</AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={handleSubmit}>Update</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
