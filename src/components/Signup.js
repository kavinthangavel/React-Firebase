import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const onHomeClick = () => {
    navigate('/');
  }; 
  const onButtonClick = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    let isValid = true;

    if ('' === name) {
      setNameError('Please enter your name');
      isValid = false;
    }

    if ('' === email) {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password');
      isValid = false;
    } else if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user;
          console.log('User created successfully:', user);
          navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Signup error:", errorCode, errorMessage);
          if (errorCode === 'auth/email-already-in-use') {
            setEmailError('Email is already in use.');
          } else {
            setEmailError('Failed to sign up. Please try again.');
          }
        });
      }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          className={'inputBox'}
        />
        <button 
          onClick={() => setShowPassword(!showPassword)} 
          className="togglePasswordButton"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
        <label className="errorLabel">{confirmPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign up'} />
      </div>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onHomeClick} value={'Back'} />
      </div>
    </div>
  );
};

export default Signup;
