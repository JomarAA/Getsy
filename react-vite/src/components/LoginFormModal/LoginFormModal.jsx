import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demo = async (e) => {
    e.preventDefault()
    return await dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' }))
      .then(closeModal)
      .then(navigate('/'))
  }

  return (
    <>
      <div className="modal_container">
        {/* <h1>LoginFormModal</h1> */}
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="logIn_SingUp_form">
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">*{errors.email}</p>}
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error">*{errors.password}</p>}
          <button type="submit" disabled={!email || !password}>Log In</button>
        </form>
        <button className="product-button" onClick={demo} style={{ cursor: 'pointer' }}>Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
