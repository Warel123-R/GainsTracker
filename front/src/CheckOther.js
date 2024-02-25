import NutritionScanner from './NutritionScanner';
import Calendar2 from './Calendar';
import CurrentMeals from './CurrentMeals';
function CheckOther({curridgiven, setDate, date, setRefresh, refresh}){
    console.log(date);
    return(
        <div>
             <h1>NutriHub</h1>
            <NutritionScanner /> 
            <Calendar2 setDate={setDate} date={date} curridgiven={curridgiven}/>
            <CurrentMeals curridgiven={curridgiven} date={date} setRefresh={setRefresh} refresh={refresh}/>
        </div>
    )
}
export default CheckOther;