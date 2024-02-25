import React, { useState } from 'react';
import './CurrentMeals.css';
import Login from './Login';
import NutritionScanner from './NutritionScanner';
import Calendar2 from './Calendar';
import CurrentMeals from './CurrentMeals';
const App = () => {
    //NutritionScanner is the Ayush part implementation
    return (
        <div>
            <Login/>
            <h1>NutriHub</h1>
            <NutritionScanner /> 
            <Calendar2 />
            <CurrentMeals />
        </div>
    );
};

export default App;
