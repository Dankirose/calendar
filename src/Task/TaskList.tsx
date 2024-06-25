import React from 'react';

import TaskComponent from './Tasked';
import { Tasked } from '../models/Task';

interface TaskListProps {
    tasks: Tasked[];
    toggleTaskCompletion: (taskId: number) => void;
    deleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTaskCompletion, deleteTask }) => {
    return (
        <ul>
            {tasks.map(task => (
                <TaskComponent
                    key={task.id}
                    task={task}
                    toggleTaskCompletion={toggleTaskCompletion}
                    deleteTask={deleteTask}
                />
            ))}
        </ul>
    );
};

export default TaskList;