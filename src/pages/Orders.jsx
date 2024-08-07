import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Info from "../components/Info";
import { Link } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`https://66aa1ae1613eced4eba7933a.mockapi.io/orders`);
                // setOrders(data.map((obj) => obj.items).flat())
                // setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setOrders(data)
                setIsLoading(false)
            } catch (error) {
                alert('Не вдалось отримати інформацію про ваші покупки')
            }
        })()
    }, [])
    
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
            <h1 className="titleBody">
                <Link to="/">
                    <button className="backHome mr-10"><img src="/img/arrow-back.svg" alt="Back Home"/></button>
                </Link> 
                Мої замовлення
            </h1>
            </div>
            {orders.length > 0 ? (
                <>
                    {(isLoading ? [...Array(8)].map((_, index) => (<Card key={index} loading={isLoading} />)) : orders.map((obj) => (<div>
                        <h1 className="titleOrder pb-5 mb-20">#{obj.id}</h1>
                        <div className="d-flex flex-wrap">
                        {obj.items.map(item => (
                            <Card 
                            key={item.id} 
                            id={item.id} 
                            name={item.name} 
                            price={item.price} 
                            imageUrl={item.imageUrl}
                            loading={isLoading}
                        />
                        ))}
                        </div>
                    </div>)
                    ))}
                </>) 
                :(<Info
                    width={70}
                    title={"У вас немає замовлень"} 
                    description={"Ви ще не придбали кросівки? Купуйте швидше"}
                    image={"/img/tired2.png"}
                />)}
        </div>
    )
}

export default Orders