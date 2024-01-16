import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


function Navigation() {

  const user = useSelector((state) => state.session.user)

  const navigate = useNavigate()



  return (
    <ul className='navbar'>
      <NavLink to="/" className='homenav'>Getsy</NavLink>
      <div className="user-actions">

        {user && (
          <>
            <NavLink to='/items/new' className={'navLink'}>Post new product</NavLink>
            <NavLink to='/items/current' className={'navLink'}>Your products</NavLink>
            <NavLink to='/cart' className={'navLink'}>
              <span className="cart-icon">
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
            </NavLink>
          </>
        )}
        <ProfileButton />
      </div>
    </ul>
  );
}

export default Navigation;
