import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./Navigation.css";


function Navigation() {

  const user = useSelector((state) => state.session.user)



  return (

    <ul className='navbar'>

      <NavLink to="/" className='homenav'>Getsy</NavLink>

      {user && (

        <>
          <NavLink to='/items/new' className={'navLink'}>Post new product</NavLink>
          <NavLink to='/items/current' className={'navLink'}>Your Items</NavLink>
          <NavLink to='/cart' className={'navLink'}>Your Cart</NavLink>


        </>

      )}
      <ProfileButton />

    </ul>
  );
}

export default Navigation;
