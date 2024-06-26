import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu} className="profile-button">
        <i className="fas fa-user-circle" id="profile-icon" style={{ color: "#000000" }} />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          <div id="user-info-container">

            {user ? (
              <>
                <li>Hello, {user.username}</li>
                <li>{user.email}</li>
                <hr></hr>
                <li>
                  <button className="product-button" onClick={logout}>Log Out</button>
                </li>
              </>
            ) : (
              <div className="login-container">
                <OpenModalMenuItem
                  itemText={<span className="profile-text">Log in</span>}
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <hr></hr>
                <OpenModalMenuItem
                  itemText={<span className="profile-text">Sign Up</span>}
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            )}
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
