import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './coin.css'; 

const CoinTransactiondata = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL_1;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/user/user/get-withdrawal-req`);

        console.log('response:::::::::', response.data.data);

        const data = response.data.data;
        console.log("data:::",data)
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="coin-table">
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>User ID</th>
              <th>Coin Amount</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.createdBy}</td>
                <td>{user.coinAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoinTransactiondata;
