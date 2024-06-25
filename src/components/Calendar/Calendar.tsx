import React, { useState, useEffect } from 'react';
import Day from './Day';
import TaskModal from './TaskModal';
import WeekView from './WeekView';
import { fetchHolidays } from '../../utils/api';

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [holidays, setHolidays] = useState<number[]>([]);
    const [view, setView] = useState<'day' | 'week'>('day');
    const today = new Date();

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateDays = (month: number, year: number) => {
        const days = [];
        for (let i = 1; i <= daysInMonth(month, year); i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const days = generateDays(today.getMonth(), today.getFullYear());

    useEffect(() => {
        const fetchAndSetHolidays = async () => {
            const holidays = await fetchHolidays(today.getFullYear(), today.getMonth() + 1);
            setHolidays(holidays);
        };

        fetchAndSetHolidays();
    }, [today]);

    const isHoliday = (day: number) => holidays.includes(day);

    const handleDayClick = (day: Date) => {
        setSelectedDate(day);
        setView('day');
    };

    const handleWeekClick = (day: Date) => {
        setSelectedDate(day);
        setView('week');
    };

    return (
        <div className="calendar">
            {days.map((day, index) => (
                <Day
                    key={index}
                    date={day}
                    onClick={() => handleDayClick(day)}
                    onWeekClick={() => handleWeekClick(day)}
                    isHoliday={isHoliday(day.getDate())}
                />
            ))}
            {selectedDate && view === 'day' && (
                <TaskModal date={selectedDate} onClose={() => setSelectedDate(null)} />
            )}
            {selectedDate && view === 'week' && (
                <WeekView date={selectedDate} onClose={() => setSelectedDate(null)} />
            )}
        </div>
    );
};

export default Calendar;