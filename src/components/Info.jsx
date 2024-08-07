import React, { useContext } from 'react'
import AppContext from '../context'

const Info = ({ title, image, description, button = false, width = 120 }) => {
    const { setCartOpened } = useContext(AppContext)

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={width} src={image} alt="cart"/>
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            {button && <button onClick={() => setCartOpened(false)} className="greenButton">
            <img src="/img/arrow.svg" alt="Arrow"/>
                Повернутись назад
            </button>}
        </div>
    )
}

export default Info
