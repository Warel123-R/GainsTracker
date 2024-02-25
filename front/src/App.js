import React, { useState, useEffect} from 'react';
import './CurrentMeals.css';
import Login from './Login';
import CheckOther from './CheckOther';

const App = () => {
    const [isloggedin, setIsLoggedIn]= useState(false);
    const [onlyOnce, setOnlyOnce] = useState(false);
    const [googleId, setGoogleId] = useState(null);
    useEffect(() => {
        // Function to parse URL and extract query parameters
        const getQueryParam = (name) => {
            const params = new URLSearchParams(window.location.search);
            return params.get(name);
        };

        // Extract Google ID from the URL query parameter
        const extractedGoogleId = getQueryParam('googleId');
        console.log(extractedGoogleId);
        // If Google ID is found, store it
        if (extractedGoogleId) {
            setGoogleId(extractedGoogleId);
            setIsLoggedIn(true);
            console.log(googleId);
            //window.location.href = 'http://localhost:3000';
        }
    }, []);


    return (
        <div>
            {isloggedin ? <div/>:<Login/>}
            {isloggedin ? <CheckOther/>: <div></div>}
        </div>
    );
};

export default App;
