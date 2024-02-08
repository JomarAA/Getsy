import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    server: "",
  });
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    } else {
      setErrors({
        confirmPassword: ''
      })
    }

    const serverResponse = await dispatch(
      thunkSignup({
        firstname,
        lastname,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors({
        ...errors,
        ...serverResponse,
      });
    } else {
      setErrors({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        server: "",
      });


      setFirstname("");
      setLastname("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      closeModal();
    }
  };

  return (
    <>
      <div className="modal_container">
        <h1>Sign Up</h1>
        <div className={`error ${!errors.server ? 'error-placeholder' : ''}`}>{errors.server}</div>
        <form onSubmit={handleSubmit} className="logIn_SingUp_form">
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}

          />
          <div className={`error ${!errors.firstname ? 'error-placeholder' : ''}`}>{errors.firstname}</div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}

          />
          <div className={`error ${!errors.lastname ? 'error-placeholder' : ''}`}>{errors.lastname}</div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <div className={`error ${!errors.email ? 'error-placeholder' : ''}`}>{errors.email}</div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />
          <div className={`error ${!errors.username ? 'error-placeholder' : ''}`}>{errors.username}</div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <div className={`error ${!errors.password ? 'error-placeholder' : ''}`}>{errors.password}</div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}

          />
          {errors.confirmPassword && (
            <div className={`error ${!errors.confirmPassword ? 'error-placeholder' : ''}`}>{errors.confirmPassword}</div>
          )}
          <button
            type="submit"

          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
