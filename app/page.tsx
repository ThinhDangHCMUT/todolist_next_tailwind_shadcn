"use client";

import { Modal } from "@/components/Modal";
import { TaskList } from "@/components/TaskList";
import { useAppSelector } from "@/hooks";

export default function Home() {
  const taskList = useAppSelector((state) => state.todo.taskList);
  console.log(taskList);
  return (
    <div className="w-[600px] mx-auto flex flex-col justify-center items-center">
      <h1 className="my-6 font-bold text-2xl">To do list</h1>
      <Modal type="add-task" />
      <TaskList taskList={taskList} />
    </div>
  );
}
