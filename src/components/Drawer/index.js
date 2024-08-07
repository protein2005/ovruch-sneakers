import { useContext, useState } from "react"
import Cart from "../Cart"
import Info from "../Info"
import axios from "axios"
import AppContext from "../../context"
import styles from"./Drawer.module.scss"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems } = useContext(AppContext)
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0)

  const onClickOrder =  async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(`https://66aa1ae1613eced4eba7933a.mockapi.io/orders`, {
        items: cartItems
      });

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://66a82d2153c13f22a3d20538.mockapi.io/cart/` + item.id);
        await delay(1000)  
      }

      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
    } catch (error) {
      alert("Не вдалось створити замовлення :(")
    }
    setIsLoading(false)
  }
  return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={`${styles.drawer} d-flex flex-column`}>
        <h2 className="d-flex align-center justify-between mb-30">Корзина
          <img onClick={onClose} className="cu-p" width={40} height={40} src="/img/btn-remove.svg" alt="Remove"/>
        </h2>

        {items.length > 0 ? 
        (<>
          <div className="items">
            {items.map((obj) => <Cart key={obj.id} id={obj.id} productId={obj.productId} name={obj.name} onRemove={onRemove} price={obj.price} imageUrl={obj.imageUrl} />)}
          </div>
          <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Всього:</span>
                <div></div>
                <b>{ totalPrice } грн.</b>
              </li>
              <li>
                <span>Налог 5% на ЗСУ:</span>
                <div></div>
                <b>{ (totalPrice * 0.05).toFixed(2)} грн.</b>
              </li>
            </ul>
            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформити замовлення
              <img src="/img/arrow.svg" alt="arrow"/>
            </button>
          </div>
        </>)
        : (<Info
          button={true} 
          title={isOrderComplete ? "Замовлення оформлено!" :"Корзина пуста"} 
          description={isOrderComplete ? `Ваше замовлення #${orderId} скоро буде передано кур'єрській доставці` : "Додайте хоча б одну пару кросівок, щоб зробити замовлення."} 
          image={isOrderComplete ? "img/complete-order.jpg" : "/img/empty-cart.jpg"}
          />)
        }
        
      </div>
    </div>
  )
}

export default Drawer