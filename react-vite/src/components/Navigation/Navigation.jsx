import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CategoryButton from "./CategoryButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import StoreButton from "./ShopButton";
import AboutMe from "./AboutMe";

function Navigation() {

  const user = useSelector((state) => state.session.user)

  const navigate = useNavigate()

  return (
    <>
      <ul className='navbar'>
        <div className="nav-left">

          <NavLink to="/" className='homenav'>Getsy</NavLink>
          <CategoryButton />
        </div>
        <div className="user-actions">
          {user && (
            <>
              <StoreButton />
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


    </>
  );
}

export default Navigation;
