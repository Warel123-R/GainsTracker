import NutritionScanner from './NutritionScanner';
import React, { useState } from 'react';
import Calendar2 from './Calendar';
import CurrentMeals from './CurrentMeals';
import './header_styles.css';
function CheckOther(){
    const [meals, setMeals] = useState([
        { date: '2024-02-22', calories: 300, protein: 25, carbs: 40, fat: 15, name: 'Granola' },
        { date: '2024-02-22', calories: 350, protein: 30, carbs: 45, fat: 17, name: 'Chips' },
        // Add more past meal data as needed
    ]);


    const addMeal = (meal) => {
        setMeals([meal, ...meals]);
    };
    return(
        <div style={{ textAlign: 'center' }}>
             <h1 style={{ marginBottom: '20px', color: '#4CAF50' }}>NutriHub</h1>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <Calendar2 meals={meals}/>
            <CurrentMeals addMeal={addMeal}/>
        </div>
        </div>
    )
}
export default CheckOther;