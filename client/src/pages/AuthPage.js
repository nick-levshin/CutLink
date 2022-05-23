import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();
  const message = useMessage();
  const [form, setForm] = useState({
    email: '',
    pasword: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Cut your link</h1>
        <div className="card blue darken-1">
          <div
            className="card-content white-text"
            style={{ paddingBottom: 10 }}
          >
            <span className="card-title" style={{ marginBottom: 40 }}>
              Authorization
            </span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter your email"
                  id="email"
                  type="text"
                  name="email"
                  //value={form.email}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email" className="active">
                  Email
                </label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  name="password"
                  //value={form.password}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password" className="active">
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className="card-action" style={{ paddingTop: 10 }}>
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Sing In
            </button>
            <button
              className="btn gray lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Sing Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
