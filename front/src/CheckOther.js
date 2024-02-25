import NutritionScanner from './NutritionScanner';
import React, { useState } from 'react';
import Calendar2 from './Calendar';
import CurrentMeals from './CurrentMeals';
import './header_styles.css';
function CheckOther({curridgiven, setDate, date, setRefresh, refresh}){
    console.log(date);
    return(
        <div style={{ textAlign: 'center' }}>
             <h1 style={{ marginBottom: '20px', color: '#4CAF50' }}>NutriHub</h1>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <Calendar2 setDate={setDate} date={date} curridgiven={curridgiven} refresh={refresh}/>
            <CurrentMeals curridgiven={curridgiven} date={date} setDate={setDate} setRefresh={setRefresh} refresh={refresh}/>
        </div>
        </div>
    )
}
export default CheckOther;