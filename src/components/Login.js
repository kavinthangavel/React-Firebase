import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import './Login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();


  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');
    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }
  
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Login successful:", user.uid);
        navigate('/'); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error("Login error:", errorCode, errorMessage);
        if (errorCode === 'auth/user-not-found') {
          setEmailError('No user found with this email.');
        } else if (errorCode === 'auth/wrong-password') {
          setPasswordError('Incorrect password.');
        } else {
          setEmailError('Failed to login. Please try again.');
        }
      });
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <button 
          onClick={() => setShowPassword(!showPassword)} 
          className="togglePasswordButton"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  );
};

export default Login;
