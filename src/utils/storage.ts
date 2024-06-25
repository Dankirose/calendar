import { Tasked } from '../models/Task';

const STORAGE_KEY = 'tasks';

export const loadTasks = (): { [key: string]: Tasked[] } => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : {};
};

export const saveTasks = (tasks: { [key: string]: Tasked[] }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};