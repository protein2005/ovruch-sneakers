function Cart(props) {
    return (
            <div className="cartItem d-flex align-center mb-20">
              <div style={{ backgroundImage: `url(${props.imageUrl})` }} className="cartItemImg"></div>

              <div className="mr-20 flex">
                <p className="mb-5">{props.name}</p>
                <b>{props.price} грн.</b>
              </div>
              <img onClick={() => props.onRemove(props.productId)} className="removeBtn" width={40} height={40} src="/img/btn-remove.svg" alt="Remove"/>
            </div>
    )
}

export default Cart