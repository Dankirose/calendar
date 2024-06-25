import React, { useState, useEffect } from 'react';
import TaskList from '../../Task/TaskList';
import { Tasked } from '../../models/Task';
import { loadTasks, saveTasks } from '../../utils/storage';
import { getWeekRange } from '../../utils/date';

interface WeekViewProps {
    date: Date;
    onClose: () => void;
}

const WeekView: React.FC<WeekViewProps> = ({ date, onClose }) => {
    const [tasks, setTasks] = useState<{ [key: string]: Tasked[] }>({});
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        const tasksFromStorage = loadTasks();
        const { start, end } = getWeekRange(date);
        const weekTasks: { [key: string]: Tasked[] } = {};

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toDateString();
            if (tasksFromStorage[dateKey]) {
                weekTasks[dateKey] = tasksFromStorage[dateKey];
            } else {
                weekTasks[dateKey] = [];
            }
        }

        setTasks(weekTasks);
    }, [date]);

    const addTask = (dateKey: string) => {
        if (newTask.trim()) {
            const newTasks = [...tasks[dateKey], { id: Date.now(), text: newTask, completed: false }];
            const updatedTasks = { ...tasks, [dateKey]: newTasks };
            setTasks(updatedTasks);
            saveTasksToLocalStorage(updatedTasks);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (dateKey: string, taskId: number) => {
        const newTasks = tasks[dateKey].map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const updatedTasks = { ...tasks, [dateKey]: newTasks };
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const deleteTask = (dateKey: string, taskId: number) => {
        const newTasks = tasks[dateKey].filter(task => task.id !== taskId);
        const updatedTasks = { ...tasks, [dateKey]: newTasks };
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const saveTasksToLocalStorage = (tasks: { [key: string]: Tasked[] }) => {
        saveTasks(tasks);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Tasks for the week</h2>
                {Object.keys(tasks).map(dateKey => (
                    <div key={dateKey} className="week-day-tasks">
                        <h3>{dateKey}</h3>
                        <TaskList
                            tasks={tasks[dateKey]}
                            toggleTaskCompletion={(taskId) => toggleTaskCompletion(dateKey, taskId)}
                            deleteTask={(taskId) => deleteTask(dateKey, taskId)}
                        />
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="New task"
                        />
                        <button onClick={() => addTask(dateKey)}>Add Task</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekView;