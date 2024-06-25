import React from 'react';
import Calendar from './components/Calendar/Calendar';
import './styles/main.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <h1>Calendar for You</h1>
            <Calendar />
        </div>
    );
};

export default App;
