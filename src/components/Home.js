import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate('/login');
  };

  const onSignUpClick = () => {
    navigate('/Signup'); // Navigate to the signup page
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onLoginClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {!loggedIn && (
          <input
            className="inputButton"
            type="button"
            onClick={onSignUpClick}
            value="Sign up"
            style={{ marginLeft: '10px' }} // Add some spacing between buttons
          />
        )}
        {loggedIn && <div>Your email address is {email}</div>}
      </div>
    </div>
  );
};

export default Home;
