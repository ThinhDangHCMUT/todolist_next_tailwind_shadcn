import { TaskState } from '@/types/types';
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Modal } from "@/components/Modal"
import { useAppDispatch } from '@/hooks';
import { deleteTask } from '@/redux/todoSlice';

import { 
    AiFillDelete,
    AiFillEdit
 } from 'react-icons/ai';


export function TaskList({ taskList}: { taskList: TaskState[]}) {
    const dispatch = useAppDispatch()
    const handleDelete = (id: string) => {
        dispatch(deleteTask({id}))
    }
    return(
        <div className='w-[600px] bg-slate-300 flex flex-col items-center justify-center'>
        {
            taskList.map((item: TaskState) => (
                <div key={item.id} className='w-full flex justify-between items-center cursor-pointer p-2'>
                    <div className='flex items-center'>
                        <Checkbox />
                        <p className='ml-2'>{item.task}</p>  
                    </div>
                    <div>
                        <Button onClick={() => handleDelete(item.id)}>
                            <AiFillDelete />
                        </Button>
                        <Modal type="update-task" value={item.task} taskId={item.id}>
                        </Modal>
                    </div>
                </div>
            ))
        }
        </div>
    )
}