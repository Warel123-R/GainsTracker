import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
function Calendar2({setDate, date, curridgiven, refresh}){
    // State to store selected date and past meal data
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pastMeals, setPastMeals] = useState([]);
    const [currentMealIndex, setCurrentMealIndex] = useState(0);
    const [myrefresh, setmyrefresh] = useState('');
    const handleDateClick = (dategiven) => {
        setSelectedDate(dategiven);
        setDate(dategiven);
    };
    

    // Filter past meals for the selected date
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

    useEffect(() => {
        setmyrefresh(myrefresh+1);
    }, [refresh]);

    const handlePrevClick = () => {
        if (currentMealIndex > 0) {
            setCurrentMealIndex(currentMealIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentMealIndex < mealsForSelectedDate.length - 1) {
            setCurrentMealIndex(currentMealIndex + 1);
        } else {
            setCurrentMealIndex(mealsForSelectedDate.length); // Move to total card when reaching end of meals
        }
    };

    // Calculate total statistics for all meals on the selected date
    const totalName = 'Total'
    const totalCalories = mealsForSelectedDate.reduce((total, meal) => total + meal.calories, 0);
    const totalProtein = mealsForSelectedDate.reduce((total, meal) => total + meal.protein, 0);
    const totalCarbs = mealsForSelectedDate.reduce((total, meal) => total + meal.carbs, 0);
    const totalFat = mealsForSelectedDate.reduce((total, meal) => total + meal.fat, 0);
    // const totalMeal = {
    //     date: 'total',
    //     calories: totalCalories,
    //     protein: totalProtein,
    //     carbs: totalCarbs,
    //     fat: totalFat,
    //     name: totalName
    // };
    // setPastMeals(prevMeals => [...prevMeals, totalMeal]);

    return (
        <div>
            <h2>Meals Calendar</h2>
            <Calendar
                onClickDay={handleDateClick}
                value={selectedDate}
            />
            <h3>Meals for {selectedDate.toDateString()}</h3>
            <div className="meal-cards-container">
                {mealsForSelectedDate.length > 0 && currentMealIndex < mealsForSelectedDate.length && (
                    <div className="meal-card">
                        <h2>{mealsForSelectedDate[currentMealIndex].name}</h2>
                        <p>Date: {mealsForSelectedDate[currentMealIndex].date}</p>
                        <p>Calories: {mealsForSelectedDate[currentMealIndex].calories}</p>
                        <p>Protein: {mealsForSelectedDate[currentMealIndex].protein}g</p>
                        <p>Carbs: {mealsForSelectedDate[currentMealIndex].carbs}g</p>
                        <p>Fat: {mealsForSelectedDate[currentMealIndex].fat}g</p>
                    </div>
                )}
                {currentMealIndex === mealsForSelectedDate.length && (
                    <div className="total-card">
                        <h2>Total</h2>
                        <p>Calories: {totalCalories}</p>
                        <p>Protein: {totalProtein}g</p>
                        <p>Carbs: {totalCarbs}g</p>
                        <p>Fat: {totalFat}g</p>
                    </div>
                )}
                <div className="arrow-buttons">
                    <button onClick={handlePrevClick} disabled={currentMealIndex === 0}>Prev</button>
                    <button onClick={handleNextClick} disabled={currentMealIndex >= mealsForSelectedDate.length}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Calendar2;
