import { useContext } from "react";
import {Link} from "react-router-dom";
import AppContext from "../context";
import TypingEffect from "./TypingEffect";

function Header(props) {
  const { cartItems} = useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0)

  return (
      <header className="d-flex justify-between align-center p-40">
      <Link to="//">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logo"/>
          <div>
            <h3 className="text-uppercase">Ovruch Sneakers</h3>
            <TypingEffect/>
            {/* <p className="opacity-5">Магазин найкращих кросівок</p> */}
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-20 cu-p d-flex">
          <img className="mr-10" width={18} height={18} src="img/cart.svg" alt="Cart"/>
          <span className="titleTotalPrice">{totalPrice} грн.</span>
        </li>
        <li>
          <Link className="mr-20 cu-p d-flex" to="/favorites">
            <img className="cu-p mr-10" width={18} height={18} src="img/heart.svg" alt="Favorites"/>
            <span className="titleNav">Вподобані</span>
          </Link>
        </li>
        <li>
          <Link className="mr-20 cu-p d-flex" to="/orders">
            <img className="cu-p mr-10" width={18} height={18} src="img/user.svg" alt="User"/>
            <span className="titleNav">Профіль</span>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header