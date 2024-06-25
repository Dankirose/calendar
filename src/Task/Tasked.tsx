import React from 'react';
import { Tasked } from '../models/Task';


interface TaskProps {
    task: Tasked;
    toggleTaskCompletion: (taskId: number) => void;
    deleteTask: (taskId: number) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, toggleTaskCompletion, deleteTask }) => {
    return (
        <li>
            <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTaskCompletion(task.id)}
            >
                {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
};

export default TaskComponent;