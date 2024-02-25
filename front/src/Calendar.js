import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';

function Calendar2(){
    // State to store selected date and past meal data
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pastMeals, setPastMeals] = useState([
        { date: '2024-02-22', calories: 300, protein: 25, carbs: 40, fat: 15, name: 'Granola'},
        { date: '2024-02-23', calories: 350, protein: 30, carbs: 45, fat: 17, name: 'Chips' },
        // Add more past meal data as needed
    ]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    // Filter past meals for the selected date
    const mealsForSelectedDate = pastMeals.filter((meal) => {
        const mealDate = new Date(meal.date);
        return mealDate.toDateString() === selectedDate.toDateString();
    });

    return (
        <div>
            <h2>Meals Calendar</h2>
            <Calendar
                onClickDay={handleDateClick}
                value={selectedDate}
            />
            <h3>Meals for {selectedDate.toDateString()}</h3>
            <ul>
                {mealsForSelectedDate.map((meal, index) => (
                    <li key={index}>
                        <p>Name: {meal.name}</p>
                        <p>Date: {meal.date}</p>
                        <p>Calories: {meal.calories}</p>
                        <p>Protein: {meal.protein}g</p>
                        <p>Carbs: {meal.carbs}g</p>
                        <p>Fat: {meal.fat}g</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Calendar2;