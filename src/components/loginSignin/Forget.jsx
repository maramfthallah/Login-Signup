import React from 'react';
import './loginSignin.css'; // tu peux réutiliser le même CSS
import email_icon from '../assets/email.png';
const Forget = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="text">Forgot Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Enter your email to reset password' />
        </div>
      </div>
      <div className="submit-container">
        <button className="submit">Send</button>
      </div>
    </div>
  );
};
export default Forget
