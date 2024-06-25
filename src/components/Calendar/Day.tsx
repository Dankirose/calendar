import React from 'react';
import { loadTasks } from '../../utils/storage';

interface DayProps {
    date: Date;
    onClick: () => void;
    onWeekClick: () => void;
    isHoliday: boolean;
}

const Day: React.FC<DayProps> = ({ date, onClick, onWeekClick, isHoliday }) => {
    const tasks = loadTasks();
    const dateKey = date.toDateString();
    const hasTasks = tasks[dateKey] && tasks[dateKey].length > 0;

    return (
        <div className={`day ${isHoliday ? 'holiday' : ''}`} onClick={onClick}>
            {date.getDate()}
            {hasTasks && <span className="task-indicator">•</span>}
            <button className="week-view-btn" onClick={(e) => { e.stopPropagation(); onWeekClick(); }}>Week</button>
        </div>
    );
};

export default Day;