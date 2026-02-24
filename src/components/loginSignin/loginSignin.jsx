import React, { useState } from 'react';
import './loginSignin.css';
import user_icon from '../assets/user.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
const LoginSignin = ({ initialAction = "Login", onBack }) => {
  const [action, setAction] = useState(initialAction);
  const [isForgot, setIsForgot] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };
  const validateField = (name, value) => {
    if (name === 'name') return validateName(value);
    if (name === 'email') return validateEmail(value);
    if (name === 'password') return validatePassword(value);
    return '';
  };
  const handleSubmit = () => {
    const newErrors = {
      name: action === 'Sign Up' ? validateName(fields.name) : '',
      email: validateEmail(fields.email),
      password: validatePassword(fields.password),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors) {
      console.log('Form submitted:', fields);
    }
  };
  const handleForgotSubmit = () => {
    const emailErr = validateEmail(fields.email);
    setErrors((prev) => ({ ...prev, email: emailErr }));
    setTouched((prev) => ({ ...prev, email: true }));
    if (!emailErr) {
      setForgotSuccess(true);
    }
  };
  const switchAction = (newAction) => {
    setAction(newAction);
    setErrors({ name: '', email: '', password: '' });
    setTouched({ name: false, email: false, password: false });
    setFields({ name: '', email: '', password: '' });
  };
  const handleBackFromForgot = () => {
    setIsForgot(false);
    setForgotSuccess(false);
    setErrors({ name: '', email: '', password: '' });
    setTouched({ name: false, email: false, password: false });
    setFields({ name: '', email: '', password: '' });
  };
  const ErrorMsg = ({ msg }) =>
    msg ? <div className="error-msg">⚠ {msg}</div> : null;
  const validateEmail=(val)=>{
    if(!val) return 'Email is required';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address.'; 
    return '';};
    const validatePassword = (val) => {
  if (!val) return 'Password is required.';
  if (val.length < 8) return 'Password must be at least 8 characters.';
  return '';};
const validateName = (val) => {
  if (!val.trim()) return 'Full name is required.';
  if (val.trim().length < 3) return 'Name must be at least 3 characters.';
  return '';};
  return (
    <div className="container">
      <div className="header">
        <div className="text">{isForgot ? 'Forgot Password' : action}</div>
        <div className="underline"></div>
      </div>
      {!isForgot ? (
        <>
          <div className="inputs">
            {action === 'Login' ? null : (
              <div className="input">
                <img src={user_icon} alt="User" />
                <input type="text" placeholder="Full name" name="name" value={fields.name}onChange={handleChange}onBlur={handleBlur} />
                <ErrorMsg msg={errors.name} />
              </div>
            )}
            <div className="input">
              <img src={email_icon} alt="Email" />
              <input type="email" placeholder="Email address" name="email"  value={fields.email} onChange={handleChange} onBlur={handleBlur} />
              <ErrorMsg msg={errors.email} />
            </div>
            <div className="input">
              <img src={password_icon} alt="Password" />
              <input type="password" placeholder="Password" name="password" value={fields.password} onChange={handleChange}onBlur={handleBlur} />
              <ErrorMsg msg={errors.password} />
            </div>
          </div>
          {action === 'Sign Up' ? null : (
            <div className="forgot-password">
              <span onClick={() => setIsForgot(true)}>Forgot Password?</span>
            </div>
          )}
          <div className="submit-container">
            <button className={action === 'Login' ? 'submit gray' : 'submit'}onClick={()=>{switchAction('Sign Up');}}>Sign Up</button>
            <button className={action === 'Sign Up' ? 'submit gray' : 'submit'}onClick={()=>{switchAction('Login');}}>Login</button>
          </div>
        </>
      ) : (
        <>
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="Email" />
              <input type="email" placeholder="Enter your email" />
            </div>
          </div>
          {forgotSuccess && (
            <p style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>✅ Password reset link sent to your email</p>)}
          <div className="submit-container">
            <button className="submit"  onClick={handleSubmit}>Send </button>
            <button className="submit gray" onClick={() => setIsForgot(false)}>Back</button>
          </div>
        </>
      )}
    </div>
  );
};
export default LoginSignin;