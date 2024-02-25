// CurrentMeals.js
import React, { useState } from 'react';
import axios from 'axios';
import './currentMeals_style.css';

function CurrentMeals({curridgiven, date, setRefresh, refresh, setDate}){
    // State to store current meal data
    const [currentMeal, setCurrentMeal] = useState({
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        name: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentMeal({ ...currentMeal, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle submitting current meal data here, e.g., send to backend
        console.log('Submitted:', currentMeal);

        
        // Reset form fields after submission
        
        await axios.post('http://localhost:5004/Manual', {id: curridgiven, date: date, currMeal: currentMeal});


        setCurrentMeal({
            calories: '',
            protein: '',
            carbs: '',
            fat: '',
            name: ''
        });

        

        // Add the new meal to the list
        //addMeal(currentMeal);

        // await axios.post('http://localhost:5004/newItem', { name: 'String' });
    };

    const takePicture = async (event) => {
        event.preventDefault();
        console.log('Taking picture');
        console.log(curridgiven);
        await axios.post('http://localhost:5004/takePicture', {id: curridgiven, date: date});
        //setRefresh(refresh+1);
    }

    return (
        <div>
            <h2>Log Your Current Meal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input name="name" value={currentMeal.name} onChange={handleChange} />
                </label>
                <label>
                    Fat (g):
                    <input type="number" name="fat" value={currentMeal.fat} onChange={handleChange} />
                </label>
                <label>
                    Calories:
                    <input type="number" name="calories" value={currentMeal.calories} onChange={handleChange} />
                </label>
                <label>
                    Protein (g):
                    <input type="number" name="protein" value={currentMeal.protein} onChange={handleChange} />
                </label>
                <label>
                    Carbs (g):
                    <input type="number" name="carbs" value={currentMeal.carbs} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <div>Or</div>
            <button onClick={takePicture}>Take a picture!</button>
        </div>
    );
}

export default CurrentMeals;
