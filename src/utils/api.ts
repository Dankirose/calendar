import axios from 'axios';

const API_KEY = 'cvDilwaK6pgKMLK20Rxas3Mo0t9YVoyI'; 

export const fetchHolidays = async (year: number, month: number): Promise<number[]> => {
    try {
        const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
            params: {
                api_key: API_KEY,
                country: 'RU',
                year,
                month
            }
        });

        const holidays = response.data.response.holidays.map((holiday: any) => {
            return new Date(holiday.date.iso).getDate();
        });

        return holidays;
    } catch (error) {
        console.error('Error fetching holidays:', error);
        return [];
    }
};