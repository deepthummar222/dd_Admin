import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL_1;
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const pathdata = localStorage.getItem("data")
  const parsedData = JSON.parse(pathdata);

  useEffect(() => {
    let sessionData = sessionStorage.getItem('token');
    if (sessionData !== null) {
      navigate('/starter');
      if (parsedData.to == parsedData.from) {
      }
      else {
        window.location.reload()
        console.log("reloaddata")
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const requestBody = {
        mobileNumber: String(mobileNumber),
        password: String(password),
      };

      const token = sessionStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/v1/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
     
      if (response.ok) {
        const data = await response.json();
       
        if (data && data.data && data.data.tokens && data.data.tokens.access) {
          const token = data.data.tokens.access.token;
          const token1 = data.data;
          localStorage.setItem("data::::::",JSON.stringify(data.data.user.id))
          sessionStorage.setItem('token', token);

          toast.success('Login Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            navigate('/starter');
            window.location.reload();
          }, 3000);
        } else {
          toast.error('Invalid response from the server', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error('Invalid Mobile Number or Password', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("error::::", error);

      // Handle errors gracefully
      toast.error('An error occurred during login', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginHeader">Login</h1>
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => {
              const enteredValue = e.target.value;
              const onlyNumbers = enteredValue.replace(/\D/g, '');
              setMobileNumber(onlyNumbers);
            }}
            required
            className="loginInput"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="loginInput"
          />
          <div onClick={handleTogglePassword} className="showicone">
            {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708" />
            </svg>}
          </div>
        </div>
        <div>
          <button type="submit" className="loginButton">
            Login
          </button>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}
//7698387947
//deepTheAdmin@123
export default LoginPage;
