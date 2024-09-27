import React, { useState, useEffect } from 'react';
import './Dropdown.css';
import axios from 'axios';


export default function Location(){
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
  
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() =>{

    })

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await axios.get('https://crio-location-selector.onrender.com/countries');
            console.log(response.data)
            setCountries(response.data);
          } catch (error) {
            console.error('Error fetching countries', error);
          }
        };
        fetchCountries();
      }, []);
    
      useEffect(() => {
        if (selectedCountry) {
          const fetchStates = async () => {
            try {
              const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
              setStates(response.data);
              setCities([]); 
              console.log(response.data)
            } catch (error) {
              console.error('Error fetching states', error);
            }
          };
          fetchStates();
        }
      }, [selectedCountry]);
    
      
      useEffect(() => {
        if (selectedState) {
          const fetchCities = async () => {
            try {
              const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
              setCities(response.data);
              console.log(response.data)
            } catch (error) {
              console.error('Error fetching cities', error);
            }
          };
          fetchCities();
        }
      }, [selectedState]);

    return(
        <div>
        <h1>Select Location</h1>

            <div>
                
                <select
                    value={selectedCountry}
                    onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedState('');
                    setSelectedCity('');
                    }}
                >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                    ))}
                </select>
             
                <select
                    value={selectedState}
                    onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity('');
                    }}
                    disabled={!selectedCountry}
                >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                    ))}
                </select>
                
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                >
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                    ))}
                </select>
            </div>

            <div>
                {selectedCity && <p>You selected <b>{selectedCity}</b>, {selectedState}, {selectedCountry}</p>}
            </div>
        </div>
    );
}