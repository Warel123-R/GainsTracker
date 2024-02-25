import NutritionScanner from './NutritionScanner';
import Calendar2 from './Calendar';
import CurrentMeals from './CurrentMeals';
function CheckOther(){
    return(
        <div>
             <h1>NutriHub</h1>
            <NutritionScanner /> 
            <Calendar2 />
            <CurrentMeals />
        </div>
    )
}
export default CheckOther;