
import { useState } from 'react';
import { login, register } from '../api';

export default function Login({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCreateUser, setIsCreateUser] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter your username and password');
      return;
    }

    try {

      if (isCreateUser) {

        // CREATE USER
        await register(username, password);

        setError('');

        alert('User created successfully! Please login.');

        // Switch back to Login
        setIsCreateUser(false);

        // Clear fields
        setUsername('');
        setPassword('');

      } else {

        // LOGIN
        const user = await login(username, password);

        setError('');

        onLogin({
          username: user.username,
          user_id: user.user_id,
          role: 'Admin'
        });
      }

    } catch (error) {

      setError(error.message);

    }
  }

  function switchMode() {

    setIsCreateUser(!isCreateUser);

    setUsername('');
    setPassword('');
    setError('');
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: white;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          background: white;
        }

        .login-left {
          width: 50%;
          min-height: 100vh;
          background: linear-gradient(
            145deg,
            #a90000,
            #c91420,
            #8d0000
          );
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 70px;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          width: 420px;
          height: 420px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          top: -160px;
          right: -160px;
        }

        .login-left::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          bottom: -150px;
          left: -100px;
        }

        .brand-content {
          position: relative;
          z-index: 1;
          max-width: 550px;
        }

        .blood-symbol {
          font-size: 70px;
          margin-bottom: 25px;
          filter: drop-shadow(
            0 5px 8px rgba(0, 0, 0, 0.2)
          );
        }

        .brand-content h1 {
          font-size: clamp(34px, 4vw, 64px);
          line-height: 1.12;
          letter-spacing: 2px;
          font-weight: 800;
          margin: 0;
        }

        .code-text {
          font-family: 'Courier New', monospace;
          font-size: 15px;
          font-weight: bold;
          margin-top: 28px;
          color: #ffd9d9;
          letter-spacing: 1px;
        }

        .red-line {
          width: 85px;
          height: 4px;
          background: white;
          margin: 25px 0;
          border-radius: 10px;
        }

        .brand-description {
          font-size: 16px;
          line-height: 1.8;
          color: #ffeaea;
        }

        .left-footer {
          position: absolute;
          bottom: 35px;
          left: 70px;
          font-size: 11px;
          letter-spacing: 2px;
          color: #ffd1d1;
        }

        .login-right {
          width: 50%;
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .login-box {
          width: 100%;
          max-width: 430px;
        }

        .welcome-icon {
          width: 55px;
          height: 55px;
          background: #fff0f0;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
        }

        .welcome-icon span {
          font-size: 28px;
          color: #b5121b;
        }

        .welcome-small {
          color: #b5121b;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 3px;
          margin-bottom: 12px;
        }

        .login-box h2 {
          font-size: 31px;
          color: #250b0b;
          margin: 0 0 15px;
          line-height: 1.3;
          font-weight: 700;
        }

        .login-subtitle {
          font-size: 14px;
          color: #777;
          line-height: 1.7;
          margin-bottom: 35px;
        }

        .error {
          color: #b5121b;
          background: #fff0f0;
          border: 1px solid #f2c4c4;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 22px;
        }

        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: bold;
          color: #3a2020;
          margin-bottom: 9px;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #ead4d4;
          border-radius: 10px;
          height: 54px;
          transition: 0.3s;
          background: white;
        }

        .input-wrapper:focus-within {
          border-color: #b5121b;
          box-shadow: 0 0 0 3px #fff0f0;
        }

        .input-icon {
          font-size: 16px;
          margin: 0 14px;
          color: #b5121b;
        }

        .input-wrapper input {
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          font-size: 14px;
          color: #333;
          background: transparent;
          padding-right: 15px;
        }

        .input-wrapper input::placeholder {
          color: #aaa;
        }

        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0 28px;
          font-size: 12px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #777;
          cursor: pointer;
        }

        .remember-me input {
          accent-color: #b5121b;
        }

        .forgot-password {
          color: #b5121b;
          font-weight: bold;
        }

        .login-button {
          width: 100%;
          height: 56px;
          background: linear-gradient(
            135deg,
            #c91420,
            #a90000
          );
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px;
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(180, 0, 0, 0.15);
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(180, 0, 0, 0.25);
        }

        .arrow {
          font-size: 22px;
        }

        .create-account {
          text-align: center;
          margin-top: 22px;
          font-size: 13px;
          color: #777;
        }

        .create-account button {
          border: none;
          background: none;
          color: #b5121b;
          font-weight: bold;
          cursor: pointer;
          font-size: 13px;
          padding: 0;
        }

        .create-account button:hover {
          text-decoration: underline;
        }

        .login-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          color: #aaa;
          font-size: 12px;
          margin-top: 35px;
        }

        .small-blood {
          font-size: 16px;
        }

        @media (max-width: 850px) {

          .login-page {
            flex-direction: column;
          }

          .login-left {
            width: 100%;
            min-height: 330px;
            padding: 40px;
          }

          .brand-content h1 {
            font-size: 34px;
          }

          .blood-symbol {
            font-size: 45px;
            margin-bottom: 15px;
          }

          .code-text {
            margin-top: 15px;
          }

          .red-line,
          .brand-description {
            display: none;
          }

          .left-footer {
            left: 40px;
            bottom: 20px;
          }

          .login-right {
            width: 100%;
            min-height: auto;
            padding: 45px 25px;
          }

          .login-box {
            max-width: 500px;
          }
        }
      `}</style>

      <div className="login-page">

        {/* LEFT RED SECTION */}
        <div className="login-left">

          <div className="brand-content">

            <div className="blood-symbol">
              🩸
            </div>

            <h1>
              BLOOD
              <br />
              BANK
              <br />
              MANAGEMENT
              <br />
              SYSTEM
            </h1>

            <p className="code-text">
              Saving lives, one drop at a time
            </p>

            <div className="red-line"></div>

            <p className="brand-description">
              A smarter way to manage blood,
              <br />
              donors and hospitals.
            </p>

          </div>

          <div className="left-footer">
            BLOOD BANK • HEALTHCARE • MANAGEMENT
          </div>

        </div>


        {/* RIGHT WHITE SECTION */}
        <div className="login-right">

          <div className="login-box">

            <div className="welcome-icon">
              <span>✚</span>
            </div>

            <p className="welcome-small">
              {isCreateUser ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
            </p>

            <h2>
              {isCreateUser
                ? 'Create your account'
                : 'Sign in to your account'}
            </h2>

            <p className="login-subtitle">
              {isCreateUser ? (
                <>
                  Create an account to access the
                  <br />
                  Blood Bank Management System.
                </>
              ) : (
                <>
                  Enter your details to access the
                  <br />
                  Blood Bank Management System.
                </>
              )}
            </p>


            {/* ERROR MESSAGE */}
            {error && (
              <p className="error">
                {error}
              </p>
            )}


            {/* LOGIN / CREATE USER FORM */}
            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <label htmlFor="username">
                  Username
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    ◉
                  </span>

                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                    required
                  />

                </div>

              </div>


              <div className="input-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    id="password"
                    type="password"
                    placeholder={
                      isCreateUser
                        ? 'Create your password'
                        : 'Enter your password'
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    required
                  />

                </div>

              </div>


              {!isCreateUser && (
                <div className="login-options">

                  <label className="remember-me">

                    <input type="checkbox" />

                    <span>
                      Remember me
                    </span>

                  </label>

                  <span className="forgot-password">
                    Secure Login
                  </span>

                </div>
              )}


              <button
                className="login-button"
                type="submit"
              >

                <span>
                  {isCreateUser
                    ? 'Create User'
                    : 'Sign In'}
                </span>

                <span className="arrow">
                  →
                </span>

              </button>

            </form>


            {/* SWITCH BETWEEN LOGIN AND CREATE USER */}
            <div className="create-account">

              {isCreateUser ? (
                <>
                  Already have an account?{' '}

                  <button
                    type="button"
                    onClick={switchMode}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}

                  <button
                    type="button"
                    onClick={switchMode}
                  >
                    Create User
                  </button>
                </>
              )}

            </div>


            <div className="login-bottom">

              <span className="small-blood">
                🩸
              </span>

              <span>
                Authorized access only
              </span>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}