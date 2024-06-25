import React, { useState, useEffect } from 'react';
import { Tasked } from '../../models/Task';
import { loadTasks, saveTasks } from '../../utils/storage';
import TaskList from '../../Task/TaskList';

interface TaskModalProps {
    date: Date;
    onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ date, onClose }) => {
    const [tasks, setTasks] = useState<Tasked[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        const tasksFromStorage = loadTasks();
        const dateKey = date.toDateString();
        setTasks(tasksFromStorage[dateKey] || []);
    }, [date]);

    const addTask = () => {
        if (newTask.trim()) {
            const newTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
            setTasks(newTasks);
            saveTasksToLocalStorage(newTasks);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (taskId: number) => {
        const newTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
        saveTasksToLocalStorage(newTasks);
    };

    const deleteTask = (taskId: number) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
        saveTasksToLocalStorage(newTasks);
    };

    const saveTasksToLocalStorage = (tasks: Tasked[]) => {
        const tasksFromStorage = loadTasks();
        const dateKey = date.toDateString();
        tasksFromStorage[dateKey] = tasks;
        saveTasks(tasksFromStorage);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Tasks for {date.toDateString()}</h2>
                <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskModal;