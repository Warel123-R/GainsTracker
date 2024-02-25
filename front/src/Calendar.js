import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
function Calendar2({setDate, date, curridgiven}){
    // State to store selected date and past meal data
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pastMeals, setPastMeals] = useState([]);

    const handleDateClick = (dategiven) => {
        setSelectedDate(dategiven);
        setDate(dategiven);
    };
    const mealsForSelectedDate = pastMeals.filter((meal) => {
        const mealDate = new Date(meal.date);
        return mealDate.toDateString() === selectedDate.toDateString();
    });

    useEffect(() => {
        const fetchUserFoods = async () => {
          try {
            const response = await axios.get('http://localhost:5004/api/userfoods', {
              params: {
                id: curridgiven,
                date: date
              }
            });
            const meals = response.data.map(foodString => {
                const validJsonString = foodString.replace(/'/g, '"').replace(/None/g, 'null');
                const data = JSON.parse(validJsonString);
                return {
                  name: data.product_name,
                  date: selectedDate.toDateString(),
                  calories: data.nutriments['energy-kcal'],
                  protein: data.nutriments.proteins,
                  carbs: data.nutriments.carbohydrates,
                  fat: data.nutriments['saturated-fat']
                };
              });
            
            setPastMeals(meals);

          } catch (error) {
            console.error('Error fetching user foods:', error);
          }
        };
        fetchUserFoods();
    }, [date]);

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