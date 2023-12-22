import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const Coinvalue = () => {
  const [users, setUsers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL_1;


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/admin/user/coinvalue/64f2d98f58f48b089523dfa7`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      
        }

        const data = await response.json();
        setUsers(data.data);
        setInputValue(data.data.oneRsValueInCoin.toString());
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsInputChanged(true)
  };

  const handleUpdateClick = async () => {
    try {
      const numericInputValue = parseFloat(inputValue);
      setIsInputChanged(false)
      if (isNaN(numericInputValue)) {
        throw new Error('Invalid input. Please enter a valid number.');
      }

      const response = await fetch(`${apiUrl}/api/v1/admin/user/coinvalue/64f2d98f58f48b089523dfa7`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: numericInputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if(data !== ' '){
        toast.success('Value Update Successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setUsers(data.data);
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div>
      {Object.keys(users).length > 0 ? (
        <div>

          <label htmlFor="coinValueInput" style={{ marginRight: "10px" }}>1 INR =</label>
          <input
            style={{
              borderRadius: "10px"
            }}
            type="text"
            id="coinValueInput"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdateClick} style={{
            border:"1px solid white",
            borderRadius: "10px",
            backgroundColor: isInputChanged ? "#2962ff" : "gray", 
            color: isInputChanged ? "white" : "black", 
            opacity: isInputChanged ? "100%" : "30%", 
            
            marginLeft:"10px"
          }} disabled={!isInputChanged || !inputValue }
          >Update Value</button>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default Coinvalue;
