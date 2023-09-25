"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/Modal";
import { TaskList } from "@/components/TaskList";
import { useAppSelector } from "@/hooks";
import { useAppDispatch } from "@/hooks";
import {
  chooseAllTask,
  clearAllTasks,
  removeChooseAllTask,
} from "@/redux/todoSlice";

export default function Home() {
  const [flag, setFlag] = useState(false);
  const taskList = useAppSelector((state) => state.todo.taskList);
  const dispatch = useAppDispatch();
  const handleChooseAll = () => {
    if (flag) dispatch(removeChooseAllTask());
    else dispatch(chooseAllTask());
    setFlag((item) => !item);
  };
  const handleClealAllTask = () => {
    dispatch(clearAllTasks());
    setFlag((item) => !item);
  };
  console.log(taskList);
  return (
    <div className="w-[600px] mx-auto flex flex-col justify-center items-center">
      <h1 className="my-6 font-bold text-2xl">To do list</h1>
      <Modal type="add-task" />
      <TaskList taskList={taskList} />
      {!flag ? (
        <Button variant="link" className="mr-auto" onClick={handleChooseAll}>
          Choose all tasks
        </Button>
      ) : (
        <div>
          <Button variant="link" onClick={handleChooseAll}>
            Remove choose all tasks
          </Button>
          <Button onClick={handleClealAllTask}>DELETE</Button>
        </div>
      )}
    </div>
  );
}
